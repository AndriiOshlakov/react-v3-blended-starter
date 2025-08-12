// 1. Імпортуємо хук useMutation
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

interface newTodo {
  title: string;
  completed: boolean;
}

export default function App() {
  // 2. Використовуємо хук
  const mutation = useMutation({
    mutationFn: async (newTodo: newTodo) => {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        newTodo
      );
      return res.data;
    },
    onSuccess: () => {
      console.log("Todo added successfully");
    },
  });

  const handleCreateTodo = () => {
    // 3. Викликаємо mutate для того щоб виконати HTTP-запит
    mutation.mutate({
      title: "My new todo",
      completed: false,
    });
  };

  return (
    <>
      <button onClick={handleCreateTodo}>Create Todo</button>
      {mutation.isPending && <div>Adding todo...</div>}
      {mutation.isError && <div>An error occurred</div>}
      {mutation.isSuccess && <div>Todo added!</div>}
    </>
  );
}
