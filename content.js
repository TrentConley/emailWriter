console.log("Test");

function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delayedAction() {
  console.log("Starting action");
  for (let i = 0; i < 5; i++) {
    await pause(1000); // Pause for 1 second
  }
  console.log("Action complete");
}

delayedAction();

// Wait for the page to finish loading
// Set up an event handler for the chrome.tabs.onUpdated event
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // Check if the URL of the tab is the Gmail compose page
  // if (tab.url && tab.url.includes("https://mail.google.com/mail/u/0/#compose")) {
  console.log("Hello World!");
  // Find the textarea element where the user is composing their email
  var textarea = document.querySelector("textarea[name=to]");

  // Set up a mutation observer to detect when the text in the textarea changes
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      // When the text changes, retrieve the current text from the textarea
      var text = textarea.value;

      // Do something with the text (e.g. send it to the background script for processing)
      chrome.runtime.sendMessage(
        {
          type: "processText",
          text: text,
        },
        function (response) {
          // When the background script responds, modify the text in the textarea
          textarea.value = response.text;
        }
      );
    });
  });

  // Start observing the textarea for changes
  observer.observe(textarea, {
    characterData: true,
    subtree: true,
  });
});
