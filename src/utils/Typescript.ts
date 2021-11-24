import { ChangeEvent, FormEvent } from "react";

export type IParams = {
  page: string;
  slug: string;
};

export type InputChange = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export type FormSubmit = FormEvent<HTMLFormElement>;

export type Id ={
  id: string
}

export type IRegister = {
  name: string,
  email: string, 
  password: string,
  cf_password: string
}

export type IBlog ={
  _id: string,
  title: string,
  body: string,
  thumbnail: string,
  tags: string,
  love: number,
  createdAt: string,
  updatedAt: string,
  user: {
    _id: string,
    name: string,
    avatar: string,
  }
}

export type IUserEdit ={
  name: string,
  email: string,
} 

export type IBlogPost ={
  title: string,
  body: string,
} & IFile

export type IFile ={
  file?: File,
}

export type IUser = {
  _id: string,
  email: string,
  avatar: string,
  name: string,
  role: string,
  createdAt: string,
  updatedAt: string,
  token: string,
  blogCount: number
}

export type IUserDetails = {
  _id: string,
  email: string,
  avatar: string,
  name: string,
  blogCount: number
}

export interface IComment {
  _id?: string
  user: IUser
  blog_id: string
  blog_user_id: string
  content: string
  replyCM: IComment[]
  reply_user?: IUser
  comment_root?: string
  createdAt: string
}

export type Children = {
  children: React.ReactNode;
};
