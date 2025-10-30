import { getPost } from "@/action/postAction";

export default async function DetailPost({ params }: { params: Promise<any> }) {
  const value = await params;
  const post = await getPost({ id: value.id });
  console.log(post);
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Hồ sơ người dùng</h1>
      <h2>Tên: {post.title}</h2>
      <p>Description: {post.body}</p>
      {/* ... Nội dung trang ... */}
    </div>
  );
}
