const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const newTeam = [];

//validates the input to not be empty
const ValInput = async (name) => {
    if (name === '') {
       return 'Incorrect answer';
    };
    return true;
 };
 //validates the input to be a valid email address
 function ValEmail(name) 
{if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(name))
  {
    return (true)
  }
    return("You have entered an invalid email address!")
}
 //Main function that ask question on team members
function teamMember() {

        inquirer.prompt([
            {
                type: "input",
                message: "Your manager's name?",
                name: "name",
                validate: ValInput
            },
            {
                type: "input",
                message: "Your manager's id?",
                name: "id",
                validate: ValInput 
            },
            {
                type: "input",
                message: "Your manager's email?",
                name: "email",
                validate: ValEmail
            },
            {
                type: "input",
                message: "Your manager's office number?",
                name: "officeNumber",
                validate: ValInput
            }
        ])

            .then(function (answers) {
                let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                newTeam.push(manager)
                addMember()
            })
            .catch(function(err) {
                console.log(err);
              });

        // Function will add member or end and generate team.html page.

        async function addMember() {
            try {

                let teamChoice = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'team',
                        message: 'Add Team Member or Generate Team',
                        choices: ['Engineer', 'Intern', 'Generate Team']
                    }
                ]);
        // Function will ask questions if previous question matches the role.
                if (teamChoice.team === 'Engineer') {

                    inquirer.prompt([
                        {
                            type: "input",
                            message: "Your engineer's name?",
                            name: "name",
                            validate: ValInput
                        },
                        {
                            type: "input",
                            message: "Your engineer's id?",
                            name: "id",
                            validate: ValInput
                        },
                        {
                            type: "input",
                            message: "Your engineer's email?",
                            name: "email",
                            validate: ValEmail
                        },
                        {
                            type: "input",
                            message: "Your engineer's GitHub username?",
                            name: "github",
                            validate: ValInput
                        }
                    ])

                        .then(function (answers) {
                            let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                            newTeam.push(engineer);
                            addMember();
                        })
                        .catch(function(err) {
                            console.log(err);
                          });

                } else if (teamChoice.team === 'Intern') {
                    inquirer.prompt([
                        {
                            type: "input",
                            message: "Your intern's name?",
                            name: "name",
                            validate: ValInput
                        },
                        {
                            type: "input",
                            message: "Your intern's id?",
                            name: "id",
                            validate: ValInput
                        },
                        {
                            type: "input",
                            message: "Your intern's email?",
                            name: "email",
                            validate: ValEmail 
                        },
                        {
                            type: "input",
                            message: "Your intern's school?",
                            name: "school",
                            validate: ValInput
                        }
                    ])
                        .then(function (answers) {
                            let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
                            newTeam.push(intern);
                            addMember();
                        })
                        .catch(function(err) {
                            console.log(err);
                          });

                } else {generateFile()}


            } catch (err) {
                console.log(err);
            }
        }
}

teamMember();

function generateFile() {
    fs.writeFileSync(outputPath, render(newTeam),"utf-8")
}