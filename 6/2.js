const fs = require('fs');

const readInput = (file) => {
	const data = fs.readFileSync(file, 'utf8');
	const content = data.split('\n');
	return content.filter((x) => x.length>0);
}

let fish = readInput('data1.txt').map((x) => x.split(','))[0];

const ctr = {};

const STATES=9;

for(let i=0;i<STATES;i++) {
	ctr[i] = 0;
}

fish.forEach((f) => ctr[f]++);

for(let day=0;day<256;day++) {
	const deadFish = ctr[0];
	for(let i=0;i<STATES;i++) {
		ctr[i] = ctr[i+1];
	}
	ctr[6] += deadFish;
	ctr[8] = deadFish;
}

const total = Object.keys(ctr).reduce((acc,x) => acc + ctr[x], 0);

console.log(total);
