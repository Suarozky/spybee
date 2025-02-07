import Image from "next/image";
import styles from "./page.module.css";
import FilterInput from "../components/filterInput/filterInput";
import Projects from "../components/project/project";

export default function Home() {
  return (
    <div >
      <FilterInput />
      <Projects />

   
    </div>
  );
}
