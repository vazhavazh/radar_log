export const themeToggler = () => {
	const toggleButton = document.getElementById("themeToggle");

	function setTheme(theme) {
		const html = document.documentElement;
		if (theme === "dark") {
			html.setAttribute("data-theme", "dark");
			toggleButton.textContent = "🌙"; // показать "Солнце" — кнопка включает свет
		} else {
			html.removeAttribute("data-theme");
			toggleButton.textContent = "☀️"; // показать "Луну" — кнопка включает тьму
		}
		localStorage.setItem("theme", theme);
	}

	toggleButton.addEventListener("click", () => {
		const currentTheme =
			document.documentElement.getAttribute("data-theme") === "dark"
				? "dark"
				: "light";
		setTheme(currentTheme === "dark" ? "light" : "dark");
	});

	// При загрузке
	window.addEventListener("DOMContentLoaded", () => {
		const savedTheme = localStorage.getItem("theme") || "light";
		setTheme(savedTheme);
	});
};
