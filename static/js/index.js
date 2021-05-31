function getAge() {
	const currentDate = new Date();
	const birthDate = new Date('1993-09-23');
	const diffTime = Math.abs(currentDate - birthDate);
	const currentAge = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365)); 
	document.getElementById('birthday').getElementsByTagName('span')[0].innerHTML += ' (' + currentAge + ' y.o.)';
}

function getData() {
	getAge();
}