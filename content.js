// Replace "hello" with "zork" in the body of the draft message
function replaceHelloWithZork() {
  // Retrieve the draft message
  gapi.client.gmail.users.drafts
    .get({
      userId: "me",
      id: draftId,
    })
    .then((response) => {
      const draftMessage = response.result;
      // Modify the body of the draft message
      draftMessage.body = draftMessage.body.replace("hello", "zork");
      // Update the draft message with the modified body
      gapi.client.gmail.users.drafts
        .update({
          userId: "me",
          id: draftId,
          resource: draftMessage,
        })
        .then((response) => {
          console.log("Draft message updated");
        });
    });
}

// Set an interval to check for the presence of the textarea element used for the body of the email in Gmail
setInterval(() => {
  // Check if the textarea element is present
  if (document.querySelector('[aria-label="Message Body"]')) {
    // If the textarea element is present, call the replaceHelloWithZork function
    replaceHelloWithZork();
  }
}, 1000); // Check for the presence of the textarea element every 1000 milliseconds (1 second)
