import Image from "next/image";
import styles from "./page.module.css";
import FilterInput from "../components/filterInput/filterInput";
import Projects from "../components/project/project";
import { getData } from "../lib/data";  // Importa correctamente

export default async function Home() {
  const data = await getData();
  console.log(data);
  return (
    <div>
      <FilterInput />
      <Projects inicialData={data} />
    </div>
  );
}
