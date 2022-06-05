// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const generateMarkdown = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: "What's your GitHub username?",
        name: 'github',
        default: 'username',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Please insert a GitHub username.");
            }
            return true;
        }
    },
  
    {
        type: 'input',
        message: "What's the title of your project?",
        name: 'title',
        default: 'Title',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Please insert a title for your project.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Write a description of your project.",
        name: 'description',
        default: 'Project Description',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Please insert a description for your project.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Describe the steps required to install your project.",
        name: 'installation',
        default: 'Installation',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Please insert the installation description");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Provide instructions to use your project.",
        name: 'usage',
        default: 'Usage',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Please insert the usage for your project.");
            }
            return true;
        }
    },
    {
        type: 'list',
        message: "Choose a license for your project.",
        choices: ['Mozilla Public License 2.0', 'Apache License 2.0', 'GNU GPL v3'],
        name: 'license'
    },
    {
        type: 'input',
        name: 'credits',
        message: 'Credits to?',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Please insert the contributions for your project, or 'none' in case you dont have.");
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Introduce your email:',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Please insert a valid email.");
            }
            return true;
        }
    },
];




// TODO: Create a function to write README file
function writeReadme(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
          return console.log(err);
        }
      
        console.log("Your README.md file has been created")
    });
}
const readme = util.promisify(writeReadme);
// TODO: Create a function to initialize app
async function init() {
    try {
        console.log("Generating your README next...")
        const userResponses = await inquirer.prompt(questions);
        const markdown = generateMarkdown(userResponses);
        console.log(markdown);
    
        // Write markdown to file
        await readme('ExampleREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }

};

// Function call to initialize app
init();
