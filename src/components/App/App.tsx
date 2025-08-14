import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";
import css from "./App.module.css";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";
import { ClockLoader } from "react-spinners";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import EditPostForm from "../EditPostForm/EditPostForm";
import { Post } from "../../types/post";

export default function App() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const [inputValue, setInputValue] = useState("");

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1); // Скидаємо сторінку при новому пошуку
  }, 500);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts", search, currentPage],
    queryFn: () => fetchPosts(search, currentPage),
    placeholderData: keepPreviousData,
  });
  const toggleEditPost = (post: Post) => {
    setPostToEdit(post);
    setIsEditModalOpen(true);
  };
  const totalPages = posts ? Math.ceil(posts.total / 10) : 0;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            onPageChange={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}
        <button className={css.button} onClick={() => setIsCreateModalOpen(!isCreateModalOpen)}>
          Create post
        </button>
      </header>
      {isError && <h2>Something went wrong!!!</h2>}
      {isLoading && <ClockLoader color="#1e15e3" />}
      {posts && (
        <PostList
          items={posts.data}
          toggleModal={() => setIsEditModalOpen(!isEditModalOpen)}
          toggleEditPost={toggleEditPost}
        />
      )}
      {isCreateModalOpen && (
        <Modal onClose={() => setIsCreateModalOpen(!isCreateModalOpen)}>
          <CreatePostForm onCancel={() => setIsCreateModalOpen(!isCreateModalOpen)} />
        </Modal>
      )}
      {isEditModalOpen && postToEdit && (
        <Modal
          onClose={() => {
            setIsEditModalOpen(!isEditModalOpen);
          }}
        >
          <EditPostForm onCancel={() => setIsEditModalOpen(!isEditModalOpen)} post={postToEdit} />
        </Modal>
      )}
    </div>
  );
}
