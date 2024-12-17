export function getInitials(fullName) {
  if (!fullName) return "";

  return fullName
    .split(" ") // Split the full name into an array of words
    .filter((word) => word.trim().length > 0) // Remove any empty words caused by extra spaces
    .map((word) => word[0].toUpperCase()) // Get the first character of each word and convert it to uppercase
    .join(""); // Join the initials into a single string
}
