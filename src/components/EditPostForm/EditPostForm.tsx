import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";

import css from "./EditPostForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "../../services/postService";
import { Post } from "../../types/post";

interface EditPostFormProps {
  onCancel: () => void;
  post: Post;
}

interface CreatePostFormValues {
  title: string;
  body: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title too short")
    .max(50, "Title too long")
    .required("Title is required"),
  body: Yup.string().max(500, "Message too long").required("Content is required"),
});

export default function EditPostForm({ onCancel, post }: EditPostFormProps) {
  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: (data: Partial<Post>) => editPost(post.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onCancel();
      alert("Post edited successfully!");
    },
    onError: (error) => {
      console.error("Edit post error:", error);
    },
  });
  const handleSubmit = (
    values: CreatePostFormValues,
    actions: FormikHelpers<CreatePostFormValues>
  ) => {
    editMutation.mutate(values);
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ title: post.title, body: post.body }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Edit post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
