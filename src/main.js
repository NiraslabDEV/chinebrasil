// Controle do tema claro/escuro
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");

  // Verifica preferência do usuário
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  // Toggle do tema
  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    localStorage.theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  });

  // Animações de scroll
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Adiciona animação aos elementos
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });

  // Smooth scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});
