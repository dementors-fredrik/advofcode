const fs = require('fs');

const readInput = (file) => {
	const data = fs.readFileSync(file, 'utf8');
	const content = data.split('\n');
	return content;
}

const file = readInput('data1.txt');

const nummers = file[0].split(',').map((x) => parseInt(x,10));

const raw = file.filter((x) => x.length>=1)
const boards = [];

for(var i=0;i<raw.length-1;i++) {
	const cB = parseInt(i/5,10);
	boards[cB] = boards[cB] || [];
	boards[cB].push(raw[i+1].split(' ').filter((x) => x.length).map((x) => parseInt(x,10)));	
}

const hasColumn = (b, c) => {
	for(var k=0;k<5;k++) {
		if(b[k][c]) return false;
	}
	return true;
} 

const hasRow = (r) => {
	for(var c=0;c<5;c++) {
		if(r[c]) return false;
	}
	return true;
}

const getBoardScore = (board) => board.map((r) => r.filter((x) => x>=0).reduce((a,x) => a+x, 0)).reduce((a,x) => a+x,0 );

let winningBoards = [];

while(nummers.length) {
	const num = nummers.shift();
	for(var idx=0;idx<boards.length;idx++) {
		const board = boards[idx];
		if(!board) continue;
		for(var j=0;j<5;j++) {
			const hit = board[j].indexOf(num);
			if(hit>=0) {
				board[j][hit]=null;
				if(hasRow(board[j]) || hasColumn(board, hit)) {
					winningBoards.push(getBoardScore(board)*num);
					boards[idx] = null;
				} 
			}
		}
	}
}

console.log('1:', winningBoards.shift());
console.log('2:', winningBoards.pop());


