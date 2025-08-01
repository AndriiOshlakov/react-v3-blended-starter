import style from "./GridItem.module.css";

export default function GridItem({ children }: { children: React.ReactNode }) {
  return <li className={style.item}>{children}</li>;
}
