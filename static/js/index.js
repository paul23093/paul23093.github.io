function getAge() {
	const currentDate = new Date();
	const birthDate = new Date('1993-09-23');
	const diffTime = Math.abs(currentDate - birthDate);
	const currentAge = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365)); 
	document.getElementById('birthday').getElementsByTagName('span')[0].innerHTML += ' (' + currentAge + ' y.o.)';
}

function getSkills() {
	// fetch("static/data/content.json").then((response) => {
	fetch("https://raw.githubusercontent.com/paul23093/profile/master/static/data/skills.json").then((response) => {
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

function getJobs() {
	// fetch("static/data/content.json").then((response) => {
	fetch("https://raw.githubusercontent.com/paul23093/profile/master/static/data/jobs.json").then((response) => {
		response.json().then((data) => {
			const jobs = data['jobs'];
			const experience = document.getElementsByClassName('experience')[0];
			
			for([i, job] of jobs.entries()) {
				var company_block = document.createElement('div');
				company_block.setAttribute('class', 'company-block');
				experience.appendChild(company_block);
				
				var company = document.createElement('div');
				company.setAttribute('class', 'company');
				company_block.appendChild(company);
				
				var company_icon_block = document.createElement('div');
				company_icon_block.setAttribute('class', 'company-icon-block', 'onclick', 'window.open("https://exness.com")');
				company.appendChild(company_icon_block);

				var company_icon = document.createElement('img');
				company_icon.setAttribute('class', 'company-icon', 'id', job['company_id'], 'src', job['company_logo']);
				company_icon_block.appendChild(company_icon);

				var overlay = document.createElement('div');
				overlay.setAttribute('class', 'overlay');
				company.appendChild(overlay);

				var icon_external = document.createElement('img');
				icon_external.setAttribute('class', 'icon', 'src', "static/icons/external.svg");
				overlay.appendChild(icon_external);
				
				var company_description = document.createElement('div');
				company_description.setAttribute('class', 'description');
				company.appendChild(company_description);
				
				var job_title = document.createElement('div');
				job_title.setAttribute('class', 'title');
				job_title.innerHTML = job['job_title'];
				company_description.appendChild(job_title);

				var company_info = document.createElement('div');
				company_info.setAttribute('class', 'company-info');
				company_info.innerHTML = job['company_name'] + ' - ' + job['company_desc'];
				company_description.appendChild(company_info);

				var tech = document.createElement('div');
				tech.setAttribute('class', 'category tech');
				company_description.appendChild(tech);

				var tech_content = document.createElement('div');
				tech_content.innerHTML = job['job_skills'].join(', ');
				company_description.appendChild(tech_content);

				var tasks = document.createElement('div');
				tasks.setAttribute('class', 'category tasks');
				company_description.appendChild(tasks);

				var achivements = document.createElement('ul');
				achivements.setAttribute('class', 'achivements');
				company_description.appendChild(achivements);

				for(achivement of job['job_achivements']) {
					var achive = document.createElement('li');
					achive.setAttribute('class', 'achive-element');
					achive.innerHTML = achivement;
					achivements.appendChild(achive);
				}

				if(i != jobs.length - 1) {
					var hr = document.createElement('hr');
					experience.appendChild(hr);
				}
			}
		});
	});
}

function getData() {
	getAge();
	getSkills();
	getJobs();
}