import { formSubmit } from "./formSubmit.js";
import { switchTabs } from "./switchTabs.js";
import { radarBlindSectorDiagram1 } from "./radarBlindSector.js";
import { radarBlindSectorDiagram2 } from "./radarBlindSector.js";
import { initAllForms } from "./particularsFormHandler.js";
import { analytic } from "./analytic.js";
import { themeToggler } from "./themeToggler.js";

themeToggler();

document.addEventListener("DOMContentLoaded", () => {
	initAllForms();

	radarBlindSectorDiagram1();
	radarBlindSectorDiagram2();

	formSubmit();
	switchTabs();
	analytic();
});
