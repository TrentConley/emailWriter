// Get the 'hello-button' element and add a click listener
document.getElementById("hello-button").addEventListener("click", function () {
  // Send a message to the content script
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { text: "hello" });
  });
});
