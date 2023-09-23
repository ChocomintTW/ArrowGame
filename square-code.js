function init(n, orientations) {
	const rowContainer = document.getElementById("row-container");
	rowContainer.innerHTML = "";
	const w = document.getElementsByClassName("container").item(0).clientWidth - 20;
	console.log(w);

	for (let i = 0; i < n; i++) {
		const row = document.createElement("div");
		for (let j = 0; j < n; j++) {
			const button = document.createElement("button");
			button.id = i + "," + j;

			button.style.width = w / n + "px";
			button.style.height = w / n + "px";
			button.style.borderRadius = w / (2 * n) + "px";
			button.style.fontSize = w / (2.5 * n) + "px";
			
			button.setAttribute("direction", 1);
			button.addEventListener("click", () => {
				turnNeighbor(n, button, orientations);
				updateArrow(n, orientations);
			});
			row.appendChild(button);
		}
		rowContainer.appendChild(row);
	}
	updateArrow(n, orientations);
}

function turnNeighbor(n, button, orientations) {
	const id = button.id;
	const parts = id.split(",");
	const x = parseInt(parts[0].trim());
	const y = parseInt(parts[1].trim());
	turnNeighborByPosition(n, x, y, orientations)
}

function turnNeighborByPosition(n, x, y, orientations) {
	turnByPositionIfValid(n, x - 1, y - 1, orientations);
	turnByPositionIfValid(n, x    , y - 1, orientations);
	turnByPositionIfValid(n, x + 1, y - 1, orientations);
	turnByPositionIfValid(n, x - 1, y    , orientations);
	turnByPositionIfValid(n, x    , y    , orientations);
	turnByPositionIfValid(n, x + 1, y    , orientations);
	turnByPositionIfValid(n, x - 1, y + 1, orientations);
	turnByPositionIfValid(n, x    , y + 1, orientations);
	turnByPositionIfValid(n, x + 1, y + 1, orientations);
}

function turn(btn, orientations) {
	const currentNumber = parseInt(btn.getAttribute("direction"));
	if (currentNumber == orientations) {
		btn.setAttribute("direction", 1);
	} else {
		btn.setAttribute("direction", currentNumber + 1);
	}
}

function turnByPositionIfValid(grid_n, x, y, orientations) {
	if (x >= 0 && x < grid_n && y >= 0 && y < grid_n) {
		turn(document.getElementById(x + "," + y), orientations);
	}
}

function generate() {
	n = document.getElementById("size").value
	orientations = document.getElementById("orientation").value
	init(n, orientations);
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			for (let t = 0; t < Math.floor(Math.random() * (orientations - 1)); t++) {
				turnNeighborByPosition(n, i, j, orientations);
			}
		}
	}
	updateArrow(n, orientations);
}

function updateArrow(n, orientations) {
	var orientations_symbols = [];
	if (orientations == 4) {
		orientations_symbols = ["↑", "→", "↓", "←"]
	} else if (orientations == 8) {
		orientations_symbols = ["↑", "↗", "→", "↘", "↓", "↙", "←", "↖"]
	}

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			const btn = document.getElementById(i + "," + j);
			btn.textContent = orientations_symbols[btn.getAttribute("direction") - 1]
		}
	}
}
// ["⮝", "⮞", "⮟", "⮜"]