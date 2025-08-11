
// const TEMP_KEY = "operation_log_draft";

// export const formSubmit = () => {
// 	const form = document.getElementById("log-form");
// 	const tbody = document.getElementById("log-entries");

// 	function saveDraft() {
// 		const templateRow = document.getElementById("template-row");
// 		const draft = {};
// 		templateRow.querySelectorAll("input, select").forEach((field) => {
// 			draft[field.name] = field.value;
// 		});
// 		localStorage.setItem(TEMP_KEY, JSON.stringify(draft));
// 	}

// 	function loadDraft() {
// 		const templateRow = document.getElementById("template-row");
// 		const draft = JSON.parse(localStorage.getItem(TEMP_KEY)) || {};
// 		templateRow.querySelectorAll("input, select").forEach((field) => {
// 			if (draft[field.name]) {
// 				field.value = draft[field.name];
// 			}
// 		});
// 	}

// 	const saveToStorage = (entries) => {
// 		localStorage.setItem("operation_log", JSON.stringify(entries));
// 	};

// 	const loadFromStorage = () => {
// 		const data = JSON.parse(localStorage.getItem("operation_log")) || [];

// 		const tbody = document.getElementById("log-entries");
// 		const templateRow = document.getElementById("template-row");
// 		const templateClone = templateRow.cloneNode(true);
// 		tbody.innerHTML = "";
// 		tbody.appendChild(templateClone);

// 		// Добавляем записи ниже формы
// 		data.forEach((entry, index) => {
// 			const row = createEditableRow(entry, index);
// 			tbody.appendChild(row);
// 		});

// 		// Навешиваем слушатели на поля формы для сохранения черновика
// 		templateClone.querySelectorAll("input, select").forEach((field) => {
// 			field.addEventListener("input", saveDraft);
// 			field.addEventListener("change", saveDraft);
// 		});
// 	};

// 	// Функция создания редактируемой строки
// 	const createEditableRow = (entry, index) => {
// 		const row = document.createElement("tr");
// 		row.setAttribute("data-index", index);

// 		// Создаем ячейки с данными
// 		const templateRow = document.getElementById("template-row");
// 		const fields = templateRow.querySelectorAll("input, select");

// 		fields.forEach((field) => {
// 			const td = document.createElement("td");
// 			const value = entry[field.name] || "";

// 			// Создаем span для отображения значения
// 			const displaySpan = document.createElement("span");
// 			displaySpan.textContent = getDisplayValue(field, value);
// 			displaySpan.className = "display-value";
// 			displaySpan.style.cursor = "pointer";
// 			displaySpan.title = "Click to Edit";

// 			td.appendChild(displaySpan);
// 			row.appendChild(td);
// 		});

// 		// Добавляем кнопку удаления
// 		const actionTd = document.createElement("td");
// 		const deleteBtn = document.createElement("button");
// 		deleteBtn.textContent = "Delete";
// 		deleteBtn.className = "delete-btn";
// 		deleteBtn.style.cssText =
// 			"background: #ff4444; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 12px;";
// 		deleteBtn.onclick = () => deleteEntry(index);
// 		actionTd.appendChild(deleteBtn);
// 		row.appendChild(actionTd);

// 		// Добавляем обработчики клика для редактирования
// 		row.addEventListener("click", (e) => {
// 			if (e.target.classList.contains("display-value")) {
// 				makeRowEditable(row, entry, index);
// 			}
// 		});

// 		return row;
// 	};

// 	// Функция получения отображаемого значения
// 	const getDisplayValue = (field, value) => {
// 		if (field.tagName === "SELECT") {
// 			const option = field.querySelector(`option[value="${value}"]`);
// 			return option ? option.textContent : value;
// 		}
// 		if (field.type === "datetime-local" && value) {
// 			return new Date(value).toLocaleString();
// 		}
// 		return value;
// 	};

// 	// Функция превращения строки в редактируемую
// 	const makeRowEditable = (row, entry, index) => {
// 		const templateRow = document.getElementById("template-row");
// 		const fields = templateRow.querySelectorAll("input, select");
// 		const cells = row.querySelectorAll("td");

