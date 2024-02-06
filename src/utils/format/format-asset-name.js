// Replace multiple spaces with a single space
// Replace the remaining space with a hyphen (-)
export function transformString(inputString) {
    let str = inputString.trim();
    let stringWithSingleSpaces = str.replace(/\s+/g, " ");
  
    let finalString = stringWithSingleSpaces.replace(/\s/g, "-");
  
    return finalString;
  }
  