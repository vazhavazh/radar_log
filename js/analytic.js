



// export const analytic = () => {
// 	const ctx = document.getElementById("myAnalytic");

// 	let chartInstance; // ссылка на текущий график

// 	const applyButton = document.querySelector("#analytics button");
// 	const xSelect = document.getElementById("x-axis");
// 	const ySelect = document.getElementById("y-axis");

// 	// Функция для получения цветов из CSS переменных
// 	const getThemeColors = () => {
// 		const root = document.documentElement;
// 		const computedStyle = getComputedStyle(root);

// 		return {
// 			mainColor: computedStyle.getPropertyValue("--main-color").trim(),
// 			greenAcid: computedStyle.getPropertyValue("--green-acid").trim(),
// 			bgColor: computedStyle.getPropertyValue("--bg-color").trim(),
// 			border: computedStyle.getPropertyValue("--border").trim(),
// 			disabledColor: computedStyle.getPropertyValue("--disabled-color").trim(),
// 		};
// 	};

// 	// Функция для форматирования даты в человекочитаемый формат
// 	const formatDateTime = (isoString) => {
// 		if (!isoString) return isoString;

// 		try {
// 			const date = new Date(isoString);
// 			// Проверяем, является ли это валидной датой
// 			if (isNaN(date.getTime())) return isoString;

// 			// Форматируем в человекочитаемый вид
// 			return date.toLocaleDateString("ru-RU", {
// 				day: "2-digit",
// 				month: "2-digit",
// 				year: "numeric",
// 				hour: "2-digit",
// 				minute: "2-digit",
// 			});
// 		} catch (err) {
// 			return isoString;
// 		}
// 	};

// 	// Функция для определения, является ли поле датой
// 	const isDateTimeField = (fieldName) => {
// 		return (
// 			fieldName === "datetime" ||
// 			fieldName.toLowerCase().includes("date") ||
// 			fieldName.toLowerCase().includes("time")
// 		);
// 	};

// 	// Функция для обновления цветов графика при смене темы
// 	const updateChartTheme = () => {
// 		if (chartInstance) {
// 			const themeColors = getThemeColors();

// 			// Обновляем цвета датасета
// 			chartInstance.data.datasets[0].borderColor = themeColors.greenAcid;
// 			chartInstance.data.datasets[0].backgroundColor = `${themeColors.greenAcid}33`;

// 			// Обновляем цвета опций
// 			chartInstance.options.plugins.legend.labels.color = themeColors.mainColor;
// 			chartInstance.options.plugins.title.color = themeColors.mainColor;
// 			chartInstance.options.scales.x.title.color = themeColors.mainColor;
// 			chartInstance.options.scales.x.ticks.color =
// 				themeColors.disabledColor || themeColors.mainColor;
// 			chartInstance.options.scales.x.grid.color = `${themeColors.border}66`;
// 			chartInstance.options.scales.y.title.color = themeColors.mainColor;
// 			chartInstance.options.scales.y.ticks.color =
// 				themeColors.disabledColor || themeColors.mainColor;
// 			chartInstance.options.scales.y.grid.color = `${themeColors.border}66`;
// 			chartInstance.options.elements.point.backgroundColor =
// 				themeColors.greenAcid;
// 			chartInstance.options.elements.point.borderColor = themeColors.greenAcid;

// 			// Перерисовываем график
// 			chartInstance.update();
// 		}
// 	};

// 	// Основной обработчик кнопки
// 	applyButton.addEventListener("click", () => {
// 		const xKey = xSelect.value;
// 		const yKey = ySelect.value;

// 		const rawData = localStorage.getItem("operation_log");
// 		if (!rawData) {
// 			alert("Нет данных в localStorage по ключу operation_log");
// 			return;
// 		}

// 		let data;
// 		try {
// 			data = JSON.parse(rawData);
// 		} catch (err) {
// 			alert("Ошибка при чтении operation_log");
// 			console.error(err);
// 			return;
// 		}

// 		// Подготовка данных
// 		const labels = data.map((entry) => {
// 			const value = entry[xKey];
// 			// Форматируем дату если это поле даты/времени
// 			return isDateTimeField(xKey) ? formatDateTime(value) : value;
// 		});

// 		const values = data.map((entry) => {
// 			const val = entry[yKey];
// 			return isNaN(val) ? undefined : Number(val);
// 		});

// 		// Удаляем предыдущий график, если он есть
// 		if (chartInstance) {
// 			chartInstance.destroy();
// 		}

// 		// Получаем цвета темы
// 		const themeColors = getThemeColors();

