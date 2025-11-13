const PASSWORD_REGEX = /^[a-zA-Z0-9_]{6,}$/;

export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required.';
  }
  if (!PASSWORD_REGEX.test(password)) {
    return 'Password must be at least 6 characters.';
  }
  return null;
};

export const validateUsername = (username) => {

    const trimmedUsername = username ? String(username).trim() : ''; 

    if(!trimmedUsername) {
        return 'Username is required.';
    }
    return null;
};