
document.addEventListener("DOMContentLoaded", () => {
	// Получение ID из URL
	const urlParams = new URLSearchParams(window.location.search);
	const targetId = urlParams.get("id");

	if (!targetId) {
		alert("ID of entry not found!");
		window.location.href = "index.html";
		return;
	}

	const data = JSON.parse(localStorage.getItem("operation_log")) || [];
	const foundEntry = data.find((entry) => entry.id === targetId);

	if (!foundEntry) {
		alert("Entry not find!");
		window.location.href = "index.html";
		return;
	}

	console.log("Найденная запись:", foundEntry);

	// Заполнение формы данными
	const form = document.getElementById("edit-form");
	for (const key in foundEntry) {
		if (key !== "id") {
			// не заполняем поле id
			const input = form.querySelector(`[name="${key}"]`);
			if (input) {
				input.value = foundEntry[key];
				console.log(`Filled ${key}: ${foundEntry[key]}`);
			}
		}
	}

	// Обработка сохранения формы
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		// Собираем обновленные данные из формы
		const updatedEntry = { id: targetId }; // сохраняем ID
		let isValid = true;

		// Проходим по всем полям формы
		form.querySelectorAll("input, select").forEach((field) => {
			const value = field.value.trim();
			updatedEntry[field.name] = value;

			// Проверяем обязательные поля
			if (field.hasAttribute("required") && !value) {
				isValid = false;
				field.style.border = "2px solid red";
				console.log(`Empty entry: ${field.name}`);
			} else {
				field.style.border = "";
			}
		});

		if (!isValid) {
			alert("Please fill all entries!");
			return;
		}

		console.log("Updated entries", updatedEntry);

		// Обновляем запись в localStorage
		const allData = JSON.parse(localStorage.getItem("operation_log")) || [];
		const entryIndex = allData.findIndex((item) => item.id === targetId);

		if (entryIndex !== -1) {
			allData[entryIndex] = updatedEntry;
			localStorage.setItem("operation_log", JSON.stringify(allData));
			alert("Successfully updated");
			window.location.href = "index.html"; // возвращаемся на главную
		} else {
			alert("Error during updating!");
		}
	});

	// Обработка кнопки Cancel
	const cancelBtn = document.getElementById("cancel-btn");
	if (cancelBtn) {
		cancelBtn.addEventListener("click", () => {
			if (confirm("Are you sure? All unsaved data will be lost")) {
				window.location.href = "index.html";
			}
		});
	}
});