// 		chartInstance = new Chart(ctx, {
// 			type: "line",
// 			data: {
// 				labels,
// 				datasets: [
// 					{
// 						label: `${yKey} vs ${xKey}`,
// 						data: values,
// 						borderColor: themeColors.greenAcid,
// 						backgroundColor: `rgba(229, 255, 0, 0.698)`, // добавляем прозрачность
// 						fill: true,
// 						tension: 0.4,
// 					},
// 				],
// 			},
// 			options: {
// 				responsive: true,
// 				plugins: {
// 					legend: {
// 						position: "top",
// 						labels: {
// 							color: themeColors.mainColor, // Используем основной цвет текста
// 							font: {
// 								size: 14,
// 							},
// 						},
// 					},
// 					title: {
// 						display: true,
// 						text: `${yKey} vs ${xKey}`,
// 						color: themeColors.mainColor, // Используем основной цвет текста
// 						font: {
// 							size: 16,
// 							weight: "bold",
// 						},
// 					},
// 				},
// 				scales: {
// 					x: {
// 						title: {
// 							display: true,
// 							text: xKey,
// 							color: themeColors.mainColor, // Основной цвет текста
// 							font: {
// 								size: 14,
// 								weight: "bold",
// 							},
// 						},
// 						ticks: {
// 							color: themeColors.disabledColor || themeColors.mainColor, // Цвет меток
// 							font: {
// 								size: 12,
// 							},
// 							maxRotation: 45,
// 							minRotation: 0,
// 						},
// 						grid: {
// 							color: `${themeColors.border}66`, // Цвет сетки с прозрачностью
// 						},
// 					},
// 					y: {
// 						title: {
// 							display: true,
// 							text: yKey,
// 							color: themeColors.mainColor, // Основной цвет текста
// 							font: {
// 								size: 14,
// 								weight: "bold",
// 							},
// 						},
// 						ticks: {
// 							color: themeColors.disabledColor || themeColors.mainColor, // Цвет меток
// 							font: {
// 								size: 12,
// 							},
// 						},
// 						grid: {
// 							color: `${themeColors.border}66`, // Цвет сетки с прозрачностью
// 						},
// 						beginAtZero: true,
// 					},
// 				},
// 				// Общие настройки цвета для всего графика
// 				elements: {
// 					point: {
// 						backgroundColor: `rgba(229, 255, 0, 0.698)`,
// 						borderColor: themeColors.greenAcid,
// 					},
// 				},
// 			},
// 		});
// 	});

// 	// Слушаем изменения темы
// 	const observer = new MutationObserver((mutations) => {
// 		mutations.forEach((mutation) => {
// 			if (
// 				mutation.type === "attributes" &&
// 				mutation.attributeName === "data-theme"
// 			) {
// 				updateChartTheme();
// 			}
// 		});
// 	});

// 	// Начинаем наблюдение за изменениями атрибута data-theme
// 	observer.observe(document.documentElement, {
// 		attributes: true,
// 		attributeFilter: ["data-theme"],
// 	});
// };

