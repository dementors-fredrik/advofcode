const fs = require('fs');

const readInput = (file) => {
	const data = fs.readFileSync(file, 'utf8');
	const content = data.split('\n');
	return content.filter((x) => x.length>0);
}


const fahash = (x) => {
	let hash = 0;
	for(let i=0;i<x.length;i++) {
		hash |= 1<<(x.charCodeAt(i)-97);
	}
	return hash;
};

const entry = {
	2:1,
	4:4,
	3:7,
	7:8
};


const commonElements = (a,b) => { 
	let x = a;
	let y = b;
	if(a.length<b.length) {
		x = b;
		y = a;
	}
	return x.filter((x) => y.indexOf(x)>=0);
}

const difference = (a,b) => {
	let x = a;
	let y = b;
	if(a.length<b.length) {
		x=b;
		y=a;
	}
	return x.filter((x) => y.indexOf(x) < 0)
};

let signal = readInput('data1.txt');

let out = [];
signal.forEach((line) => {
	const sline = line.split('|').map((x) => x.trim().split(' '));

	const numberMap = {
		1: [],
		4: [],
		7: [],
		8: []
	};

	const buildBaseTable = (arr) => {
		const tmp = arr.slice(0);
		let reminder = [];
		for(;tmp.length;) {
			const digit = tmp.shift().split('').sort();
			// 1,4,7,8 
			switch(digit.length) {
				case 2: //1
				case 4: //4
				case 3: //7
				case 7: //8
					numberMap[entry[digit.length]] = digit;
					break;
				default:
					reminder.push(digit.join(''));
					break;
			}
		}	
		reminder = reminder.sort((a,b) => b.length - a.length);
		
		while(reminder.length) {
			const digit = reminder.shift().split('').sort();
			switch(digit.length) {
				case 5:
					if(!numberMap[5]) {
						if(commonElements(digit, numberMap[6]).length === digit.length) {
							numberMap[5] = digit;
						} else {
							reminder.push(digit.join(''))
						} 
					} else {
						if(commonElements(digit, numberMap[7]).length==2) {
							numberMap[2] = digit;
						} else {
							numberMap[3] = digit;
						}
					} 
					break;
				case 6:
					if(!numberMap[6]) {
	 					if(commonElements(digit, numberMap[7]).length === 2) {
							numberMap[6] = digit;
						} else {
							reminder.push(digit.join(''))
						} 
					} else if(numberMap[5]) {
						const diff = difference(digit, numberMap[8])[0];
						if(numberMap[5].indexOf(diff)>=0) {
							numberMap[0] = digit;
						}  else {
							numberMap[9] = digit;
						}
					} else {
						reminder.push(digit.join(''))
					}
					break;
				default: 
			}
		}
	}

	const decode = (lex, v) => {
		const table = {};

		buildBaseTable(lex);

		for(var e in numberMap) {
			table[fahash(numberMap[e].join(''))] = e;
		}
		let output = '';
		while(v.length) {
			const digit = v.shift();
			output += table[fahash(digit)];			
		}
		console.log('*', output);
		return parseInt(output,10);	
	}

	out.push(decode(sline[0].sort((a,b) => b.length - a.length),sline[1]));
})


console.log(out.reduce((acc, x) => acc+x, 0));


