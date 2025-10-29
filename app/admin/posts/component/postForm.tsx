"use client";
import { PostFormData, Post } from "@/types/post";
import Form from "next/form";
import { useFormState } from "react-dom";

const initialState = {
  success: false,
  post: undefined,
};

interface UpdateResult {
  success: boolean;
  post?: Post;
}

export default function PostForm({
  action,
  initialData,
}: {
  action: (
    prevState: UpdateResult,
    formData: FormData
  ) => Promise<UpdateResult>;
  initialData?: Post | undefined;
}) {
  const [state, formAction] = useFormState(action, initialState);
  console.log(initialData);
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
            name="content"
            defaultValue={initialData?.body || ""}
            required
            rows={5}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          disabled={state.success}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {state.success
            ? initialData
              ? "Đang lưu..."
              : "Đang tạo..."
            : initialData
            ? "Cập nhật"
            : "Tạo mới"}
        </button>
      </div>
    </Form>
  );
}
