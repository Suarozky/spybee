import Image from "next/image";
import styles from "./page.module.css";
import FilterInput from "../components/filterInput/filterInput";
import Projects from "../components/project/project";
import { getData } from "../lib/data";  // Importa correctamente

export default async function Home() {


  return (
    <div>
      <FilterInput />

    </div>
  );
}
