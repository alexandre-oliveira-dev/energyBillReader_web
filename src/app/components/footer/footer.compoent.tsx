"use client";

export default function Footer() {
  return (
    <p
      style={{
        position: "absolute",
        transform: "translate(-50%, -50%)",
        left: "50%",
        color: "silver",
        bottom: "30px",
      }}
    >
      Dev by{" "}
      <a
        target="_blank"
        style={{color: "silver"}}
        href="https://www.linkedin.com/in/alexandre-oliveira-0b91aa172/"
      >
        Alexandre web developer full-stack
      </a>
    </p>
  );
}
