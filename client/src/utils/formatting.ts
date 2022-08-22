export function pascalCaseToSentence(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (str) => {
    return str.toUpperCase();
  });
}
