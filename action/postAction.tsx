"use server";

interface UpdateResult {
  success: boolean;
  post?: Post;
}

import { PostFormData, Post } from "@/types/post";

export async function createPost(data: PostFormData) {
  // const title = data.get("title")?.valueOf();
  // const content = data.get("content")?.valueOf();
}

export async function deletePost(id: string) {}

export async function updatePost(
  prevState: UpdateResult,
  formData: FormData
): Promise<UpdateResult> {
  
  return { success: true };
}

export async function getPosts() {
  const listPosts = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  ).then((res) => res.json());
  return listPosts;
}

export async function getPost({
  id,
}: {
  id: number;
}): Promise<Post | undefined> {
  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  ).then((res) => res.json());
  return post;
}
