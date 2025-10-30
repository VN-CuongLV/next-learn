"use client";
import { Post } from "@/types/post";
import Form from "next/form";
import { useActionState, useEffect } from "react";

const initialState = {
  success: false,
  post: undefined,
  message: "",
};

interface UpdateResult {
  success: boolean;
  post?: Post;
  message: string;
}

export default function PostForm({
  action,
  initialData,
}: {
  action: (
    prevState: UpdateResult,
    formData: FormData
  ) => Promise<UpdateResult>;
  initialData?: Post | null;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.success && state.post) {
      const post = state.post;

      // HIỂN THỊ ALERT KÈM THÔNG TIN POST ĐÃ UPDATE
      alert(
        `Cập nhật thành công!\n\n` +
          `ID: ${post.id}\n` +
          `Tiêu đề: ${post.title}\n` +
          `Thông tin: ${post.body}`
      );
    } else if (state.message && !state.success) {
      // Hiển thị alert nếu có lỗi
      alert(`THẤT BẠI: ${state.message}`);
    }
  }, [state]);

  return (
    <Form action={formAction} className="flex  juxtify-center items-center ">
      <div className="w-4xl mx-auto px-4">
        <input type="hidden" name="id" defaultValue={initialData?.id} />

        <div>
          <label>Tiêu đề</label>
          <input
            type="text"
            name="title"
            defaultValue={initialData?.title || ""}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Nội dung</label>
          <textarea
            name="body"
            defaultValue={initialData?.body || ""}
            required
            rows={5}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          aria-disabled={pending}
          disabled={pending}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {pending ? "Đang xử lý..." : "Lưu Bài viết"}
        </button>
      </div>
    </Form>
  );
}
