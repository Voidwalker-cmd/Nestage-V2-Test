export const shortenHexStringServer = (input: string, len: string = "lg"): string => {
  const limit = len === "sh" ? 40 : 35;
  if (input.length <= 10) return input;

  if (input.toLocaleLowerCase().includes("loading address...")) return input;

  const prefix = input.slice(0, 7);
  const suffix = input.slice(-6);
  const dots = ".".repeat(input.length - limit);
  return prefix + dots + suffix;
};