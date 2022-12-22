// Set up a loop to check for the textarea element every 500 milliseconds
let interval = setInterval(function () {
  // Find the textarea element where the user is composing their email
  let textarea = document.querySelector("textarea[aria-label='Message Body']");

  if (textarea) {
    console.log("draft is open");
    // A draft is open
    clearInterval(interval);
    console.log("cleared interval");
    // Set up a mutation observer to detect when the text in the textarea changes
    let observer = new MutationObserver(function (mutations) {
      console.log("mutation detected");
      mutations.forEach(function (mutation) {
        // When the text changes, retrieve the current text from the textarea
        let text = textarea.value;
        console.log(text);
        // Replace "hello" with "zork" in the text
        text = text.replace("hello", "zork");

        // Update the text in the textarea
        textarea.value = text;
      });
    });

    // Start observing the textarea for changes
    observer.observe(textarea, {
      characterData: true,
      subtree: true,
    });
    console.log("observer is set up.");
  } else {
    // No draft is open
  }
}, 500);
