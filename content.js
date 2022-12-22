// Wait for the page to finish loading
window.addEventListener("load", function () {
  console.log("Test");

  // Find the textarea element where the user is composing their email
  var textarea = document.querySelector("textarea[aria-label='Message Body']");

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
    System.out.println();
  });

  // Start observing the textarea for changes
  observer.observe(textarea, {
    characterData: true,
    subtree: true,
  });
});
