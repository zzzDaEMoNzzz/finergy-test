export const IDNPRegex = /^[0-9]{13}$/;

export const IDNPValidator = (value: string) => {
  return IDNPRegex.test(value);
};
