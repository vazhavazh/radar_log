// export const analytic = () => {
// 	const ctx = document.getElementById("myAnalytic");

// 	new Chart(ctx, {
// 		type: "line", 
// 		data: {
// 			labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
// 			datasets: [
// 				{
// 					label: "# of Votes",
// 					data: [12, 19, 3, 5, 2, 3],
// 					borderColor: "rgba(75, 192, 192, 1)",
// 					backgroundColor: "rgba(75, 192, 192, 0.2)",
// 					fill: true,
// 					tension: 0.4, // сглаживание линий (опционально)
// 				},
// 			],
// 		},
// 		options: {
// 			responsive: true,
// 			plugins: {
// 				legend: {
// 					position: "top",
// 				},
// 				title: {
// 					display: true,
// 					text: "Chart.js Line Chart",
// 				},
// 			},
// 			scales: {
// 				x: {
// 					title: {
// 						display: true,
// 						text: "Colours", // подпись оси X
// 					},
// 				},
//                 y: {
//                     title: {
//                         display: true,
//                         text: "Values"
//                     },
// 					beginAtZero: true,
// 				},
// 			},
// 		},
// 	});
// };
export const analytic = () => {
	const ctx = document.getElementById("myAnalytic");

	let chartInstance; // ссылка на текущий график

	const applyButton = document.querySelector("#analytics button");
	const xSelect = document.getElementById("x-axis");
	const ySelect = document.getElementById("y-axis");

	applyButton.addEventListener("click", () => {
		const xKey = xSelect.value;
		const yKey = ySelect.value;

		const rawData = localStorage.getItem("operation_log");
		if (!rawData) {
			alert("Нет данных в localStorage по ключу operation_log");
			return;
		}

		let data;
		try {
			data = JSON.parse(rawData);
		} catch (err) {
			alert("Ошибка при чтении operation_log");
			console.error(err);
			return;
		}

		// Подготовка данных
		const labels = data.map((entry) => entry[xKey]);
		const values = data.map((entry) => {
			const val = entry[yKey];
			return isNaN(val) ? undefined : Number(val);
		});

		// Удаляем предыдущий график, если он есть
		if (chartInstance) {
			chartInstance.destroy();
		}

		chartInstance = new Chart(ctx, {
			type: "line",
			data: {
				labels,
				datasets: [
					{
						label: `${yKey} vs ${xKey}`,
						data: values,
						borderColor: "rgba(75, 192, 192, 1)",
						backgroundColor: "rgba(75, 192, 192, 0.2)",
						fill: true,
						tension: 0.4,
					},
				],
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: "top",
					},
					title: {
						display: true,
						text: `${yKey} vs ${xKey}`,
					},
				},
				scales: {
					x: {
						title: {
							display: true,
							text: xKey,
						},
					},
					y: {
						title: {
							display: true,
							text: yKey,
						},
						beginAtZero: true,
					},
				},
			},
		});
	});
};
