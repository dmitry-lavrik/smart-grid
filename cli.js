const inquirer = require('inquirer');
const baseConfig = require('./system/defaults/settings');

module.exports = async function smartGridCli() {
  	const answers = await inquirer.prompt([
		{
			type: 'confirm',
			name: 'mobileFirst',
			message: 'Use mobileFirst by default? If not, it will be desktopFirst.',
		},
		{
			type: 'input',
			name: 'filename',
			message: 'Output file name? (without extension)'
		}
	]);

	return {
		...baseConfig,
		...answers
	}
};
