function getAge() {
	const currentDate = new Date();
	const birthDate = new Date('1993-09-23');
	const diffTime = Math.abs(currentDate - birthDate);
	const currentAge = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365)); 
	document.getElementById('birthday').getElementsByTagName('span')[0].innerHTML += ' (' + currentAge + ' y.o.)';
}

function getSkills() {
	const skills = fetch("static/data/skills.json").then(function(json) {
		console.log(json);
	});
	// const ul = document.getElementsByClassName('skills-content')[0];
	// console.log(skills);
	// for(i=0; i<len(skills['skills']); i++) {
	// 	var li = document.createElement('li');
	// 	li.setAttribute('class', 'skills-item');
	// 	li.innerHTML = skills['skills'][i];
	// 	ul.appendChild(li);
	// }
}

function getData() {
	getAge();
	getSkills();
}