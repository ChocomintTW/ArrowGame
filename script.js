function init(n) {
	const rowContainer = document.getElementById("row-container");
	rowContainer.innerHTML = "";

	for (let i = 0; i < n; i++) {
		const row = document.createElement("div");
		for (let j = 0; j < n; j++) {
			const button = document.createElement("button");
			button.id = i + "," + j;
			button.className = "grid-item";
			button.setAttribute("direction", 1);
			button.addEventListener("click", () => {
				turnNeighbor(n, button);
				updateArrow(n);
			});
			row.appendChild(button);
		}
		rowContainer.appendChild(row);
	}
	updateArrow(n);
}

function turnNeighbor(n, button) {
	const id = button.id;
	const parts = id.split(",");
	const x = parseInt(parts[0].trim());
	const y = parseInt(parts[1].trim());
	turn(button, 4);
	turnByPositionIfValid(n, x - 1, y - 1, 4);
	turnByPositionIfValid(n, x    , y - 1, 4);
	turnByPositionIfValid(n, x + 1, y - 1, 4);
	turnByPositionIfValid(n, x - 1, y    , 4);
	turnByPositionIfValid(n, x + 1, y    , 4);
	turnByPositionIfValid(n, x - 1, y + 1, 4);
	turnByPositionIfValid(n, x    , y + 1, 4);
	turnByPositionIfValid(n, x + 1, y + 1, 4);
}

function turn(btn, orientation) {
	const currentNumber = parseInt(btn.getAttribute("direction"));
	if (currentNumber == orientation) {
		btn.setAttribute("direction", 1);
	} else {
		btn.setAttribute("direction", currentNumber + 1);
	}
}

function turnByPositionIfValid(grid_n, x, y, orientation) {
	if (x >= 0 && x < grid_n && y >= 0 && y < grid_n) {
		console.log(x + "," + y);
		turn(document.getElementById(x + "," + y), orientation);
	}
}

function generate() {
	n = document.getElementById("size").value
	init(n);
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			for (let t = 0; t < Math.floor(Math.random() * 3); t++) {
   turnByPositionIfValid(n, i, j, 4);
				turnByPositionIfValid(n, i - 1, j - 1, 4);
	turnByPositionIfValid(n, i    , j - 1, 4);
	turnByPositionIfValid(n, i + 1, j - 1, 4);
	turnByPositionIfValid(n, i - 1, j    , 4);
	turnByPositionIfValid(n, i + 1, j    , 4);
	turnByPositionIfValid(n, i - 1, j + 1, 4);
	turnByPositionIfValid(n, i    , j + 1, 4);
	turnByPositionIfValid(n, i + 1, j + 1, 4);
			}
		}
	}
	updateArrow(n);
}

function updateArrow(n) {
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			const btn = document.getElementById(i + "," + j);
			btn.textContent = ["↑", "→", "↓",  "←"][btn.getAttribute("direction") - 1]
		}
	}
}
// ["⮝", "⮞", "⮟", "⮜"]