export function formatCategoryLabel(categoryString: string) {
  let formattedString = categoryString
    .replace(/-/g, " ")
    .replace(/\w\S*/g, (word) => {
      return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    });

  formattedString = formattedString
    .replace(/\b&\b/g, " & ")
    .replace(/\w\S*/g, (word) => {
      return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    });

  return formattedString;
}
