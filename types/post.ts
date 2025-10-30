export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface PostFormData {
  id?: number; // Optional cho Create
  title: string;
  body: string;
}

export interface DataResult {
  success: boolean;
  post?: Post;
  message: string;
}
