const fs = require('fs');

const readInput = (file) => {
	const data = fs.readFileSync(file, 'utf8');
	const content = data.split('\n');
	content.pop();
	return content;
}


const file = readInput('data1.txt');

let h = 0;
let v = 0;

for(let idx in file) {
	const line = file[idx];
	const [direction, vector] = line.split(' ');
	switch(direction) {
		case 'forward':
			h+=parseInt(vector,10);
			break;
		case 'down':
			v+=parseInt(vector,10);
			break;
		case 'up':
			v-=parseInt(vector,10);
			break;
		case 'down':
			h-=parseInt(vector,10);
			break;
		default:
			console.error('Unknown direction', direction);
			break;
	}
}

console.log('sum:',h*v);

