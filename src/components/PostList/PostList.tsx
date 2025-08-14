import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "../../types/post";
import css from "./PostList.module.css";
import { deletePost } from "../../services/postService";

interface postListProps {
  items: Post[];
  toggleModal: () => void;
  toggleEditPost: (post: Post) => void;
}

export default function PostList({ items, toggleModal, toggleEditPost }: postListProps) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Post deleted successfully!");
    },
    onError: (error) => {
      console.error("Delete post error:", error);
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {items.map((item: Post) => (
        <li className={css.listItem} key={item.id}>
          <h2 className={css.title}>{item.title}</h2>
          <p className={css.content}>{item.body}</p>
          <div className={css.footer}>
            <button
              className={css.edit}
              onClick={() => {
                toggleEditPost(item);
                toggleModal();
              }}
            >
              Edit
            </button>
            <button
              className={css.delete}
              onClick={() => {
                handleDelete(item.id);
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
