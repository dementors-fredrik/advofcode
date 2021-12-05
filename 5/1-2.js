const fs = require('fs');

const readInput = (file) => {
	const data = fs.readFileSync(file, 'utf8');
	const content = data.split('\n');
	return content.filter((x) => x.length>0);
}

const START = 0, END = 1;
const X = 0, Y = 1;

const file = readInput('data1.txt').map((x) => x.split(' -> ')).map((x) => x.map((x) => x.split(',').map((x) => parseInt(x,10)) ));

const getOverlaps = (data) => {
	let FB = [];

	let FB_WIDTH = data.reduce((acc, x) => {
		const max = Math.max(x[START][X],x[END][X]);
		return acc < max ? max : acc; 
	}, 0) + 1;

	data.forEach((line,idx) => {
		const ys = line[START][Y];
		const ye = line[END][Y];
		const xs = line[START][X];
		const xe = line[END][X];

		const dx = xe-xs;
		const dy = ye-ys;

		let ll = 0; 
		if(Math.abs(dx)>=Math.abs(dy)) { 
			ll = Math.abs(dx);
		} else {
			ll = Math.abs(dy);
		}

		let x = xs;
		let y = ys;
		for(let l=0;l<=ll;l++) {
			const hit = FB[x+y*FB_WIDTH] ?? 0;
			FB[x+y*FB_WIDTH]=hit+1;
			x += dx/ll;
			y += dy/ll;
		}		
	});

	// Debug
	if(0) {
		for(let y = 0; y<FB_WIDTH; y++) {
			let line = '';
			for(let x = 0; x< FB_WIDTH;x++) {
				line += FB[x+y*FB_WIDTH] ?? '.';
			}
			console.log(line);
		}	
	}
	return FB.filter((x) => x && x > 1).length;
} 


const onlyHoriAndVertLines = file.filter((x) => (x[START][Y] === x[END][Y]) || x[START][X] === x[END][X]);

console.log(getOverlaps(onlyHoriAndVertLines));

console.log(getOverlaps(file));

