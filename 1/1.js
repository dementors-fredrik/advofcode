const fs = require('fs');

const readInput = (file) => {
	const data = fs.readFileSync(file, 'utf8');
	const content = data.split('\n');
	return content.filter((x) => x.length>0);
}

const file = readInput('data1.txt').map((x) => parseInt(x,10));

let current = file[0];
let inc = 0;
for(let i=0;i<file.length;i++) {
	if(file[i]>current) {
		inc++;
	} 
	current=file[i];

}
console.log(inc);