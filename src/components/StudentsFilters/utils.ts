export const IDNPValidator = (value: string) => {
  return /^[0-9]{13}$/.test(value);
};
