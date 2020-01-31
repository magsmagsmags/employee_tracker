const mysql = require("sql");
const inquirer = require("inquirer");
require("dotenv").config();

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",

    port: 3308,

    user: "root",

    password: process.env.DB_PASSWORD,
    database: "staff_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the startQuestions function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "startQ",
            type: "list",
            message: "Would you like to view, update, or add new information?",
            choices: ["View", "Update", "Add", "Exit"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid // update // or post functions
            if (answer.viewOrAdd === "View") {
                viewRootMenu();
            } else if (answer.startQ === "Update") {
                updateData();
            } else if (answer.startQ === "Add") {
                addData();
            } else if (answer.startQ === "Exit") {
                connection.end();
            }
        })
};

function viewRootMenu() {
    inquirer.prompt({
        name: "viewRoot",
        type: "list",
        message: "What data would you like to view?",
        choices: ["View All Data Types", "View Departments", "View Employee Roles", "View Employee Directory", "Back to Main Menu"]
    }).then(function (vrAnswer) {
        if (vrAnswer.viewRoot === "View All Data Types") {
            viewAllData();
        } else if (vrAnswer.viewRoot === "View Departments") {
            viewDepts();
        } else if (vrAnswer.viewRoot === "View Employee Roles") {
            viewRoles();
        } else if (vrAnswer.viewRoot === "View Employee Directory") {
            viewDir();
        } else {
            start();
        }
    })
}

start();

function viewAllData() {
    connection.query("SELECT ", function (err, res) {
        if (err) throw (err);
        console.log("\n");
        console.table(res);
        console.log("\n");
    });
    start();
}

function viewDepts() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw (err);
        console.log("\n");
        console.table(res);
        console.log("\n");
    });
    start();
}

function viewRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw (err);
        console.log("\n");
        console.table(res);
        console.log("\n");
    });
    start();
}

function viewDir() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw (err);
        console.log("\n");
        console.table(res);
        console.log("\n");
    });
    start();
}

function addData() {
    inquirer
        .prompt({
            name: "addRoot",
            type: "list",
            message: "Would you like to add a department, role, or new employee?",
            choices: ["Add a Department", "Add a Role", "Add an Employee", "Back to Main Menu"]
        }).then(function (aAnswer) {
            if (arAnswer.addRoot === "Add a Department") {
                addDept();
            } else if (arAnswer.addRoot === "Add a Role") {
                addRole();
            } else if (arAnswer.addRoot === "Add an Employee") {
                addDir();
            } else {
                start();
            }
        });
}


// // function queryAllItems() {
// //     console.log("...Selecting all items in table to READ...");
// //     connection.query("SELECT * FROM employees", function (err, res) {
// //         if (err) throw err;
// //         for (var i = 0; i < res.length; i++) {
// //             console.log(res[i].id + " | " + res[i].first_name + " | " + res[i].role_id + " | " + res[i].manager_id);
// //         }
// //         console.log("-----------------------------------");
// //     });
// // }