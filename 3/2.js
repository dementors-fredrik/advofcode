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
let arr = file.map((l) => parseInt(l,2));

const filterMatch = (array, bit) => {
	for(let i=11;i>0;i--) {
        	const counter = countBits(array,i);
        	let match = bit ? 0 : 1;
        	if(counter[1]>=counter[0]) {
                	match = bit ? 1 : 0;
        	}
        	array = array.filter((e) => {
                	const pred = (e>>i)&1;
                	return pred == match
        	});
       	 	if(array.length===1) break;
	}
	return array.pop();
}

const x = filterMatch(arr.slice(),true);
const y = filterMatch(arr.slice(),false);

console.log(x,y,x*y);


