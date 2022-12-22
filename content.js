// Wait for the page to finish loading
window.addEventListener("load", function () {
  // Find the textarea element where the user is composing their email
  var textarea = document.querySelector("textarea[aria-label='Message Body']");

  // If the textarea element is not found, set up a mutation observer to listen for when it is added to the page
  if (!textarea) {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        // Check if the textarea element has been added to the page
        var addedNodes = Array.from(mutation.addedNodes);
        var textarea = addedNodes.find(function (node) {
          return node.tagName === "TEXTAREA";
        });

        // If the textarea element has been added, set up the MutationObserver to listen for changes to the text
        if (textarea) {
          observer.disconnect();
          setUpObserver(textarea);
        }
      });
    });

    // Start observing the page for changes to the DOM
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  } else {
    // If the textarea element is found, set up the MutationObserver to listen for changes to the text
    setUpObserver(textarea);
  }
});

function setUpObserver(textarea) {
  // Set up a mutation observer to detect when the text in the textarea changes
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      // When the text changes, retrieve the current text from the textarea
      var text = textarea.value;

      // Check if the text includes the word "hello"
      if (text.includes("hello")) {
        // Replace the word "hello" with "zork" in the textarea
        textarea.value = text.replace("hello", "zork");
      }
    });
  });

  // Start observing the textarea for changes
  observer.observe(textarea, {
    characterData: true,
    subtree: true,
  });
}
