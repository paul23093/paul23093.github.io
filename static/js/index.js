function getAge() {
	const currentDate = new Date();
	const birthDate = new Date('1993-09-23');
	const diffTime = Math.abs(currentDate - birthDate);
	const currentAge = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365)); 
	document.getElementById('birthday').getElementsByTagName('span')[0].innerHTML += ' (' + currentAge + ' y.o.)';
}

function getSkills() {
	// fetch("static/data/content.json").then((response) => {
	fetch("https://raw.githubusercontent.com/paul23093/profile/master/static/data/content.json").then((response) => {
		response.json().then((data) => {
			const skills = data['skills'];
			const ul = document.getElementsByClassName('skills-content')[0];
			for(i=0; i<skills.length; i++) {
				var li = document.createElement('li');
				li.setAttribute('class', 'skills-item');
				li.innerHTML = skills[i];
				ul.appendChild(li);
			}
		});
	});
}

function getData() {
	getAge();
	getSkills();
}