import Image from "next/image";
import styles from "./page.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import HomeView from "@/views/HomeView";

export default function Home() {
  return (
    <main style={{height:"100%"}} >
      <HomeView/>
    </main>
  );
}
