/*Code for tic-tac-toe game*/

var board_value = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];

var HUMAN_VALUE = -1;
var COMP_VALUE = +1;

/*
     function evalute the state values
     it return +1 if the COMP_VALUE wins,or -1 if the HUMAN_VALUE wins,otherwise 0 draw
     */
function evalute_value(state) {
	var points = 0;

	if (game_end(state, COMP_VALUE)) {
		points = +1;
	}
	else if (game_end(state, HUMAN_VALUE)) {
		points = -1;
	} else {
		points = 0;
	}

	return points;
}

/* This function is used to  checks if a specific players wins or not */
function game_end(state, players) {
	var wining_state = [
		[state[0][0], state[0][1], state[0][2]],
		[state[1][0], state[1][1], state[1][2]],
		[state[2][0], state[2][1], state[2][2]],
		[state[0][0], state[1][0], state[2][0]],
		[state[0][1], state[1][1], state[2][1]],
		[state[0][2], state[1][2], state[2][2]],
		[state[0][0], state[1][1], state[2][2]],
		[state[2][0], state[1][1], state[0][2]],
	];

	for (var i = 0; i < 8; i++) {
		var line = wining_state[i];
		var filled = 0;
		for (var j = 0; j < 3; j++) {
			if (line[j] == players)
				filled++;
		}
		if (filled == 3)
			return true;
	}
	return false;
}

/* This function is used to check if the HUMAN_VALUE or COMP_VALUEuter wins or not */
function game_endAll(state) {
	return game_end(state, HUMAN_VALUE) || game_end(state, COMP_VALUE);
}

function emptybox(state) {
	var cell = [];
	for (var x = 0; x < 3; x++) {
		for (var y = 0; y < 3; y++) {
			if (state[x][y] == 0)
				cell.push([x, y]);
		}
	}

	return cell;
}

/* A move is correct if the selected cell is empty */
function correctMove(x, y) {
	var empty = emptybox(board_value);
	try {
		if (board_value[x][y] == 0) {
			return true;
		}
		else {
			return false;
		}
	} catch (e) {
		return false;
	}
}

/* Set the move value on board_value, may be that are valid */
function SetMove(x, y, players) {
	if (correctMove(x, y)) {
		board_value[x][y] = players;
		return true;
	}
	else {
		return false;
	}
}

/* Using the minimax algorithm */
function Minimax_Algorithm(state, depth, players) {
	var Top;

	if (players == COMP_VALUE) {
		Top = [-1, -1, -1000];
	}
	else {
		Top = [-1, -1, +1000];
	}

	if (depth == 0 || game_endAll(state)) {
		var points = evalute_value(state);
		return [-1, -1, points];
	}

	emptybox(state).forEach(function (cell) {
		var x = cell[0];
		var y = cell[1];
		state[x][y] = players;
		var points = Minimax_Algorithm(state, depth - 1, -players);
		state[x][y] = 0;
		points[0] = x;
		points[1] = y;

		if (players == COMP_VALUE) {
			if (points[2] > Top[2])
				Top = points;
		}
		else {
			if (points[2] < Top[2])
				Top = points;
		}
	});

	return Top;
}

/*  Minimax_Algorithm function called */
function AIplay() {
	var x, y;
	var move;
	var cell;

	if (emptybox(board_value).length == 9) {
		x = parseInt(Math.random() * 3);
		y = parseInt(Math.random() * 3);
	}
	else {
		move = Minimax_Algorithm(board_value, emptybox(board_value).length, COMP_VALUE);
		x = move[0];
		y = move[1];
	}

	if (SetMove(x, y, COMP_VALUE)) {
		cell = document.getElementById(String(x) + String(y));
		cell.innerHTML = "O";
	}
}

/* this is a main function */
function clickedCell(cell) {
	var button = document.getElementById("restart-btn");
	button.disabled = true;
	var conditionToContinue = game_endAll(board_value) == false && emptybox(board_value).length > 0;

	if (conditionToContinue == true) {
		var x = cell.id.split("")[0];
		var y = cell.id.split("")[1];
		var move = SetMove(x, y, HUMAN_VALUE);
		if (move == true) {
			cell.innerHTML = "X";
			if (conditionToContinue)
				AIplay();
		}
	}
	if (game_end(board_value, COMP_VALUE)) {
		var lines;
		var cell;
		var msg;

		if (board_value[0][0] == 1 && board_value[0][1] == 1 && board_value[0][2] == 1)
			lines = [[0, 0], [0, 1], [0, 2]];
		else if (board_value[1][0] == 1 && board_value[1][1] == 1 && board_value[1][2] == 1)
			lines = [[1, 0], [1, 1], [1, 2]];
		else if (board_value[2][0] == 1 && board_value[2][1] == 1 && board_value[2][2] == 1)
			lines = [[2, 0], [2, 1], [2, 2]];
		else if (board_value[0][0] == 1 && board_value[1][0] == 1 && board_value[2][0] == 1)
			lines = [[0, 0], [1, 0], [2, 0]];
		else if (board_value[0][1] == 1 && board_value[1][1] == 1 && board_value[2][1] == 1)
			lines = [[0, 1], [1, 1], [2, 1]];
		else if (board_value[0][2] == 1 && board_value[1][2] == 1 && board_value[2][2] == 1)
			lines = [[0, 2], [1, 2], [2, 2]];
		else if (board_value[0][0] == 1 && board_value[1][1] == 1 && board_value[2][2] == 1)
			lines = [[0, 0], [1, 1], [2, 2]];
		else if (board_value[2][0] == 1 && board_value[1][1] == 1 && board_value[0][2] == 1)
			lines = [[2, 0], [1, 1], [0, 2]];

		for (var i = 0; i < lines.length; i++) {
			cell = document.getElementById(String(lines[i][0]) + String(lines[i][1]));
			cell.style.color = "red";
		}

		msg = document.getElementById("message");
		msg.innerHTML = "You lose!";
	}
	if (emptybox(board_value).length == 0 && !game_endAll(board_value)) {
		var msg = document.getElementById("message");
		msg.innerHTML = "Draw!";
	}
	if (game_endAll(board_value) == true || emptybox(board_value).length == 0) {
		button.value = "Restart";
		button.disabled = false;
	}
}

/* Restart it*/
function restartButton(button) {
	if (button.value == "Start") {
		AIplay();
		button.disabled = true;
	}
	else if (button.value == "Restart") {
		var htmlboard_value;
		var msg;

		for (var x = 0; x < 3; x++) {
			for (var y = 0; y < 3; y++) {
				board_value[x][y] = 0;
				htmlboard_value = document.getElementById(String(x) + String(y));
				htmlboard_value.style.color = "#444";
				htmlboard_value.innerHTML = "";
			}
		}
		button.value = "Start";
		msg = document.getElementById("message");
		msg.innerHTML = "";
	}
}
