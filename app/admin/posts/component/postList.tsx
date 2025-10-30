"use client";
import { deletePost } from "@/action/postAction";
import { Post } from "@/types/post";
import { useRouter } from "next/navigation";

export default function PostList({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const handleDelete = async (post: Post) => {
    const isConfirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa bài viết "${post.title}" (ID: ${post.id}) vĩnh viễn không? Thao tác này không thể hoàn tác.`
    );

    if (!isConfirmed) {
      return;
    }
    const result = await deletePost(post.id);
    alert(result.message);
    router.refresh();
  };

  return (
    <div className="flex justify-center items-center bg-gray-50">
      <table className="max-w-4xl mx-auto px-4">
        {posts.map((post: Post) => (
          <tr key={post.id} className="border-b hover:bg-gray-100">
            <td className="p-4">{post.id}</td>
            <td className="p-4">{post.title}</td>
            <td className="p-4">
            <button
                onClick={() => router.push(`/admin/posts/${post.id}/detail`)}
                className="bg-orange-500 text-white p-1 rounded mr-2"
              >
                Chi tiết
              </button>
              <button
                onClick={() => router.push(`/admin/posts/${post.id}/edit`)}
                className="bg-yellow-500 text-white p-1 rounded mr-2"
              >
                Sửa
              </button>
              <button
                onClick={() => handleDelete(post)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Xóa
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