// 		// Заменяем отображение на поля ввода
// 		fields.forEach((field, i) => {
// 			if (i < cells.length - 1) {
// 				// Исключаем последнюю ячейку с кнопкой удаления
// 				const cell = cells[i];
// 				const currentValue = entry[field.name] || "";

// 				let inputElement;
// 				if (field.tagName === "SELECT") {
// 					inputElement = field.cloneNode(true);
// 					inputElement.value = currentValue;
// 				} else {
// 					inputElement = document.createElement("input");
// 					inputElement.type = field.type;
// 					inputElement.name = field.name;
// 					inputElement.value = currentValue;
// 					inputElement.placeholder = field.placeholder;

// 					// Копируем атрибуты datalist если есть
// 					if (field.hasAttribute("list")) {
// 						inputElement.setAttribute("list", field.getAttribute("list"));
// 					}
// 					if (field.hasAttribute("maxlength")) {
// 						inputElement.setAttribute(
// 							"maxlength",
// 							field.getAttribute("maxlength")
// 						);
// 					}
// 				}

// 				inputElement.style.width = "100%";
// 				inputElement.style.border = "1px solid #007bff";
// 				cell.innerHTML = "";
// 				cell.appendChild(inputElement);
// 			}
// 		});

// 		// Заменяем кнопку удаления на кнопки сохранения и отмены
// 		const actionCell = cells[cells.length - 1];
// 		actionCell.innerHTML = "";

// 		const saveBtn = document.createElement("button");
// 		saveBtn.textContent = "Save";
// 		saveBtn.style.cssText =
// 			"background: #28a745; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 12px; width: 100%; margin-bottom: 4px; margin-bottom: 5px; width: 100%;";

// 		const cancelBtn = document.createElement("button");
// 		cancelBtn.textContent = "Cancel";
// 		cancelBtn.style.cssText =
// 			"background: #6c757d; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 12px;";

// 		actionCell.appendChild(saveBtn);
// 		actionCell.appendChild(cancelBtn);

// 		// Обработчик сохранения
// 		saveBtn.onclick = () => {
// 			const updatedEntry = {};
// 			let isValid = true;

// 			fields.forEach((field, i) => {
// 				if (i < cells.length - 1) {
// 					const input = cells[i].querySelector("input, select");
// 					const value = input.value.trim();
// 					updatedEntry[field.name] = value;

// 					if (!value) {
// 						isValid = false;
// 						input.style.border = "1px solid red";
// 					} else {
// 						input.style.border = "1px solid #007bff";
// 					}
// 				}
// 			});

// 			if (!isValid) {
// 				alert("Пожалуйста, заполните все поля");
// 				return;
// 			}

// 			// Обновляем данные
// 			const data = JSON.parse(localStorage.getItem("operation_log")) || [];
// 			data[index] = updatedEntry;
// 			saveToStorage(data);
// 			loadFromStorage();
// 		};

// 		// Обработчик отмены
// 		cancelBtn.onclick = () => {
// 			loadFromStorage();
// 		};
// 	};

// 	// Функция удаления записи
// 	const deleteEntry = (index) => {
// 		if (confirm("Are you sure, you want to delete this entry?")) {
// 			const data = JSON.parse(localStorage.getItem("operation_log")) || [];
// 			data.splice(index, 1);
// 			saveToStorage(data);
// 			loadFromStorage();
// 		}
// 	};

// 	// Обработчик отправки формы
// 	form.addEventListener("submit", (e) => {
// 		e.preventDefault();

// 		const templateRow = document.getElementById("template-row");
// 		const newEntry = {};
// 		let isValid = true;

// 		templateRow.querySelectorAll("input, select").forEach((field) => {
// 			const value = field.value.trim();
// 			newEntry[field.name] = value;

// 			if (!value) {
// 				isValid = false;
// 				field.style.border = "0.5px solid red";
// 				field.title = "This entry is required";
// 			} else {
// 				field.style.border = "";
// 				field.title = "";
// 			}
// 		});

