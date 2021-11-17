import { IBlogPost, IFile, IRegister, IUserEdit } from "./Typescript";

export const validRegister = ({
  name,
  email,
  password,
  cf_password,
}: IRegister) => {
  const errors: string[] = [];

  if (!name) {
    errors.push("Please add your name.");
  } else if (name.length > 20) {
    errors.push("Your name is up to 20 chars long.");
  }

  if (!email) {
    errors.push("Please add your email");
  } else if (!validateEmail(email)) {
    errors.push("Email or phone number format is incorrect.");
  }

  const msg = checkPassword(password, cf_password);
  if (msg) errors.push(msg);

  return {
    errMsg: errors,
    errLength: errors.length,
  };
};

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const checkPassword = (password: string, cf_password: string) => {
  if (password.length < 6) {
    return "Password must be at least 6 chars.";
  } else if (password !== cf_password) {
    return "Confirm password did not match.";
  }
};

export const validPostBlog = ({ title, body, file }: IBlogPost) => {
  const errors: string[] = [];
  if (!title) {
    errors.push("Please add a title");
  } else if (title.length > 120) {
    errors.push("Title can not be more than 120 characters");
  }

  if (!body) {
    errors.push("Please something in the body.");
  }

  if (!file?.type) {
    errors.push("Please add a file");
  } else if (file?.size > 1048576) {
    errors.push("File size can not be more than 1 mb.");
  }

  return {
    errMsg: errors,
    errLength: errors.length,
  };
};

export const validUserEdit = ({ name, email }: IUserEdit) => {
  const errors: string[] = [];

  if (!name) {
    errors.push("Please add your name.");
  } else if (name.length > 20) {
    errors.push("Your name is up to 20 chars long.");
  }

  if (!email) {
    errors.push("Please add your email");
  } else if (!validateEmail(email)) {
    errors.push("Email or phone number format is incorrect.");
  }

  return {
    errMsg: errors,
    errLength: errors.length,
  };
};

export const validFile = ({ file }: IFile) => {
  const errors: string[] = [];

  if (!file?.type) {
    errors.push("Please add a file");
  } else if (file?.size > 1048576) {
    errors.push("File size can not be more than 1 mb.");
  }

  return {
    errMsg: errors,
    errLength: errors.length,
  };
};
