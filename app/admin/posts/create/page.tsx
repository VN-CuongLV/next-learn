'use client'
import { createPost } from "@/action/postAction";
import PostForm from "../component/postForm";

export default function CreatePost() {
  return <PostForm action={createPost} initialData={null} />;
}
