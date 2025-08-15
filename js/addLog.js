document.addEventListener("DOMContentLoaded", () => {
	// Generate ID for new entry
	const generateId = () => {
		return Date.now().toString(36) + Math.random().toString(36).substr(2);
	};

	console.log("Add new entry page loaded");

	// Get form element
	const form = document.getElementById("add-form");

	// Handle form submission
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		// Create new entry object
		const newEntry = {
			id: generateId(),
		};
		let isValid = true;

		// Collect data from all form fields
		form.querySelectorAll("input, select").forEach((field) => {
			const value = field.value.trim();
			newEntry[field.name] = value;

			// Check required fields
			if (field.hasAttribute("required") && !value) {
				isValid = false;
				field.style.border = "2px solid red";
				console.log(`Empty required field: ${field.name}`);
			} else {
				field.style.border = "";
			}
		});

		if (!isValid) {
			alert("Please fill all required fields!");
			return;
		}

		console.log("New entry data:", newEntry);

		// Get existing data from localStorage
		const existingData =
			JSON.parse(localStorage.getItem("operation_log")) || [];

		// Add new entry to the array
		existingData.push(newEntry);

		// Save back to localStorage
		localStorage.setItem("operation_log", JSON.stringify(existingData));

		alert("New entry successfully added!");
		window.location.href = "index.html"; // redirect to main page
	});

	// Handle Cancel button
	const cancelBtn = document.getElementById("cancel-btn");
	if (cancelBtn) {
		cancelBtn.addEventListener("click", () => {
			if (confirm("Are you sure? All data will be lost")) {
				window.location.href = "index.html";
			}
		});
	}

	// Set current datetime as default value
	const datetimeInput = document.getElementById("datetime");
	if (datetimeInput) {
		const now = new Date();
		// Format datetime for datetime-local input (YYYY-MM-DDTHH:MM)
		const formattedDateTime =
			now.getFullYear() +
			"-" +
			String(now.getMonth() + 1).padStart(2, "0") +
			"-" +
			String(now.getDate()).padStart(2, "0") +
			"T" +
			String(now.getHours()).padStart(2, "0") +
			":" +
			String(now.getMinutes()).padStart(2, "0");

		datetimeInput.value = formattedDateTime;
		console.log("Default datetime set:", formattedDateTime);
	}
});
