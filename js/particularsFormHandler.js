// formManager.js - ES6 версия
// Функции для работы с формами и данными

// ============================================
// ОБЩИЕ ФУНКЦИИ
// ============================================

// Функция для сохранения данных в localStorage
function saveToStorage(key, data) {
	try {
		localStorage.setItem(key, JSON.stringify(data));
		console.log(`Data saved to ${key}`);
		return true;
	} catch (error) {
		console.error("Error saving to localStorage:", error);
		return false;
	}
}

// Функция для загрузки данных из localStorage
function loadFromStorage(key) {
	try {
		const data = localStorage.getItem(key);
		return data ? JSON.parse(data) : null;
	} catch (error) {
		console.error("Error loading from localStorage:", error);
		return null;
	}
}

// ============================================
// ФОРМА: GENERAL SHIP'S PARTICULARS
// ============================================

export function initGeneralParticularsForm() {
	const form = document.getElementById("log-form-particulars");
	const saveBtn = document.getElementById("general-particulars-btn-save");
	const editBtn = document.getElementById("general-particulars-btn-edit");

	// Загрузка данных при инициализации
	loadGeneralParticularsData();

	// Обработчик для кнопки Save
	if (saveBtn) {
		saveBtn.addEventListener("click", (e) => {
			e.preventDefault();
			saveGeneralParticularsData();
		});
	}

	// Обработчик для кнопки Edit
	if (editBtn) {
		editBtn.addEventListener("click", (e) => {
			e.preventDefault();
			enableFormEditing(form);
		});
	}
}

function saveGeneralParticularsData() {
	const form = document.getElementById("log-form-particulars");
	const formData = new FormData(form);
	const data = {};

	// Собираем данные из формы
	for (let [key, value] of formData.entries()) {
		data[key] = value;
	}

	if (saveToStorage("generalParticulars", data)) {
		alert("General Ship's Particulars saved successfully!");
	} else {
		alert("Error saving data!");
	}
}

function loadGeneralParticularsData() {
	const data = loadFromStorage("generalParticulars");
	if (!data) return;

	const form = document.getElementById("log-form-particulars");

	// Заполняем поля формы
	Object.keys(data).forEach((key) => {
		const input = form.querySelector(`[name="${key}"]`);
		if (input) {
			input.value = data[key];
		}
	});
}

// ============================================
// ФОРМА: RADAR PARTICULARS
// ============================================

export function initRadarParticularsForm() {
	const form = document.getElementById("radar-particulars");
	const saveBtn = document.getElementById("installation-btn-save");

	// Загрузка данных при инициализации
	loadRadarParticularsData();

	// Обработчик для кнопки Save
	if (saveBtn) {
		saveBtn.addEventListener("click", (e) => {
			e.preventDefault();
			saveRadarParticularsData();
		});
	}
}

function saveRadarParticularsData() {
	const table = document.querySelector("#radar-particulars table");
	const data = {};

	// Собираем данные из contenteditable ячеек
	const rows = table.querySelectorAll("tbody tr");
	rows.forEach((row, rowIndex) => {
		const cells = row.querySelectorAll('td[contenteditable="true"]');
		const rowLabel = row.querySelector("td:first-child")?.textContent?.trim();

		if (rowLabel && cells.length > 0) {
			data[rowLabel] = {};
			cells.forEach((cell, cellIndex) => {
				const columnName = `radar${cellIndex + 1}`;
				data[rowLabel][columnName] = cell.textContent.trim();
			});
		}
	});

	if (saveToStorage("radarParticulars", data)) {
		alert("Radar Particulars saved successfully!");
	} else {
		alert("Error saving radar data!");
	}
}

function loadRadarParticularsData() {
	const data = loadFromStorage("radarParticulars");
	if (!data) return;

	const table = document.querySelector("#radar-particulars table");
	const rows = table.querySelectorAll("tbody tr");

	rows.forEach((row) => {
		const rowLabel = row.querySelector("td:first-child")?.textContent?.trim();
		if (rowLabel && data[rowLabel]) {
			const cells = row.querySelectorAll('td[contenteditable="true"]');
			cells.forEach((cell, cellIndex) => {
				const columnName = `radar${cellIndex + 1}`;
				if (data[rowLabel][columnName] !== undefined) {
					cell.textContent = data[rowLabel][columnName];
				}
			});
		}
	});
}

// ============================================
// ФОРМА: BLIND SECTORS
// ============================================

export function initBlindSectorsForm() {
	const form = document.getElementById("blind-sectors");
	const saveBtn = document.getElementById("blind-sector-btn-save");

	// Загрузка данных при инициализации
	loadBlindSectorsData();

	// Обработчик для кнопки Save
	if (saveBtn) {
		saveBtn.addEventListener("click", (e) => {
			e.preventDefault();
			saveBlindSectorsData();
		});
	}
}

function saveBlindSectorsData() {
	const data = {
		radar1: {
			startAngle: document.getElementById("startAngleInput1")?.value || "0",
			sectorWidth: document.getElementById("sectorWidthInput1")?.value || "15",
		},
		radar2: {
			startAngle: document.getElementById("startAngleInput2")?.value || "0",
			sectorWidth: document.getElementById("sectorWidthInput2")?.value || "15",
		},
	};

	if (saveToStorage("blindSectors", data)) {
		alert("Blind Sectors data saved successfully!");
	} else {
		alert("Error saving blind sectors data!");
	}
}

