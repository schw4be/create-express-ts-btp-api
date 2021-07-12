#! /usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const { prompt } = require('prompts');
const ncp = require('ncp').ncp;
const { writeFile, mkdir } = require('fs').promises;
//import { writeFile, mkdir } from 'fs/promises';


/*const options = [
	{
		description: 'Express Server Boilerplate without Auth',
		defaultName: 'express-server-boilerplate',
		templateName: 'express-server-boilerplate',
		dependencies: 'cookie-parser dotenv express express-async-errors helmet mongoose morgan snyk swagger-ui-express',
		devDependencies: '@types/express @types/cookie-parser @types/find @types/helmet @types/jsonfile @types/mongoose @types/morgan @types/node @types/swagger-ui-express @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint find fs-extra git-cz jsonfile nodemon ts-node tsconfig-paths typedoc typescript'
	}, {
		description: 'Express Server Boilerplate with Auth',
		defaultName: 'express-server-boilerplate-auth',
		templateName: 'express-server-boilerplate-auth',
		dependencies: 'bcryptjs cookie-parser dotenv express express-async-errors helmet mongoose morgan passport passport-jwt passport-local',
		devDependencies: '@types/express @types/cookie-parser @types/passport @types/bcryptjs @types/find @types/helmet @types/jsonfile @types/mongoose @types/morgan @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint find fs-extra git-cz jsonfile nodemon ts-node tsconfig-paths typescript @types/passport-jwt'
	}
];*/

const onCancel = () => {
	console.log('... maybe next time.... See you later 😞🪅🪃');
};



const copyProjectFiles = (config) => {
	const prjFolder = `./templates/${config.template}`;
	const source = path.join(__dirname, prjFolder);
    const destination = path.join(__dirname, config.destination);
	return new Promise((resolve, reject) => {
		ncp.limit = 16;
		ncp(source, destination, { stopOnErr: true }, (err) => {
			if (err) {
				reject(err);
			}
			resolve();
		});
	});
};

/**
 * obsolet! -> delete
 * @param {} config 
 * @returns 
 */
const updatePackageJson = async (config) => {
	try {
		const pathName = `${config.destination}/package.json`;
		let data = require(pathName);
        // Two options
        // 1) Replace all string occurences of the "template project name"
        const search = new RegExp(data.name, 'gm');
        data = JSON.stringify(data, null, 2).replace(search, config.projectName);
        // 2) We replace each object value on our own. This means, we have to know the template structure.. Not so flexible..
        //data.name = path.basename(config.projectName);
		//data = JSON.stringify(data, null, 2);
		await writeFile(pathName, data);
		return data.name;
	} catch (err) {
		throw err;
	}
}

/**
 * obsolet! -> delete
 */
const updateXsSecurityJson = async (config) => {
	try {
		const pathName = `${config.destination}/xs-security.json`;
		let data = require(pathName);
        // Two options
        // 1) Replace all string occurences of the "template project name"
        const search = new RegExp(config.template, 'gm');
        data = JSON.stringify(data, null, 2).replace(search, config.projectName);
        // 2) We replace each object value on our own. This means, we have to know the template structure.. Not so flexible..
        //data.name = path.basename(config.projectName);
		//data = JSON.stringify(data, null, 2);
		await writeFile(pathName, data);
	} catch (err) {
		throw err;
	}
}

const updateJson = async (config) => {
	try {
		const pathName = `${config.destination}/${config.file}.json`;
		let data = require(pathName);
        // Two options
        // 1) Replace all string occurences of the "template project name"
        const search = new RegExp(config.template, 'gm');
        data = JSON.stringify(data, null, 2).replace(search, config.projectName);
        // 2) We replace each object value on our own. This means, we have to know the template structure.. Not so flexible..
        //data.name = path.basename(config.projectName);
		//data = JSON.stringify(data, null, 2);
		await writeFile(pathName, data);
	} catch (err) {
		throw err;
	}
}



(async () => {

    const questions = [
		/*{
			type: 'select',
			name: 'option',
			message: 'Select a option for the type of project',
			validate: value => value >= 1 && value <=2 ? true : 'Specify number in the range of 1 - 2',
			suggest: (input, choices) => choices.filter(i => i.value),
			choices: options.map((el, index) => ({ value: index, title: el.templateName, description: el.description })),
			fallback: {
				title: 'Using default',
				value: 1
			}
		}, */
		{
			type: 'text',
			name: 'projectName',
			message: 'Specify a project name',
			validate: projectName => /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName) ? true : 'Invalid project name'
		}
		/*{
			type: 'text',
			name: 'path',
			message: '[OPTIONAL] Specify directory where you want to create the project, if no path is provided current directory will be used.',
			fallback: {
				title: 'Using default',
				value: './'
			}
		} */
	];

    //const answers = await prompt(questions, { onCancel });

    const answers = {
        projectName: 'testapp'
    }

    console.log('Good choice! 😉 Project ' + answers.projectName + ' will be created ... ⛷️');

    const config = {
        template: 'express-ts-btp-api',
        projectName: answers.projectName,
        destination: './test',
		file: ''
    };

	// Entire Structure
    await copyProjectFiles(config);

	// Main Folder
    //await updatePackageJson(config);
	//await updateXsSecurityJson(config);
	config.file = 'package'
	await updateJson(config);	
	config.file = 'xs-security'
	await updateJson(config);
    
	//await updateMtaYaml(config);

	// Router Folder
	config.destination = config.destination + '/router';
	config.file = 'package'
	await updateJson(config);
	config.file = 'xs-app'
	await updateJson(config);

	// Srv Folder
	//config.destination = config.destination + '/srv';
	// ToDo ....
	

    console.log('... and done! 😉 Project ' + answers.projectName + ' has been created successfully!');

})();