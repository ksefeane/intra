const read = process.stdin;
read.setEncoding('utf-8');

console.log("please enter WTC records path... e.g. \"./username.json\"\n");

read.on('data', async (input) => {
	if (input === 'exit\n') {
		process.exit();
	} else {
		await reader(input.replace(/\n/g, ''))
		.then(r => console.log("\n\x1b[0m", r))
		.catch(e => console.log(e));
	}
})
 
async function reader(file) {
	const fs = require('fs')
	return new Promise((yes, no) => {
		fs.readFile(file, (err, data) => { 
			if (err) {
				no(`please enter valid filename`); 	
			} else {
				var r = JSON.parse(data);
				var c = r.cursus_users;
				var p = r.projects_users;
				console.log("\n\x1b[4m",r.login, '\x1b[0m');
				console.log()
				for (let i in c) {
					var skills = c[i].skills
					console.log("\x1b[36m", c[i].cursus.name, '\x1b[0m');
					console.log(`skills: `)
					for (let j in skills) {
						var l = skills[j].level.toString()
						console.log("\x1b[34m", skills[j].name, "\x1b[32m", l)
					}
					console.log(`level: ${c[i].level}\n`)
				}
				console.log('projects: ')
				for (let i in p) {
					if (p[i].marked === true && p[i].final_mark > 0) {
						var e = '🔴';
						if (p[i].final_mark > 75)
					  		e = '🟢';
						var m = p[i].final_mark.toString()
						console.log("\x1b[34m", p[i].project.name, "\x1b[32m", m, e, "\x1b[0m");
					}
				}
				yes('to exit press CTRL C or enter \'exit\'');
			}
		})
	});
}