// 		if (!isValid) {
// 			alert("Please fill all entries");
// 			return;
// 		}

// 		const data = JSON.parse(localStorage.getItem("operation_log")) || [];
// 		data.unshift(newEntry);
// 		saveToStorage(data);
// 		localStorage.removeItem(TEMP_KEY);

// 		// Очистка формы
// 		templateRow.querySelectorAll("input").forEach((input) => {
// 			if (input.type !== "submit") input.value = "";
// 		});
// 		templateRow.querySelectorAll("select").forEach((select) => {
// 			select.selectedIndex = 0;
// 		});

// 		loadFromStorage();
// 	});

// 	// Инициализация
// 	loadFromStorage();
// 	loadDraft();
// };
const TEMP_KEY = "operation_log_draft";

export const formSubmit = () => {
	const form = document.getElementById("log-form");
	const tbody = document.getElementById("log-entries");

	function saveDraft() {
		const templateRow = document.getElementById("template-row");
		const draft = {};
		templateRow.querySelectorAll("input, select").forEach((field) => {
			draft[field.name] = field.value;
		});
		localStorage.setItem(TEMP_KEY, JSON.stringify(draft));
	}

	function loadDraft() {
		const templateRow = document.getElementById("template-row");
		const draft = JSON.parse(localStorage.getItem(TEMP_KEY)) || {};
		templateRow.querySelectorAll("input, select").forEach((field) => {
			if (draft[field.name]) {
				field.value = draft[field.name];
			}
		});
	}

	const saveToStorage = (entries) => {
		localStorage.setItem("operation_log", JSON.stringify(entries));
	};

	const loadFromStorage = () => {
		const data = JSON.parse(localStorage.getItem("operation_log")) || [];

		const tbody = document.getElementById("log-entries");
		const templateRow = document.getElementById("template-row");
		const templateClone = templateRow.cloneNode(true);
		tbody.innerHTML = "";
		tbody.appendChild(templateClone);

		// Добавляем записи ниже формы
		data.forEach((entry, index) => {
			const row = createEditableRow(entry, index);
			tbody.appendChild(row);
		});

		// Навешиваем слушатели на поля формы для сохранения черновика
		templateClone.querySelectorAll("input, select").forEach((field) => {
			field.addEventListener("input", saveDraft);
			field.addEventListener("change", saveDraft);
		});
	};

	// Функция создания редактируемой строки
	const createEditableRow = (entry, index) => {
		const row = document.createElement("tr");
		row.setAttribute("data-index", index);

		// Создаем ячейки с данными
		const templateRow = document.getElementById("template-row");
		const fields = templateRow.querySelectorAll("input, select");

		fields.forEach((field) => {
			const td = document.createElement("td");
			const value = entry[field.name] || "";

			// Создаем span для отображения значения
			const displaySpan = document.createElement("span");
			displaySpan.textContent = getDisplayValue(field, value);
			displaySpan.className = "display-value";

			td.appendChild(displaySpan);
			row.appendChild(td);
		});

		// Добавляем кнопку редактирования
		const editTd = document.createElement("td");
		const editBtn = document.createElement("button");
		editBtn.textContent = "✏️";
		editBtn.className = "edit-btn";
		editBtn.style.cssText =
			"background: #007bff; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 12px; width: 2rem; margin-bottom: 4px; position: absolute; left: -37px; top: 50%; transform: translateY(-50%);";
		editBtn.onclick = () => makeRowEditable(row, entry, index);
		editTd.appendChild(editBtn);

		// Добавляем кнопку удаления
		const deleteBtn = document.createElement("button");
		deleteBtn.textContent = "Delete";
		deleteBtn.className = "delete-btn";
		deleteBtn.style.cssText =
			"background: #ff4444; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 12px;";
		deleteBtn.onclick = () => deleteEntry(index);
		editTd.appendChild(deleteBtn);
		row.appendChild(editTd);

		return row;
	};

	// Функция получения отображаемого значения
	const getDisplayValue = (field, value) => {
		if (field.tagName === "SELECT") {
			const option = field.querySelector(`option[value="${value}"]`);
			return option ? option.textContent : value;
		}
		if (field.type === "datetime-local" && value) {
			return new Date(value).toLocaleString();
		}
		return value;
	};

	// Функция превращения строки в редактируемую
	const makeRowEditable = (row, entry, index) => {
		const templateRow = document.getElementById("template-row");
		const fields = templateRow.querySelectorAll("input, select");
		const cells = row.querySelectorAll("td");

		// Заменяем отображение на поля ввода
		fields.forEach((field, i) => {
			if (i < cells.length - 1) {
				// Исключаем последнюю ячейку с кнопками
				const cell = cells[i];
				const currentValue = entry[field.name] || "";

				let inputElement;
				if (field.tagName === "SELECT") {
					inputElement = field.cloneNode(true);
					inputElement.value = currentValue;
				} else {
					inputElement = document.createElement("input");
					inputElement.type = field.type;
					inputElement.name = field.name;
					inputElement.value = currentValue;
					inputElement.placeholder = field.placeholder;

					// Копируем атрибуты datalist если есть
					if (field.hasAttribute("list")) {
						inputElement.setAttribute("list", field.getAttribute("list"));
					}
					if (field.hasAttribute("maxlength")) {
						inputElement.setAttribute(
							"maxlength",
							field.getAttribute("maxlength")
						);
					}
				}

				inputElement.style.width = "100%";
				inputElement.style.border = "1px solid #007bff";
				cell.innerHTML = "";
				cell.appendChild(inputElement);
			}
		});

		// Заменяем кнопку удаления на кнопки сохранения и отмены
		const actionCell = cells[cells.length - 1];
		actionCell.innerHTML = "";

		const saveBtn = document.createElement("button");
		saveBtn.textContent = "Save";
		saveBtn.style.cssText =
			"background: #28a745; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 12px; width: 100%; margin-bottom: 4px; margin-bottom: 5px; width: 100%;";

		const cancelBtn = document.createElement("button");
		cancelBtn.textContent = "Cancel";
		cancelBtn.style.cssText =
			"background: #6c757d; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 12px;";

		actionCell.appendChild(saveBtn);
		actionCell.appendChild(cancelBtn);

		// Обработчик сохранения
		saveBtn.onclick = () => {
			const updatedEntry = {};
			let isValid = true;

			fields.forEach((field, i) => {
				if (i < cells.length - 1) {
					const input = cells[i].querySelector("input, select");
					const value = input.value.trim();
					updatedEntry[field.name] = value;

					if (!value) {
						isValid = false;
						input.style.border = "1px solid red";
					} else {
						input.style.border = "1px solid #007bff";
					}
				}
			});

			if (!isValid) {
				alert("Пожалуйста, заполните все поля");
				return;
			}

			// Обновляем данные
			const data = JSON.parse(localStorage.getItem("operation_log")) || [];
			data[index] = updatedEntry;
			saveToStorage(data);
			loadFromStorage();
		};

		// Обработчик отмены
		cancelBtn.onclick = () => {
			loadFromStorage();
		};
	};

	// Функция удаления записи
	const deleteEntry = (index) => {
		if (confirm("Are you sure, you want to delete this entry?")) {
			const data = JSON.parse(localStorage.getItem("operation_log")) || [];
			data.splice(index, 1);
			saveToStorage(data);
			loadFromStorage();
		}
	};

	// Обработчик отправки формы
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const templateRow = document.getElementById("template-row");
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
		data.unshift(newEntry);
		saveToStorage(data);
		localStorage.removeItem(TEMP_KEY);

		// Очистка формы
		templateRow.querySelectorAll("input").forEach((input) => {
			if (input.type !== "submit") input.value = "";
		});
		templateRow.querySelectorAll("select").forEach((select) => {
			select.selectedIndex = 0;
		});

		loadFromStorage();
	});

	// Инициализация
	loadFromStorage();
	loadDraft();
};