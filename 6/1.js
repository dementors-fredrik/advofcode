const fs = require('fs');

const readInput = (file) => {
	const data = fs.readFileSync(file, 'utf8');
	const content = data.split('\n');
	return content.filter((x) => x.length>0);
}

let fish = readInput('data1.txt').map((x) => x.split(','))[0];


console.log(fish);

const action=[(self) => {

}]
for(let day=0;day<80;day++) {
	const fishes = fish.length;
	for(let i=0;i<fishes;i++) {
		switch(fish[i]) {
			case 0:
				fish.push(8);
				fish[i]=6;
				break;
			default:
				fish[i]--;
				break;

		}
	}	
//	console.log('Day ', day, fish.join(','));
}
console.log(fish.length);

