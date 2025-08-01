import { FiSearch } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

import style from "./Form.module.css";

interface FormProps {
  onSubmit: (value: string) => void;
}

export default function Form({ onSubmit }: FormProps) {
  const HandleSubmit = (formData: FormData) => {
    const query = formData.get("search") as string;
    if (query === "") {
      toast.error("Please enter your search query.", {
        duration: 4000,
        position: "top-center",
        removeDelay: 1000,
      });
      return;
    }
    onSubmit(query);
  };
  return (
    <>
      <Toaster />
      <form className={style.form} action={HandleSubmit}>
        <input
          className={style.input}
          placeholder="What do you want to write?"
          name="search"
          autoFocus
        />

        <button className={style.button} type="submit">
          <FiSearch size="16px" />
        </button>
      </form>
    </>
  );
}
