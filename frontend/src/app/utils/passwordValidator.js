export const userValidator = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    return {
      status: false,
      message:
        "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.",
    };
  }
  return { status: true, message: "Valid password." };
};
