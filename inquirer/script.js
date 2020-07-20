const inquirer = require('inquirer')

inquirer.prompt([
    {
        type: 'input',
        name: 'phone',
        message: "What's your phone number?",
        validate: value => {
            var pass = value.match(/^[0-9]*$/);
            return pass ? true :
            'Please enter a valid phone number';
        }
    }
    ]).then(answers => {
    console.log(JSON.stringify(answers))
}).catch(error => {
    if(error.isTtyError) {
      console.log(error)
    } else {
      // Something else when wrong
    }
  });