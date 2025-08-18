
export const USER = {
  USERNAME: "username",
  PASSWORD: "password",
  EMAIL: "email"
}

export const VALIDATIONS = {
  EMAIL: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  USER_NAME: (username) => /^[a-zA-Z_][a-zA-Z0-9_]{5,}$/.test(username),
  PASSWORD: (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    ),
};
