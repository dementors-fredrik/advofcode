const fs = require('fs');

const readInput = (file) => {
	const data = fs.readFileSync(file, 'utf8');
	const content = data.split('\n');
	return content.filter((x) => x.length>0);
}

let crabs = readInput('data1.txt').map((x) => x.split(',').map((x) => parseInt(x,10)))[0];

const arrayMax = (array) => array.reduce(function(a, b) {
    	return Math.max(a, b);
	}, 0);

const arrayMin = (array) => array.reduce(function(a, b) {
    	return Math.min(a, b);
	}, 0);

const uniquePos = crabs.reduce((acc, x) => { acc[x] = (acc[x]||0)+1; return acc; }, {});
const targetList = Object.keys(uniquePos).map((x) => parseInt(x,10)).sort((a,b) => uniquePos[b] - uniquePos[a]);

let min = { pos: 0, cost: Number.MAX_SAFE_INTEGER};

for(let target=arrayMin(targetList);target<arrayMax(targetList);target++) {
	let sum = 0;
	for(let i=0;i<crabs.length;i++) {
		const delta = Math.abs(crabs[i] - target);
		const cost = (delta * (delta+1))/2;
		//console.log('Move from', crabs[i],' to ', target, ':', cost, ' fuel')
		sum += cost;
	}

	//console.log('Checking ', target , ' cost ', sum );
	if(sum < min.cost) {
		min.cost = sum;
		min.pos = target;
	}
}

console.log(min);
