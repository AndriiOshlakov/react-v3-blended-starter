import axios from "axios";
import { CreatePost, Post } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export interface FetchPostsResponse {
  data: Post[];
  total: number;
}

export const fetchPosts = async (search: string, page: number): Promise<FetchPostsResponse> => {
  const params: Record<string, string | number> = {
    _page: page,
    _limit: 10,
  };

  if (search.trim()) {
    params.title_like = search;
  }

  const response = await axios.get<Post[]>("/posts", { params });
  return {
    data: response.data,
    total: Number(response.headers["x-total-count"]),
  };
};

export const createPost = async (newPost: CreatePost) => {
  const response = await axios.post<Post>("/posts", newPost);
  return response.data;
};

export const editPost = async (postId: number, updatedPost: Partial<Post>): Promise<Post> => {
  const response = await axios.patch<Post>(`/posts/${postId}`, updatedPost);
  console.log(response.data);

  return response.data;
};

export const deletePost = async (postId: number) => {
  const response = await axios.delete<Post>(`/posts/${postId}`);
  console.log(response.data);
  return response.data;
};
