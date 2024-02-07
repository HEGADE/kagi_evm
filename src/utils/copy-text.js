
export const copy = (textToCopy) => {
  var textarea = document.createElement("textarea");
  textarea.value = textToCopy;
  document.body.appendChild(textarea);

  // Select the text in the textarea
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  try {
    // Execute the copy command
    document.execCommand("copy");
    console.log("Text successfully copied to clipboard");
  } catch (err) {
    console.error("Unable to copy text to clipboard", err);
  }

  // Remove the temporary textarea
  document.body.removeChild(textarea);
};
