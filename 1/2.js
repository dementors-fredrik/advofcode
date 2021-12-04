const fs = require('fs');

const readInput = (file) => {
	const data = fs.readFileSync(file, 'utf8');
	const content = data.split('\n');
	return content.filter((x) => x.length>0);
}

const file = readInput('data1.txt').map((x) => parseInt(x,10));

let current = file[0]+file[1]+file[2];
let inc = 0;
for(let i=0;i<file.length;i++) {
	const sum = file[i]+file[i+1]+file[i+2];
	if(sum>current) {
		inc++;
	} 
	current=sum;

}
console.log(inc);