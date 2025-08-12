
const TEMP_KEY = "operation_log_draft";

export const formSubmit = () => {
	// DOM Elements
	const form = document.getElementById("log-form");
	const tbody = document.getElementById("log-entries");

	// Generate ID
	const generateId = () => {
		return Date.now().toString(36) + Math.random().toString(36).substr(2);
	};

	// Draft Management
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

	// Storage Management
	const saveToStorage = (entries) => {
		localStorage.setItem("operation_log", JSON.stringify(entries));
	};

	const loadFromStorage = () => {
		let data = JSON.parse(localStorage.getItem("operation_log")) || [];

		
		data = data.map((entry) => {
			if (!entry.id) {
				entry.id = generateId();
			}
			return entry;
		});

		
		if (data.some((entry) => !entry.id)) {
			saveToStorage(data);
		}

		
		const sortedData = [...data].sort((a, b) => {
			const dateA = new Date(a.datetime);
			const dateB = new Date(b.datetime);
			return dateB - dateA; 
		});

		const tbody = document.getElementById("log-entries");
		const templateRow = document.getElementById("template-row");
		const templateClone = templateRow.cloneNode(true);
		tbody.innerHTML = "";
		tbody.appendChild(templateClone);

		console.log(sortedData);

		sortedData.forEach((entry) => {
			const row = createEditableRow(entry);
			tbody.appendChild(row);
		});

		templateClone.querySelectorAll("input, select").forEach((field) => {
			field.addEventListener("input", saveDraft);
			field.addEventListener("change", saveDraft);
		});
	};

	// Row Creation and Editing
	const createEditableRow = (entry) => {
		const row = document.createElement("tr");
		row.setAttribute("data-id", entry.id);

		const templateRow = document.getElementById("template-row");
		const fields = templateRow.querySelectorAll("input, select");

		fields.forEach((field) => {
			const td = document.createElement("td");
			const value = entry[field.name] || "";
			const displaySpan = document.createElement("span");
			displaySpan.textContent = getDisplayValue(field, value);
			displaySpan.className = "display-value";
			td.appendChild(displaySpan);
			row.appendChild(td);
		});

		const editTd = document.createElement("td");
		const editBtn = document.createElement("button");
		editBtn.textContent = "✏️";
		editBtn.className = "edit-btn";
		editBtn.style.cssText =
			"background: #007bff; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 12px; width: 2rem; margin-bottom: 4px; position: absolute; left: -37px; top: 50%; transform: translateY(-50%);";
		editBtn.onclick = () => makeRowEditable(row, entry);
		editTd.appendChild(editBtn);

		const deleteBtn = document.createElement("button");
		deleteBtn.textContent = "Delete";
		deleteBtn.className = "delete-btn";
		deleteBtn.style.cssText =
			"background: #ff4444; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 12px;";
		deleteBtn.onclick = () => deleteEntry(entry.id);
		editTd.appendChild(deleteBtn);
		row.appendChild(editTd);

		return row;
	};

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

	const makeRowEditable = (row, entry) => {
		const templateRow = document.getElementById("template-row");
		const fields = templateRow.querySelectorAll("input, select");
		const cells = row.querySelectorAll("td");

		fields.forEach((field, i) => {
			if (i < cells.length - 1) {
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

		saveBtn.onclick = () => {
			const updatedEntry = { id: entry.id }; // Сохраняем ID
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

			// Обновляем запись по ID
			const data = JSON.parse(localStorage.getItem("operation_log")) || [];
			const entryIndex = data.findIndex((item) => item.id === entry.id);

			if (entryIndex !== -1) {
				data[entryIndex] = updatedEntry;
				saveToStorage(data);
			}

			loadFromStorage();
		};
		cancelBtn.onclick = () => {
			loadFromStorage();
		};
	};

	// Entry Management
	const deleteEntry = (entryId) => {
		if (confirm("Are you sure, you want to delete this entry?")) {
			const data = JSON.parse(localStorage.getItem("operation_log")) || [];
			const updatedData = data.filter((entry) => entry.id !== entryId);
			saveToStorage(updatedData);
			loadFromStorage();
		}
	};

	// Form Submission
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const templateRow = document.getElementById("template-row");
		const newEntry = {
			id: generateId(), 
		};
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
		saveToStorage(data);
		localStorage.removeItem(TEMP_KEY);

		templateRow.querySelectorAll("input").forEach((input) => {
			if (input.type !== "submit") input.value = "";
		});
		templateRow.querySelectorAll("select").forEach((select) => {
			select.selectedIndex = 0;
		});

		loadFromStorage();
	});

	// Initialization
	loadFromStorage();
	loadDraft();
};