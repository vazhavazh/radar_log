export const radarBlindSectorDiagram1 = () => {
	const userSectors = [];
	const stage = new Konva.Stage({
		container: "blind-sector-diagram1",
		width: 400,
		height: 400,
	});

	const layer = new Konva.Layer();
	// Поворачиваем весь слой на -90 градусов, чтобы 0 градусов был сверху
	layer.rotation(-90);
	layer.x(stage.width() / 2); // Смещаем центр слоя обратно в центр сцены после вращения
	layer.y(stage.height() / 2); // Смещаем центр слоя обратно в центр сцены после вращения
	stage.add(layer);

	// Теперь все координаты для рисования будут относительно центра слоя (который уже повернут)
	const centerX = 0; // Центр теперь 0,0 относительно слоя
	const centerY = 0; // Центр теперь 0,0 относительно слоя
	const maxRadius = 150; // Максимальный радиус для радара

	// 1. Рисуем концентрические круги (разметка дальности)
	for (let i = 1; i <= 4; i++) {
		const radius = (maxRadius / 4) * i;
		layer.add(
			new Konva.Circle({
				x: centerX,
				y: centerY,
				radius: radius,
				stroke: "lightgray",
				strokeWidth: 1,
			})
		);
	}

	// 2. Рисуем радиальные линии (разметка углов)
	for (let i = 0; i < 360; i += 30) {
		const angleRad = (i * Math.PI) / 180;
		layer.add(
			new Konva.Line({
				points: [
					centerX,
					centerY,
					centerX + maxRadius * Math.cos(angleRad),
					centerY + maxRadius * Math.sin(angleRad),
				],
				stroke: "lightgray",
				strokeWidth: 1,
			})
		);

		// Добавляем текстовые метки для углов
		const textRadius = maxRadius + 15;
		const textNode = new Konva.Text({
			x: centerX + textRadius * Math.cos(angleRad),
			y: centerY + textRadius * Math.sin(angleRad),
			text: `${i}°`,
			fontSize: 12,
			fill: "black",
			rotation: 90, // Поворачиваем текст обратно
			listening: false, // Отключаем прослушивание событий, чтобы не мешал
		});

		// Корректируем положение текста для лучшего центрирования
		textNode.offsetX(textNode.width() / 2);
		textNode.offsetY(textNode.height() / 2);

		layer.add(textNode);
	}

	// Рисуем центральный круг (может быть "носом" судна/самолета)
	layer.add(
		new Konva.Circle({
			x: centerX,
			y: centerY,
			radius: 5,
			fill: "black",
		})
	);

	// ************************************************
	// ЭЛЕМЕНТЫ УПРАВЛЕНИЯ ДЛЯ ПЕРВОГО РАДАРА
	// ************************************************

	const startAngleInput1 = document.getElementById("startAngleInput1");
	const sectorWidthInput1 = document.getElementById("sectorWidthInput1");
	const addSectorButton1 = document.getElementById("addSectorButton1");
	const removeLastSectorButton1 = document.getElementById(
		"removeLastSectorButton1"
	);

	if (removeLastSectorButton1) {
		removeLastSectorButton1.addEventListener("click", () => {
			if (userSectors.length === 0) {
				alert("Нет секторов для удаления в Радаре 1.");
				return;
			}
			const lastSector = userSectors.pop(); // Удаляем из массива
			lastSector.destroy(); // Удаляем с канваса
			layer.draw(); // Перерисовываем
		});
	}

	if (addSectorButton1 && startAngleInput1 && sectorWidthInput1) {
		addSectorButton1.addEventListener("click", () => {
			const startAngle = parseFloat(startAngleInput1.value);
			const sectorWidth = parseFloat(sectorWidthInput1.value);

			if (isNaN(startAngle) || isNaN(sectorWidth)) {
				alert("Пожалуйста, введите корректные числа для угла и ширины.");
				return;
			}

			if (sectorWidth <= 0 || sectorWidth > 360) {
				alert("Ширина сектора должна быть больше 0 и не более 360 градусов.");
				return;
			}

			// Создаем новый сектор с заданными пользователем параметрами
			const newSector = new Konva.Wedge({
				x: centerX,
				y: centerY,
				radius: maxRadius,
				angle: sectorWidth, // Ширина сектора
				rotation: startAngle, // Начальный угол сектора
				fill: "rgba(255, 0, 0, 0.5)", // Красный цвет для первого радара
				stroke: "red",
				strokeWidth: 2,
			});

			layer.add(newSector);
			userSectors.push(newSector);
			layer.draw(); // Перерисовываем слой, чтобы показать новый сектор
		});
	} else {
		console.error(
			"Не найдены HTML-элементы для инпутов или кнопки первого радара."
		);
	}

	// Добавляем два сектора по умолчанию для первого радара
	layer.add(
		new Konva.Wedge({
			x: centerX,
			y: centerY,
			radius: maxRadius,
			angle: 15,
			rotation: 87,
			fill: "rgba(255, 0, 0, 0.5)",
			stroke: "red",
			strokeWidth: 2,
		})
	);

	layer.add(
		new Konva.Wedge({
			x: centerX,
			y: centerY,
			radius: maxRadius,
			angle: 18,
			rotation: 166,
			fill: "rgba(255, 0, 0, 0.5)",
			stroke: "red",
			strokeWidth: 2,
		})
	);

	layer.draw();
};

