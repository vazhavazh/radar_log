
// export const formSubmit = () => {
// 	const form = document.getElementById("log-form");
// 	const tbody = document.getElementById("log-entries");
// 	const templateRow = tbody.lastElementChild;

// 	// Функция для сохранения данных в localStorage
// 	const saveToLocalStorage = (entries) => {
// 		localStorage.setItem("operation_log", JSON.stringify(entries));
// 	};

// 	// Функция для загрузки данных из localStorage и отрисовки
// 	const loadFromLocalStorage = () => {
// 		const data = JSON.parse(localStorage.getItem("operation_log")) || [];

// 		// Удаляем все строки кроме последней (формы)
// 		tbody
// 			.querySelectorAll("tr:not(:last-child)")
// 			.forEach((row) => row.remove());

// 		// Добавляем строки из localStorage
// 		data.forEach((entry) => {
// 			const row = document.createElement("tr");

// 			templateRow.querySelectorAll("input, select").forEach((field) => {
// 				const td = document.createElement("td");
// 				// Для select в localStorage лучше хранить значение, а не текст,
// 				// но если хочешь текст - можно здесь подставить:
// 				if (field.tagName === "SELECT") {
// 					td.textContent = entry[field.name] || "";
// 				} else {
// 					td.textContent = entry[field.name] || "";
// 				}
// 				row.appendChild(td);
// 			});

// 			tbody.insertBefore(row, templateRow);
// 		});
// 	};

// 	form.addEventListener("submit", (e) => {
// 		e.preventDefault();

// 		// Создаем объект с данными из формы
// 		const newEntry = {};
// 		templateRow.querySelectorAll("input, select").forEach((field) => {
// 			if (field.tagName === "SELECT") {
// 				newEntry[field.name] = field.value; // сохраняем value, чтобы не было проблем при загрузке
// 			} else {
// 				newEntry[field.name] = field.value;
// 			}
// 		});

// 		// Создаем новую строку и вставляем данные
// 		const dataRow = document.createElement("tr");
// 		templateRow.querySelectorAll("input, select").forEach((field) => {
// 			const td = document.createElement("td");
// 			if (field.tagName === "SELECT") {
// 				// Показываем текст выбранной опции
// 				td.textContent = field.options[field.selectedIndex]?.text || "";
// 			} else {
// 				td.textContent = field.value;
// 			}
// 			dataRow.appendChild(td);
// 		});
// 		tbody.insertBefore(dataRow, templateRow);

// 		// Сохраняем в localStorage
// 		const data = JSON.parse(localStorage.getItem("operation_log")) || [];
// 		data.push(newEntry);
// 		saveToLocalStorage(data);

// 		// Очищаем форму
// 		templateRow.querySelectorAll("input").forEach((input) => {
// 			if (input.type !== "submit") input.value = "";
// 		});
// 		templateRow.querySelectorAll("select").forEach((select) => {
// 			select.selectedIndex = 0;
// 		});
// 	});

// 	// При загрузке страницы
// 	loadFromLocalStorage();
// };


export const formSubmit = () => {
	const form = document.getElementById("log-form");
	const tbody = document.getElementById("log-entries");
	const templateRow = tbody.lastElementChild;

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
		templateRow.querySelectorAll("input, select").forEach((field) => {
			newEntry[field.name] = field.value;
		});

		const data = JSON.parse(localStorage.getItem("operation_log")) || [];
		data.push(newEntry);
		saveToLocalStorage(data);

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
};
