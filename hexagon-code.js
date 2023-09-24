function init(n, orientations) {
	const colContainer = document.getElementById("col-container");
	colContainer.innerHTML = "";
	
	const w = document.getElementsByClassName("container").item(0).clientWidth - 20;

	for (let i = 0; i < n * 2 - 1; i++) {
		const col = document.createElement("div");
		col.className = "col";
		
		for (let j = ((i <= (n - 1)) ? 0 : (i - (n - 1))); j < ((i >= (n - 1)) ? (n * 2 - 1) : (i + Number(n))); j++) {
			const button = document.createElement("button");
			button.id = i + "," + j;
			button.innerText = "↑";

			button.style.width = w / (n * 2 - 1) + "px";
			button.style.height = w / (n * 2 - 1) + "px";
			button.style.borderRadius = w / (n * 4 - 2) + "px";
			button.style.fontSize = w / (2.5 * (n * 2 - 1)) + "px";
			button.style.rotate = "0deg";

			button.addEventListener("click", () => {
				turnNeighbor(n, button, orientations);
			});

			col.appendChild(button);
		}
		
		colContainer.appendChild(col);
	}
}

function turnNeighbor(n, button, orientations) {
	const id = button.id;
	const parts = id.split(",");
	const x = parseInt(parts[0].trim());
	const y = parseInt(parts[1].trim());
	turnNeighborByPosition(n, x, y, orientations);
}

function turnNeighborByPosition(n, x, y, orientations) {
	turnByPositionIfValid(n, x    , y    , orientations);
	turnByPositionIfValid(n, x    , y - 1, orientations);
	turnByPositionIfValid(n, x    , y + 1, orientations);
	turnByPositionIfValid(n, x - 1, y    , orientations);
	turnByPositionIfValid(n, x - 1, y - 1, orientations);
	turnByPositionIfValid(n, x + 1, y    , orientations);
	turnByPositionIfValid(n, x + 1, y + 1, orientations);
}

function turn(btn, orientations) {
	var deg = parseInt(btn.style.rotate.replace("deg", ""));
	btn.style.rotate = (deg + 360 / orientations) + "deg";
}

function turnByPositionIfValid(hex_n, x, y, orientations) {
	if (x >= 0 && x < 2 * n - 1 && y >= 0
		&& y >= ((x <= (n - 1)) ? 0 : (x - (n - 1)))
		&& y < ((x >= (n - 1)) ? (n * 2 - 1) : (x + Number(n)))) {
		turn(document.getElementById(x + "," + y), orientations);
	}
}

function generate() {
	n = document.getElementById("size").value
	orientations = document.getElementById("orientation").value
	init(n, orientations);

	for (let i = 0; i < n * 2 - 1; i++) {
		for (let j = ((i <= (n - 1)) ? 0 : (i - (n - 1))); j < ((i >= (n - 1)) ? (n * 2 - 1) : (i + Number(n))); j++) {
			for (let t = 0; t < Math.floor(Math.random() * orientations); t++) {
				turnNeighborByPosition(n, i, j, orientations);
			}
		}
	}
}