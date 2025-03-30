document.addEventListener("DOMContentLoaded", () => {
  // Menu Mobile
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = document.querySelectorAll(".nav-links a");

  // Função para fechar o menu
  const closeMenu = () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.style.overflow = "auto"; // Permite rolagem quando menu fechado
  };

  // Função para abrir o menu
  const openMenu = () => {
    hamburger.classList.add("active");
    navLinks.classList.add("active");
    document.body.style.overflow = "hidden"; // Impede rolagem quando menu aberto
  };

  // Toggle do menu hamburger
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      if (hamburger.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  // Fechar menu ao clicar em um link
  navLinksItems.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Fechar menu ao clicar fora
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".nav-links") &&
      !e.target.closest(".hamburger") &&
      navLinks.classList.contains("active")
    ) {
      closeMenu();
    }
  });

  // Fechar menu ao redimensionar para desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
      closeMenu();
    }
  });

  // Tema escuro/claro
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;
  const currentTheme = localStorage.getItem("theme") || "light";

  // Aplicar tema salvo
  body.setAttribute("data-theme", currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const newTheme =
        body.getAttribute("data-theme") === "dark" ? "light" : "dark";
      body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  // Animação de scroll suave
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollBy({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Animação de entrada dos elementos
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Adiciona animação aos elementos
  document
    .querySelectorAll(
      "section, .produto-card, .cliente-card, .diferencial-card, .especialista-card"
    )
    .forEach((element) => {
      element.style.opacity = "0";
      observer.observe(element);
    });

  // Animação de hover nos cards (apenas em desktop)
  const cards = document.querySelectorAll(
    ".produto-card, .cliente-card, .diferencial-card, .especialista-card"
  );

  if (window.innerWidth > 768) {
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px)";
        card.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      });
    });
  }

  // Animação dos números nas estatísticas
  const stats = document.querySelectorAll(".stat-number");

  stats.forEach((stat) => {
    const finalNumber = parseInt(stat.textContent.replace(/[^0-9]/g, ""));
    let currentNumber = 0;
    const duration = 2000; // 2 segundos
    const steps = 60;
    const increment = finalNumber / steps;

    const animate = () => {
      currentNumber = Math.min(currentNumber + increment, finalNumber);
      stat.textContent = Math.round(currentNumber).toLocaleString();

      if (currentNumber < finalNumber) {
        requestAnimationFrame(animate);
      }
    };

    observer.observe(stat.parentElement);
    stat.parentElement.addEventListener("animationstart", () => {
      setTimeout(animate, 500);
    });
  });
});
