import Image from "next/image";
import styles from "./page.module.css";
import FilterInput from "../components/filterInput/filterInput";
import Projects from "../components/project/project";
import { getData } from "../lib/data";  // Importa correctamente
import { Suspense } from "react";

export default async function Home() {
  const data = await getData();
  return (
    <div>
      <Suspense fallback={<div>Cargando...</div>}>
      <FilterInput inicialData={data}/>
      <Projects inicialData={data} />
      </Suspense>
    </div>
  );
}