export const analytic = () => {
	const ctx = document.getElementById("myAnalytic");

	let chartInstance; // ссылка на текущий график

	const applyButton = document.querySelector("#analytics button");
	const xSelect = document.getElementById("x-axis");
	const ySelect = document.getElementById("y-axis");

	// Функция для получения цветов из CSS переменных
	const getThemeColors = () => {
		const root = document.documentElement;
		const computedStyle = getComputedStyle(root);

		return {
			mainColor: computedStyle.getPropertyValue("--main-color").trim(),
			greenAcid: computedStyle.getPropertyValue("--green-acid").trim(),
			bgColor: computedStyle.getPropertyValue("--bg-color").trim(),
			border: computedStyle.getPropertyValue("--border").trim(),
			disabledColor: computedStyle.getPropertyValue("--disabled-color").trim(),
		};
	};

	// Функция для форматирования даты в человекочитаемый формат
	const formatDateTime = (isoString) => {
		if (!isoString) return isoString;

		try {
			const date = new Date(isoString);
			// Проверяем, является ли это валидной датой
			if (isNaN(date.getTime())) return isoString;

			// Форматируем в человекочитаемый вид
			return date.toLocaleDateString("ru-RU", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			});
		} catch (err) {
			return isoString;
		}
	};

	// Функция для определения, является ли поле датой
	const isDateTimeField = (fieldName) => {
		return (
			fieldName === "datetime" ||
			fieldName.toLowerCase().includes("date") ||
			fieldName.toLowerCase().includes("time")
		);
	};

	// Функция для сортировки данных по дате
	const sortDataByDate = (data, xKey) => {
		if (!isDateTimeField(xKey)) {
			return data; // Если это не поле даты, возвращаем данные как есть
		}

		return [...data].sort((a, b) => {
			const dateA = new Date(a[xKey]);
			const dateB = new Date(b[xKey]);

			// Если даты невалидные, оставляем их в исходном порядке
			if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
				return 0;
			}

			return dateA - dateB; // Сортировка от старой к новой дате
		});
	};

	// Функция для обновления цветов графика при смене темы
	const updateChartTheme = () => {
		if (chartInstance) {
			const themeColors = getThemeColors();

			// Обновляем цвета датасета
			chartInstance.data.datasets[0].borderColor = themeColors.greenAcid;
			chartInstance.data.datasets[0].backgroundColor = `${themeColors.greenAcid}33`;

			// Обновляем цвета опций
			chartInstance.options.plugins.legend.labels.color = themeColors.mainColor;
			chartInstance.options.plugins.title.color = themeColors.mainColor;
			chartInstance.options.scales.x.title.color = themeColors.mainColor;
			chartInstance.options.scales.x.ticks.color =
				themeColors.disabledColor || themeColors.mainColor;
			chartInstance.options.scales.x.grid.color = `${themeColors.border}66`;
			chartInstance.options.scales.y.title.color = themeColors.mainColor;
			chartInstance.options.scales.y.ticks.color =
				themeColors.disabledColor || themeColors.mainColor;
			chartInstance.options.scales.y.grid.color = `${themeColors.border}66`;
			chartInstance.options.elements.point.backgroundColor =
				themeColors.greenAcid;
			chartInstance.options.elements.point.borderColor = themeColors.greenAcid;

			// Перерисовываем график
			chartInstance.update();
		}
	};

	// Основной обработчик кнопки
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

		// Сортируем данные по дате если X-ось содержит даты
		const sortedData = sortDataByDate(data, xKey);

		// Подготовка данных
		const labels = sortedData.map((entry) => {
			const value = entry[xKey];
			// Форматируем дату если это поле даты/времени
			return isDateTimeField(xKey) ? formatDateTime(value) : value;
		});

		const values = sortedData.map((entry) => {
			const val = entry[yKey];
			return isNaN(val) ? undefined : Number(val);
		});

		// Удаляем предыдущий график, если он есть
		if (chartInstance) {
			chartInstance.destroy();
		}

		// Получаем цвета темы
		const themeColors = getThemeColors();

		chartInstance = new Chart(ctx, {
			type: "line",
			data: {
				labels,
				datasets: [
					{
						label: `${yKey} vs ${xKey}`,
						data: values,
						borderColor: themeColors.greenAcid,
						backgroundColor: `rgba(229, 255, 0, 0.698)`, // добавляем прозрачность
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
						labels: {
							color: themeColors.mainColor, // Используем основной цвет текста
							font: {
								size: 14,
							},
						},
					},
					title: {
						display: true,
						text: `${yKey} vs ${xKey}`,
						color: themeColors.mainColor, // Используем основной цвет текста
						font: {
							size: 16,
							weight: "bold",
						},
					},
				},
				scales: {
					x: {
						title: {
							display: true,
							text: xKey,
							color: themeColors.mainColor, // Основной цвет текста
							font: {
								size: 14,
								weight: "bold",
							},
						},
						ticks: {
							color: themeColors.disabledColor || themeColors.mainColor, // Цвет меток
							font: {
								size: 12,
							},
							maxRotation: 45,
							minRotation: 0,
						},
						grid: {
							color: `${themeColors.border}66`, // Цвет сетки с прозрачностью
						},
					},
					y: {
						title: {
							display: true,
							text: yKey,
							color: themeColors.mainColor, // Основной цвет текста
							font: {
								size: 14,
								weight: "bold",
							},
						},
						ticks: {
							color: themeColors.disabledColor || themeColors.mainColor, // Цвет меток
							font: {
								size: 12,
							},
						},
						grid: {
							color: `${themeColors.border}66`, // Цвет сетки с прозрачностью
						},
						beginAtZero: true,
					},
				},
				// Общие настройки цвета для всего графика
				elements: {
					point: {
						backgroundColor: `rgba(229, 255, 0, 0.698)`,
						borderColor: themeColors.greenAcid,
					},
				},
			},
		});
	});

	// Слушаем изменения темы
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (
				mutation.type === "attributes" &&
				mutation.attributeName === "data-theme"
			) {
				updateChartTheme();
			}
		});
	});

	// Начинаем наблюдение за изменениями атрибута data-theme
	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["data-theme"],
	});
};