document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});

// Cmd/Ctrl+K opens search
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "k") {
    e.preventDefault();
    const search = document.querySelector("#__search");
    if (search && !search.checked) {
      search.checked = true;
      search.dispatchEvent(new Event("change", { bubbles: true }));
    }
    requestAnimationFrame(() => document.querySelector(".md-search__input")?.focus());
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".md-search__input");
  if (input) input.placeholder = `Search (${navigator.platform.includes("Mac") ? "⌘K" : "Ctrl+K"})`;
});
