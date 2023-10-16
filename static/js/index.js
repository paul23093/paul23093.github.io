function getAge() {
	const currentDate = new Date();
	const birthDate = new Date('1993-09-23');
	const diffTime = Math.abs(currentDate - birthDate);
	const currentAge = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365)); 
	document.getElementById('birthday').getElementsByTagName('span')[1].innerHTML += currentAge + ' y.o.';
}

function getSkills() {
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

function copyToClipboard(el) {
	let copyText = el.previousElementSibling.textContent;
	navigator.clipboard.writeText(copyText);
	el.style.transitionDuration = "0s";
	el.textContent = "done";
	setTimeout(() => {
		el.style.transitionDuration = "0.3s";
		el.style.opacity = "0";
		setTimeout(() => {
			el.textContent = "content_copy";
			el.style.opacity = "1";
		}, 300);
	}, 3000);
}

function getPeriod(begin_date, end_date) {
	var diffTime = Math.abs(end_date - begin_date);
	var years = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
	var months =  Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30) - years * 12) + 1;
	return (years > 0 ? years + " y " : "") + months + " m";
}

function getJobs() {
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
				company_icon_block.setAttribute('class', 'company-icon-block');
				company_icon_block.setAttribute('onclick', 'window.open("' + job['company_link'] + '")');
				company.appendChild(company_icon_block);

				var company_icon = document.createElement('img');
				company_icon.setAttribute('class', 'company-icon');
				company_icon.setAttribute('id', job['company_id']);
				company_icon.setAttribute('src', job['company_logo']);
				company_icon_block.appendChild(company_icon);

				var overlay = document.createElement('div');
				overlay.setAttribute('class', 'overlay');
				company_icon_block.appendChild(overlay);

				var icon_external = document.createElement('img');
				icon_external.setAttribute('class', 'icon');
				icon_external.setAttribute('src', "static/icons/external.svg");
				overlay.appendChild(icon_external);
				
				var company_description = document.createElement('div');
				company_description.setAttribute('class', 'description');
				company.appendChild(company_description);
				
				var job_title = document.createElement('div');
				job_title.setAttribute('class', 'title');
				job_title.innerHTML = job['job_title'];
				company_description.appendChild(job_title);

				beginDate = new Date(job['job_begin_date']);
				beginDateYear = beginDate.getFullYear();
				beginDateMonth = beginDate.getMonth() + 1;
				beginDateFormatted = beginDateYear + "-" + (beginDateMonth < 10 ? "0" + beginDateMonth : beginDateMonth);
				endDate = job['job_end_date'] != "" ? new Date(job['job_end_date']) : new Date();
				endDateYear = endDate.getFullYear();
				endDateMonth = endDate.getMonth() + 1;
				endDateFormatted = endDate != Date() ? endDateYear + "-" + (endDateMonth < 10 ? "0" + endDateMonth : endDateMonth) : "...";

				var job_dates_block = document.createElement('div');
				job_dates_block.setAttribute('class', 'job-dates-block');
				company_description.appendChild(job_dates_block);

				var job_dates = document.createElement('div');
				job_dates.setAttribute('class', 'job-dates');
				job_dates.innerHTML = beginDateFormatted + ' - ' + endDateFormatted;
				job_dates_block.appendChild(job_dates);
				
				var job_period = document.createElement('div');
				job_period.setAttribute('class', 'job-period');
				job_period.innerHTML = getPeriod(beginDate, endDate);
				job_dates_block.appendChild(job_period);

				var company_info = document.createElement('div');
				company_info.setAttribute('class', 'company-info');
				company_info.innerHTML = job['company_name'] + ' - ' + job['company_desc'];
				company_description.appendChild(company_info);

				var location = document.createElement('div');
				location.setAttribute('class', 'location');
				location.innerHTML = job['city'] + ', ' + job['country'];
				company_info.appendChild(location);

				var tech = document.createElement('div');
				tech.setAttribute('class', 'category tech');
				company_description.appendChild(tech);

				var tech_content = document.createElement('div');
				tech_content.innerHTML = job['job_skills'].join(', ');
				company_description.appendChild(tech_content);

				var tasks = document.createElement('div');
				tasks.setAttribute('class', 'category tasks');
				company_description.appendChild(tasks);

				var achievements = document.createElement('ul');
				achievements.setAttribute('class', 'achievements');
				company_description.appendChild(achievements);

				for(achievement of job['job_achievements']) {
					var achieve = document.createElement('li');
					achieve.setAttribute('class', 'achieve-element');
					achieve.innerHTML = achievement;
					achievements.appendChild(achieve);
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
	window.dispatchEvent(new Event('resize'));
	getAge();
	getSkills();
	getJobs();
}

window.addEventListener('resize', () => {
	skills = document.getElementsByClassName('skills')[0];
	skillsContent = document.getElementsByClassName('skills-content')[0]
	if((document.documentElement.clientWidth < 900) || (document.documentElement.clientWidth/document.documentElement.clientHeight < 1)){
		skills.style.display = "table";
		skills.style.textAlign = "center";
		skillsContent.style.width = "70vw";
	} else {
		skills.style.display = "table-cell";
		skills.style.textAlign = "left";
		skillsContent.style.width = "30vw";
	}
});
