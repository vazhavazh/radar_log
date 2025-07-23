export const formSubmit = () => {
	const form = document.getElementById("log-form");
	const tbody = document.getElementById("log-entries");

	form.addEventListener("submit", function (e) {
		e.preventDefault();
		const lastRowInputs = tbody.querySelectorAll("tr:last-child input");
		const newRow = document.createElement("tr");

		lastRowInputs.forEach((input) => {
			const td = document.createElement("td");
			td.textContent = input.value;
			newRow.appendChild(td);
			input.value = "";
		});

		tbody.appendChild(newRow);
	});
};
