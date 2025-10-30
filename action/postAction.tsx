"use server";

import { DataResult, Post } from "@/types/post";
import { revalidatePath } from "next/cache";

export async function createPost(
  prevState: DataResult,
  formData: FormData
): Promise<DataResult> {
  try {
    const post = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      // Thay đổi URL API của bạn
      method: "POST", // Đặt method là PATCH
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formData.get("title"),
        body: formData.get("body"),
        userId: 1,
        // Chỉ gửi các trường cần cập nhật
      }),
    }).then((res) => res.json());
    return { success: true, post: post, message: "Create Post Successfuly" };
  } catch (e) {
    return { success: false, message: "Create Post Fail" };
  }
}

export async function deletePost(id: number) {
  try {
    const post = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        // Thay đổi URL API của bạn
        method: "DELETE", // Đặt method là PATCH
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
    return { success: true, post: post, message: "Deleted Post Successfuly" };
  } catch (e) {
    return { success: false, message: "Deleted Post Fail" };
  }
}

export async function updatePost(
  prevState: DataResult,
  formData: FormData
): Promise<DataResult> {
  try {
    const post = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${formData.get("id")}`,
      {
        // Thay đổi URL API của bạn
        method: "PATCH", // Đặt method là PATCH
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.get("title"),
          body: formData.get("body"),
          // Chỉ gửi các trường cần cập nhật
        }),
      }
    ).then((res) => res.json());
    return { success: true, post: post, message: "Update Successfuly" };
  } catch (e) {
    return { success: false, message: "Update Fail" };
  }
}

export async function getPosts() {
  const listPosts = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  ).then((res) => res.json());
  return listPosts;
}

export async function getPost({ id }: { id: number }): Promise<Post> {
  const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: "no-store",
    next: { revalidate: 0, tags: ["post"] },
  }).then((res) => res.json());
  revalidatePath("/aaa");
  return post;
}

export async function generateMetadata({ params }: { params: { id: number } }) {
  const post = await getPost({ id: params.id });

  console.log(`[LOG] generateMetadata: Tạo metadata cho ${params.id}`);

  return {
    title: `Hồ sơ của ${post.title} | Next App`,
    description: `Thông tin chi tiết và tiểu sử của người dùng ID: ${post.id}.`,
    keywords: [post.title, "profile", params.id],
    openGraph: {
      images: [post.body || "/default-user.png"],
      type: "profile",
    },
  };
}
