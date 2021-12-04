const fs = require('fs');

const readInput = (file) => {
	const data = fs.readFileSync(file, 'utf8');
	const content = data.split('\n');
	content.pop();
	return content;
}

const countBits = (array, bp) => {
	const ctr = [0,0];
	array.forEach((n) => {
		ctr[(n>>bp)&1]++;
	});
	return ctr;
}
const file = readInput('data1.txt');
const arr = file.map((l) => parseInt(l,2));

let e = 0, g = 0;
for(let i=0;i<12;i++) {
	const counter = countBits(arr,i);
	const base = 1 << i;
	if(counter[1]>counter[0]) {
		e+=base;
	} else {
		g+=base;
	}
}
console.log(e*g);
