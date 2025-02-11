export interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    username: string;
    image: string | null;
  };
}

export interface CreatePost
  extends Pick<Post, "title" | "content" | "published" | "authorId"> {}

export interface UpdatePost
  extends Pick<CreatePost, "title" | "content" | "published"> {}

export interface User {
  id: string;
  name: string;
  email: string | null;
  password: string | null;
  emailVerified: string;
  image: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  username: string;
}

export interface UpdateUser extends Pick<User, "name" | "image"> {}

export interface Comment
  extends Pick<Post, "id" | "content" | "createdAt" | "author"> {}
