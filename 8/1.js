const fs = require('fs');

const readInput = (file) => {
	const data = fs.readFileSync(file, 'utf8');
	const content = data.split('\n');
	return content.filter((x) => x.length>0);
}

let signal = readInput('data1.txt').map((x) => x.split('|')[1].trim().split(' '));

const count = signal.reduce((acc, x) => acc + 
					x.reduce((total,x) => total + ((x.length === 2 || x.length === 4 || x.length === 3 || x.length === 7) ? 1 : 0),0),0);

console.log(count);