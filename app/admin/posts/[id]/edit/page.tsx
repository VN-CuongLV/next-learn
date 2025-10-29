import { getPost, updatePost } from "@/action/postAction";
import PostForm from "../../component/postForm";

export default async function EditPage({ params }: { params: Promise<any> }) {
  const value = await params;
  const post = await getPost({ id: value.id });
  return <PostForm action={updatePost} initialData={post} />;
}
