const TEMP_KEY = "operation_log_draft";

export const formSubmit = () => {
	const form = document.getElementById("log-form");
	const tbody = document.getElementById("log-entries");
	const templateRow = tbody.lastElementChild;


templateRow.querySelectorAll("input, select").forEach((field) => {
	field.addEventListener("input", saveDraft);
	field.addEventListener("change", saveDraft);
});

// Сохранение черновика в localStorage
function saveDraft() {
	const draft = {};
	templateRow.querySelectorAll("input, select").forEach((field) => {
		draft[field.name] = field.value;
	});
	localStorage.setItem(TEMP_KEY, JSON.stringify(draft));
}

// Загрузка черновика при старте
function loadDraft() {
	const draft = JSON.parse(localStorage.getItem(TEMP_KEY)) || {};
	templateRow.querySelectorAll("input, select").forEach((field) => {
		if (draft[field.name]) {
			field.value = draft[field.name];
		}
	});
}



	const saveToLocalStorage = (entries) => {
		localStorage.setItem("operation_log", JSON.stringify(entries));
	};

	const loadFromLocalStorage = () => {
		const data = JSON.parse(localStorage.getItem("operation_log")) || [];

		// Удаляем все строки кроме последней (формы)
		tbody
			.querySelectorAll("tr:not(:last-child)")
			.forEach((row) => row.remove());

		data.forEach((entry, index) => {
			const row = document.createElement("tr");

			// Создаем ячейки с данными
			templateRow.querySelectorAll("input, select").forEach((field, i) => {
				const td = document.createElement("td");
				td.textContent = entry[field.name] || "";
				td.style.position = "relative"; // Для абсолютного позиционирования кнопки внутри первой ячейки

				// Добавляем кнопку только в первую ячейку
				if (i === 0) {
					const editBtn = document.createElement("button");
					editBtn.textContent = "✏️";
					editBtn.className = "edit-btn";

					// Абсолютное позиционирование кнопки слева и по центру по вертикали
					editBtn.style.position = "absolute";
					editBtn.style.left = "-14px";
					editBtn.style.top = "50%";
					editBtn.style.transform = "translateY(-50%)";
					editBtn.style.padding = "2px 6px";
					editBtn.style.fontSize = "12px";
					editBtn.style.border = "none";
					editBtn.style.background = "#eee";
					editBtn.style.cursor = "pointer";
					editBtn.style.zIndex = "10";

					editBtn.addEventListener("click", () => {
						// Заполняем форму данными записи
						templateRow.querySelectorAll("input, select").forEach((field) => {
							field.value = entry[field.name] || "";
						});

						// Удаляем запись из localStorage и обновляем таблицу
						data.splice(index, 1);
						saveToLocalStorage(data);
						localStorage.removeItem(TEMP_KEY); 
						loadFromLocalStorage();
					});

					td.appendChild(editBtn);
				}

				row.appendChild(td);
			});

			tbody.insertBefore(row, templateRow);
		});
	};

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const newEntry = {};
		let isValid = true;

		templateRow.querySelectorAll("input, select").forEach((field) => {
			const value = field.value.trim();
			newEntry[field.name] = value;

			if (!value) {
				isValid = false;
				field.style.border = "0.5px solid red";
				field.title = "This entry is required";
			} else {
				field.style.border = "";
				field.title = "";
			}
		});

		if (!isValid) {
			alert("Please fill all entries");
			return;
		}

		const data = JSON.parse(localStorage.getItem("operation_log")) || [];
		data.push(newEntry);
		saveToLocalStorage(data);
		localStorage.removeItem(TEMP_KEY); 

		// Очистка формы
		templateRow.querySelectorAll("input").forEach((input) => {
			if (input.type !== "submit") input.value = "";
		});
		templateRow.querySelectorAll("select").forEach((select) => {
			select.selectedIndex = 0;
		});

		loadFromLocalStorage();
	});

	loadFromLocalStorage();
	loadDraft();
};
