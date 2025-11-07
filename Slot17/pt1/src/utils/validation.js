const USERNAME_REGEX = /^[a-zA-Z0-9_]{6,}$/;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]$/;

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{6,}$/;

export const validateUsername = (username) => {

    const trimmedUsername = username ? String(username).trim() : ''; 

    if(!trimmedUsername) {
        return 'Username or Email is required.';
    }
    if (!USERNAME_REGEX.test(trimmedUsername)) {
        return 'Username must be at least 6 characters';//Tên đăng nhập phải có ít nhất 6 ký tự, không chứaa khoảng trắng, và chỉ bao gồm chữ cái, số, gach dưới.';
    }
    return null;
};

export const validateEmail = (email) => {
    if(!email) {
        return 'Username or Email is required.';
    }
    if (!EMAIL_REGEX.test(email)) {
        return 'Email is invalid format.';
    }
    return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required.';
  }
  if (!PASSWORD_REGEX.test(password)) {
    return 'Password must be at least 6 characters.'; //Mật khẩu phải có ít nhất 6 ký tự, không chứa khoảng trắng, và bao gồm chữ hoa, chữ thường, số.';
  }
  return null;
};
