import { formSubmit } from "./formSubmit.js";
import { switchTabs } from "./switchTabs.js";
import { radarBlindSectorDiagram1 } from "./radarBlindSector.js";
import { radarBlindSectorDiagram2 } from "./radarBlindSector.js";
import { initAllForms, clearAllFormsData } from "./particularsFormHandler.js";

document.addEventListener("DOMContentLoaded", () => {
	// Инициализируем формы (создает глобальные функции)
	initAllForms();

	// Создаем диаграммы после инициализации форм
	radarBlindSectorDiagram1();
	radarBlindSectorDiagram2();

	formSubmit();
	switchTabs();
});

// clearAllFormsData(); // 