export const radarBlindSectorDiagram2 = () => {
	const userSectors = [];
	const stage = new Konva.Stage({
		container: "blind-sector-diagram2",
		width: 400,
		height: 400,
	});

	const layer = new Konva.Layer();
	// Поворачиваем весь слой на -90 градусов, чтобы 0 градусов был сверху
	layer.rotation(-90);
	layer.x(stage.width() / 2); // Смещаем центр слоя обратно в центр сцены после вращения
	layer.y(stage.height() / 2); // Смещаем центр слоя обратно в центр сцены после вращения
	stage.add(layer);

	// Теперь все координаты для рисования будут относительно центра слоя (который уже повернут)
	const centerX = 0; // Центр теперь 0,0 относительно слоя
	const centerY = 0; // Центр теперь 0,0 относительно слоя
	const maxRadius = 150; // Максимальный радиус для радара

	// 1. Рисуем концентрические круги (разметка дальности)
	for (let i = 1; i <= 4; i++) {
		const radius = (maxRadius / 4) * i;
		layer.add(
			new Konva.Circle({
				x: centerX,
				y: centerY,
				radius: radius,
				stroke: "lightgray",
				strokeWidth: 1,
			})
		);
	}

	// 2. Рисуем радиальные линии (разметка углов)
	for (let i = 0; i < 360; i += 30) {
		const angleRad = (i * Math.PI) / 180;
		layer.add(
			new Konva.Line({
				points: [
					centerX,
					centerY,
					centerX + maxRadius * Math.cos(angleRad),
					centerY + maxRadius * Math.sin(angleRad),
				],
				stroke: "lightgray",
				strokeWidth: 1,
			})
		);

		// Добавляем текстовые метки для углов
		const textRadius = maxRadius + 15;
		const textNode = new Konva.Text({
			x: centerX + textRadius * Math.cos(angleRad),
			y: centerY + textRadius * Math.sin(angleRad),
			text: `${i}°`,
			fontSize: 12,
			fill: "black",
			rotation: 90, // Поворачиваем текст обратно
			listening: false, // Отключаем прослушивание событий, чтобы не мешал
		});

		// Корректируем положение текста для лучшего центрирования
		textNode.offsetX(textNode.width() / 2);
		textNode.offsetY(textNode.height() / 2);

		layer.add(textNode);
	}

	// Рисуем центральный круг (может быть "носом" судна/самолета)
	layer.add(
		new Konva.Circle({
			x: centerX,
			y: centerY,
			radius: 5,
			fill: "black",
		})
	);

	// ************************************************
	// ЭЛЕМЕНТЫ УПРАВЛЕНИЯ ДЛЯ ВТОРОГО РАДАРА
	// ************************************************

	const startAngleInput2 = document.getElementById("startAngleInput2");
	const sectorWidthInput2 = document.getElementById("sectorWidthInput2");
	const addSectorButton2 = document.getElementById("addSectorButton2");
	const removeLastSectorButton2 = document.getElementById(
		"removeLastSectorButton2"
	);

	if (removeLastSectorButton2) {
		removeLastSectorButton2.addEventListener("click", () => {
			if (userSectors.length === 0) {
				alert("Нет секторов для удаления в Радаре 2.");
				return;
			}
			const lastSector = userSectors.pop(); // Удаляем из массива
			lastSector.destroy(); // Удаляем с канваса
			layer.draw(); // Перерисовываем
		});
	}

	if (addSectorButton2 && startAngleInput2 && sectorWidthInput2) {
		addSectorButton2.addEventListener("click", () => {
			const startAngle = parseFloat(startAngleInput2.value);
			const sectorWidth = parseFloat(sectorWidthInput2.value);

			if (isNaN(startAngle) || isNaN(sectorWidth)) {
				alert("Пожалуйста, введите корректные числа для угла и ширины.");
				return;
			}

			if (sectorWidth <= 0 || sectorWidth > 360) {
				alert("Ширина сектора должна быть больше 0 и не более 360 градусов.");
				return;
			}

			// Создаем новый сектор с заданными пользователем параметрами
			const newSector = new Konva.Wedge({
				x: centerX,
				y: centerY,
				radius: maxRadius,
				angle: sectorWidth, // Ширина сектора
				rotation: startAngle, // Начальный угол сектора
				fill: "rgba(0, 0, 255, 0.5)", // Синий цвет для второго радара
				stroke: "blue",
				strokeWidth: 2,
			});

			layer.add(newSector);
			userSectors.push(newSector);
			layer.draw(); // Перерисовываем слой, чтобы показать новый сектор
		});
	} else {
		console.error(
			"Не найдены HTML-элементы для инпутов или кнопки второго радара."
		);
	}

	// Для второго радара секторы по умолчанию закомментированы
	// layer.add(
	// 	new Konva.Wedge({
	// 		x: centerX,
	// 		y: centerY,
	// 		radius: maxRadius,
	// 		angle: 15,
	// 		rotation: 87,
	// 		fill: "rgba(0, 0, 255, 0.5)",
	// 		stroke: "blue",
	// 		strokeWidth: 2,
	// 	})
	// );

	layer.draw();
};
