createGrid = function(dimension) {
	var grid = new Array(dimension);

	for (var i = 0; i < dimension; i++) {
		grid[i] = new Array(dimension);
	}
	return grid;
}

randomSeedGrid = function(grid, dimension, fillPercent) {

	for (var i = 0; i < dimension; i++) {
		for (var j = 0; j < dimension; j++) {
			if (Math.random() > 1 - fillPercent) {
				grid[i][j] = 1;
			}
			else {
				grid[i][j] = 0;
			}
		}
	}

}

getNumNeighbors = function(grid, row, column) {
	if (row == 0) {
		if (column == 0) {
			return grid[row][column+1] + grid[row+1][column+1] + grid[row+1][column];
		}
		else if (column == grid[0].length - 1) {
			return grid[row][column-1] + grid[row+1][column-1] + grid[row+1][column];
		}
		else {
			return grid[row][column-1] + grid[row+1][column-1] + grid[row+1][column] +
				grid[row+1][column+1] + grid[row][column+1];
		}
	}

	else if (row == grid.length - 1) {
		if (column == 0) {
			return grid[row-1][column] + grid[row-1][column+1] + grid[row][column+1];
		}
		else if (column == grid[0].length - 1) {
			return grid[row-1][column] + grid[row-1][column-1] + grid[row][column-1];
		}
		else {
			return grid[row][column-1] + grid[row][column+1] + grid[row-1][column-1] +
				grid[row-1][column] + grid[row-1][column+1];
		}
	}
	else if (column == 0) {
		return grid[row][column+1] + grid[row+1][column] + grid[row-1][column] +
			grid[row+1][column+1] + grid[row-1][column+1];
	}
	else if (column == grid[0].length - 1) {
		return grid[row][column-1] + grid[row+1][column-1] + grid[row+1][column] +
			grid[row-1][column] + grid[row-1][column-1];
	}
	else { 
		return grid[row][column+1] + grid[row][column-1] + grid[row+1][column] +
			grid[row-1][column] + grid[row-1][column-1] + grid[row-1][column+1] +
			grid[row+1][column+1] + grid[row+1][column-1];
	}

}
map45rule = function(grid, dimension) {
	var result = createGrid(dimension);
	for (var i = 0; i < dimension; i++) {
		for (var j = 0; j < dimension; j++) {
			if (grid[i][j] == 1 && (getNumNeighbors(grid, i, j) >= 4 || 
						getNumNeighbors(grid, i, j) == 1)) {
				result[i][j] = 1;
			}
			else if (grid[i][j] == 0 && getNumNeighbors(grid, i, j) >= 5) {
				result[i][j] = 1;
			}
			else {
				result[i][j] = 0;
			}
		}
	}
	return result;

}

updateRectangles = function(ctx, dimension, width, height, grid) {
	
	var rectX = 0;
	var rectY = 0;
	var rectWidth = width/dimension;
	var rectHeight = height/dimension;
	for (var i = 0; i < dimension; i++) {
		for (var j = 0; j < dimension; j++) {
			if (grid[i][j] == 1) {
				ctx.fillStyle="#000000";
				ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
			}
			else {
				ctx.fillStyle="#FFFFFF";
				ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
			}
			rectX += rectWidth;
		}
		rectX = 0;
		rectY += rectHeight;
	}

}

colorGrid = function(ctx, dimension, width, height, grid) {
	var rectX = 0;
	var rectY = 0;
	var rectWidth = width/dimension;
	var rectHeight = height/dimension;
	
	for (var i = 0; i < dimension; i++) {
		for (var j = 0; j < dimension; j++) {
			if (grid[i][j] == 1 && getNumNeighbors(grid, i, j) == 8) {
				ctx.fillStyle="#2AC134";
				ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
			}
			else if (grid[i][j] == 1) {
				ctx.fillStyle="#DBC734";
				ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
			}
			else if (grid[i][j] == 0 && getNumNeighbors(grid, i, j) == 0) {
				ctx.fillStyle="#01A8EF";
				ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
			}
			else {
				ctx.fillStyle="#12D8E2";
				ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
			}
			rectX += rectWidth;

		}
		rectX = 0;
		rectY += rectHeight;
	}
}

window.onload = function() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	var width = c.width;
	var height = c.height;
	var dimension = 100;


	var grid = createGrid(dimension);
	randomSeedGrid(grid, dimension, 0.52);
	updateRectangles(ctx, dimension, width, height, grid);

	// apply the 45 rule to our map for 5 iterations
	for (var i = 0; i < 5; i++ ) {
			
		grid = map45rule(grid, dimension);
	
	}

	setTimeout(
			function() {
				updateRectangles(ctx, dimension, width, height, grid);
			},
			2000);

	setTimeout(
			function() {
				colorGrid(ctx, dimension, width, height, grid);
			},
			4000);

}

