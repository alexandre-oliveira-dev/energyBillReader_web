"use client";

import NavBar from "../navBar/nav-bar.component";
import "./styles.css";

interface MainSectionProps {
  component: React.ReactNode;
}

export default function MainSectionComponent({component}: MainSectionProps) {
  return (
    <section className="container-main-section">
      <NavBar></NavBar>
      <div className="main-content">{component}</div>
    </section>
  );
}
