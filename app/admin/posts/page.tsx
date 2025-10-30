import { getPosts } from "@/action/postAction";
import PostList from "./component/postList";
import Link from "next/link";

export default async function PostsPage() {
  const posts = await getPosts();
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Quản lý Bài viết</h1>
      <Link
        href="/admin/posts/create"
        className="bg-green-500 text-white p-2 rounded mb-4 inline-block"
      >
        + Tạo Bài viết Mới
      </Link>

      <PostList posts={posts} />
    </div>
  );
}
