export const validateEmail = (email) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@frro\.utn\.edu\.ar$/;
  return emailRegex.test(email);
};