function loadBlindSectorsData() {
	const data = loadFromStorage("blindSectors");
	if (!data) return;

	// Загрузка данных для первого радара
	if (data.radar1) {
		const startAngle1 = document.getElementById("startAngleInput1");
		const sectorWidth1 = document.getElementById("sectorWidthInput1");

		if (startAngle1) startAngle1.value = data.radar1.startAngle;
		if (sectorWidth1) sectorWidth1.value = data.radar1.sectorWidth;
	}

	// Загрузка данных для второго радара
	if (data.radar2) {
		const startAngle2 = document.getElementById("startAngleInput2");
		const sectorWidth2 = document.getElementById("sectorWidthInput2");

		if (startAngle2) startAngle2.value = data.radar2.startAngle;
		if (sectorWidth2) sectorWidth2.value = data.radar2.sectorWidth;
	}
}

// ============================================
// ФОРМА: INSTALLATION
// ============================================

export function initInstallationForm() {
	const form = document.getElementById("form-installation");
	const saveBtn = form?.querySelector("#installation-btn-save");

	// Загрузка данных при инициализации
	loadInstallationData();

	// Обработчик для кнопки Save
	if (saveBtn) {
		saveBtn.addEventListener("click", (e) => {
			e.preventDefault();
			saveInstallationData();
		});
	}
}

function saveInstallationData() {
	const form = document.getElementById("form-installation");
	const data = {};

	// Собираем данные из текстовых инпутов
	const textInputs = form.querySelectorAll('input[type="text"]');
	textInputs.forEach((input, index) => {
		const row = input.closest("tr");
		const rowLabel = row
			?.querySelector(".row-header, .sub-row")
			?.textContent?.trim();
		const cellIndex = Array.from(row.querySelectorAll("td")).indexOf(
			input.closest("td")
		);

		if (rowLabel) {
			if (!data[rowLabel]) data[rowLabel] = {};
			data[rowLabel][`column${cellIndex}`] = input.value;
		}
	});

	// Собираем данные из чекбоксов
	const checkboxes = form.querySelectorAll('input[type="checkbox"]');
	checkboxes.forEach((checkbox, index) => {
		const row = checkbox.closest("tr");
		const rowLabel = row
			?.querySelector(".row-header, .sub-row")
			?.textContent?.trim();
		const cellIndex = Array.from(row.querySelectorAll("td")).indexOf(
			checkbox.closest("td")
		);

		if (rowLabel) {
			if (!data[rowLabel]) data[rowLabel] = {};
			data[rowLabel][`column${cellIndex}`] = checkbox.checked;
		}
	});

	if (saveToStorage("installation", data)) {
		alert("Installation data saved successfully!");
	} else {
		alert("Error saving installation data!");
	}
}

function loadInstallationData() {
	const data = loadFromStorage("installation");
	if (!data) return;

	const form = document.getElementById("form-installation");

	// Загружаем данные для текстовых инпутов
	const textInputs = form.querySelectorAll('input[type="text"]');
	textInputs.forEach((input) => {
		const row = input.closest("tr");
		const rowLabel = row
			?.querySelector(".row-header, .sub-row")
			?.textContent?.trim();
		const cellIndex = Array.from(row.querySelectorAll("td")).indexOf(
			input.closest("td")
		);

		if (
			rowLabel &&
			data[rowLabel] &&
			data[rowLabel][`column${cellIndex}`] !== undefined
		) {
			input.value = data[rowLabel][`column${cellIndex}`];
		}
	});

	// Загружаем данные для чекбоксов
	const checkboxes = form.querySelectorAll('input[type="checkbox"]');
	checkboxes.forEach((checkbox) => {
		const row = checkbox.closest("tr");
		const rowLabel = row
			?.querySelector(".row-header, .sub-row")
			?.textContent?.trim();
		const cellIndex = Array.from(row.querySelectorAll("td")).indexOf(
			checkbox.closest("td")
		);

		if (
			rowLabel &&
			data[rowLabel] &&
			data[rowLabel][`column${cellIndex}`] !== undefined
		) {
			checkbox.checked = data[rowLabel][`column${cellIndex}`];
		}
	});
}

// ============================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================

function enableFormEditing(form) {
	// Разблокировка полей для редактирования
	const inputs = form.querySelectorAll("input");
	inputs.forEach((input) => {
		input.removeAttribute("readonly");
		input.removeAttribute("disabled");
	});

	console.log("Form editing enabled");
}

// Функция для очистки всех данных из localStorage
export function clearAllFormsData() {
	localStorage.removeItem("generalParticulars");
	localStorage.removeItem("radarParticulars");
	localStorage.removeItem("blindSectors");
	localStorage.removeItem("installation");
	localStorage.removeItem("radarSectors_1");
	localStorage.removeItem("radarSectors_2");
	console.log("All forms data cleared from localStorage");
}

// Функция для инициализации всех форм
export function initAllForms() {
	// Ждем загрузки DOM
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => {
			initGeneralParticularsForm();
			initRadarParticularsForm();
			initBlindSectorsForm();
			initInstallationForm();
		});
	} else {
		initGeneralParticularsForm();
		initRadarParticularsForm();
		initBlindSectorsForm();
		initInstallationForm();
	}
}