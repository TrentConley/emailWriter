// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "processText") {
    // Check if the text contains the word "hello"
    if (request.text.includes("hello")) {
      // Modify the text to say "hello world"
      var modifiedText = request.text.replace("hello", "hello world");

      // Send the modified text back to the content script
      sendResponse({
        text: modifiedText,
      });
    }
  }
});

chrome.commands.onCommand.addListener(function (command) {
  if (command === "suggest-change") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { text: "hello" });
    });
  }
});
