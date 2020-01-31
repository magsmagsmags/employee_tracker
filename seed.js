/////////////////////////////////////////////////////
// DEPENDENCIES
//////////////////////////////////////////////////////
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require('console.table');
require("dotenv").config();

/////////////////////////////////////////////////////
// CONNECTION INFO FOR THE SQL DATABASE
// Uses dotenv password dependency
//////////////////////////////////////////////////////
const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: process.env.DB_PASSWORD,
    database: "staff_db"
});


/////////////////////////////////////////////////////
// CONNECT TO THE MYSQL SERVER + SQL DATABASE
//////////////////////////////////////////////////////
connection.connect(function (err) {
    if (err) throw err;
    /////////////////////////////////////////////////////
    // run the startQuestions function after the connection is made to prompt the user
    //////////////////////////////////////////////////////
    start();
});


/////////////////////////////////////////////////////
// MAIN MENU PROMPT FUNCTION 
// View / Update / Add / Exit (restart start() function)
//////////////////////////////////////////////////////
function start() {
    inquirer
        .prompt({
            name: "startQ",
            type: "list",
            message: "Would you like to view, update, or add new information?",
            choices: ["View", "Update", "Add", "Exit"]
        })
        .then(function (answer) {
            /////////////////////////////////////////////////////
            // Based on answer to start() prompt name "startQ"
            // Route user to appropriate prompt function
            //////////////////////////////////////////////////////
            if (answer.startQ === "View") {
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

/////////////////////////////////////////////////////
// VIEW 'ROOT' MENU
// Uses viewRootMenu() prompt name "viewRoot" --
// Prompt user to either:
// View All Data / View Depts / View Roles / View Employees
//////////////////////////////////////////////////////
function viewRootMenu() {
    inquirer.prompt({
        name: "viewRoot",
        type: "list",
        message: "What data would you like to view?",
        choices: ["View All Data Types", "View Departments", "View Employee Roles", "View Employee Directory", "Back to Main Menu"]
    }).then(function (vrAnswer) {
        /////////////////////////////////////////////////////
        // Based on answer to viewRootMenu() prompt name "viewRoot"
        // Route user to appropriate view SELECT function
        //////////////////////////////////////////////////////
        if (vrAnswer.viewRoot === "View All Data Types") {
            console.log("viewRoot answer = View All Data");
            viewAllData();
        } else if (vrAnswer.viewRoot === "View Departments") {
            console.log("viewRoot answer = View Departments");
            viewDepts();
        } else if (vrAnswer.viewRoot === "View Employee Roles") {
            console.log("viewRoot answer = View Roles");
            viewRoles();
        } else if (vrAnswer.viewRoot === "View Employee Directory") {
            console.log("viewRoot answer = View Employees");
            viewDir();
        } else {
            start();
        }
    })
}

/////////////////////////////////////////////////////
// Called from viewRootMenu() function
// viewAllData() function displays data in: dept, role, emp
// by separately querying each table 
//////////////////////////////////////////////////////
function viewAllData() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw (err);
        console.log("\n");
        console.table(res);
        console.log("\n");
    });
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw (err);
        console.log("\n");
        console.table(res);
        console.log("\n");
    });
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw (err);
        console.log("\n");
        console.table(res);
        console.log("\n");
    });
    start();
}

/////////////////////////////////////////////////////
// Called from within viewRootMenu() function
// viewDepts() function uses SELECT to display department table
//////////////////////////////////////////////////////
function viewDepts() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw (err);
        console.log("\nALL DEPARTMENT DATA:\n");
        console.table(res);
        console.log("\n");
    });
    start();
}

/////////////////////////////////////////////////////
// Called from within viewRootMenu() function
// viewRoles() function uses SELECT to display role table
//////////////////////////////////////////////////////
function viewRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw (err);
        console.log("\nALL ROLE DATA:\n");
        console.table(res);
        console.log("\n");
    });
    start();
}

/////////////////////////////////////////////////////
// Called from within viewRootMenu() function
// viewDir() function uses SELECT to display employee table
//////////////////////////////////////////////////////
function viewDir() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw (err);
        console.log("\nALL EMPLOYEE DATA:\n");
        console.table(res);
        console.log("\n");
    });
    start();
}

/////////////////////////////////////////////////////
// ADD DATA 'ROOT' MENU
// Called from within start() function, prompt name "StartQ"
// User chooses to add new:
// Dept / Role / Emp // Or back to main menu aka start()
//////////////////////////////////////////////////////
function addData() {
    inquirer
        .prompt({
            name: "addRoot",
            type: "list",
            message: "Would you like to add a department, role, or new employee?",
            choices: ["Add a Department", "Add a Role", "Add an Employee", "Back to Main Menu"]
        }).then(function (arAnswer) {
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

/////////////////////////////////////////////////////
// ADD NEW DEPT FUNCTION
// Called from within addData() function, prompt name "addRoot"
// User inputs name of new dept via prompt name "addDept"
//////////////////////////////////////////////////////
function addDept() {
    inquirer
        .prompt({
            name: "addDept",
            type: "input",
            message: "ADD A NEW DEPARTMENT. You've selected to add a new department to the company. What is the name of the department you would like to add?"
            /////////////////////// .then async
        }).then(async function (adAnswer) {
            /////////////////////// INSERT INTO role table
            connection.query("INSERT INTO department SET ?", {
                    name: adAnswer.addDept
                },
                function (err) {
                    if (err) throw (err);
                });
            await start();
        });
    //in the future, I'd like to add another prompt to ask to view all departments or return to main menu
}

/////////////////////////////////////////////////////
// ADD NEW ROLE FUNCTION
// Called from within addData() function, prompt name "addRoot"
// User inputs:
// name of new role via prompt name "addRoleTitle"
// role salary via prompt name "addRoleSalary"
// role's dept ID via prompt name "addRoleDeptId"
//////////////////////////////////////////////////////
function addRole() {
    // inquirer
    inquirer
        .prompt([{
                /////////////////////// Role Title
                name: "addRoleTitle",
                type: "input",
                message: "ADD A NEW ROLE: You've selected to add a new role. What is the title of the role you would like to add?"
            },
            { /////////////////////// Role Salary
                name: "addRoleSalary",
                type: "input",
                message: "What is the salary of this new role?"
            },
            { /////////////////////// Role Dept ID
                name: "addRoleDeptId",
                type: "list",
                message: "What is the department id of the new role you added? // 1 - Operations / 2 - Engineering / 3 - Customer Support / 4 - Implementation / 5 - Sales",
                choices: ["1", "2", "3", "4", "5"]
            }
            /////////////////////// .then async
        ]).then(async function (arAnswer) {
            /////////////////////// INSERT INTO role table
            connection.query("INSERT INTO role SET ?", {
                    title: arAnswer.addRoleTitle,
                    salary: arAnswer.addRoleSalary,
                    department_id: arAnswer.addRoleDeptId
                },

                function (err) {
                    if (err) throw (err);
                });
            //in the future, I'd like to add another prompt to ask to view all roles (to see new role in list) or return to main menu
            await start();
        });

}

/////////////////////////////////////////////////////
// ADD NEW EMPLOYEE -to employee directory- FUNCTION
// Called from within addData() function, prompt name "addRoot"
// User inputs:
// name of new role via prompt name "addRoleTitle"
// role salary via prompt name "addRoleSalary"
// role's dept ID via prompt name "addRoleDeptId"
//////////////////////////////////////////////////////
function addDir() {
    //inquirer
    inquirer
        .prompt([{
                /////////////////////// first name
                name: "addDirFirst",
                type: "input",
                message: "ADD A NEW EMPLOYEE: You've selected to add a new employee. What is the FIRST name of the employee you would like to add?"
            },
            { /////////////////////// last name
                name: "addDirLast",
                type: "input",
                message: "What is the LAST name of the employee you would like to add?"
            },
            { /////////////////////// role_id
                name: "addDirRoleId",
                type: "list",
                message: "What is the role id of the new role you added? /// 1 - CEO // 2 - VP of Dev // 3 - VP of Marketing // 4 - Engineer // 5 - Junior Engineer // 6 - Implementation Manager // 7 - Marketing Analyst // 8 - Project Manager ///",
                choices: ["1", "2", "3", "4", "5", "6", "7", "8"]
            },
            { /////////////////////// manager_id
                name: "addDirManagerId",
                type: "list",
                message: "What is the manager id of the new role you added? /// 1 - CEO Lucy Martin // 2 - VP of Dev Nancy King // 3 - VP of Marketing Sean Samuels // 4 - Implementation Manager Parker Bowles ///",
                choices: ["1", "2", "3", "4"]
            }
            /////////////////////// .then async
        ]).then(async function (adAnswer) {
            /////////////////////// INSERT INTO role table
            connection.query("INSERT INTO employee SET ?", {
                    first_name: adAnswer.addDirFirst,
                    last_name: adAnswer.addDirLast,
                    role_id: adAnswer.addDirRoleId,
                    manager_id: adAnswer.addDirManagerId
                },

                function (err) {
                    if (err) throw (err);
                }); // await start
            await start();
        });

}

/////////////////////////////////////////////////////
// UPDATE DATA FUNCTION
// only employees can be modified 
//////////////////////////////////////////////////////
function updateData() {
    // inquirer 
    inquirer.prompt([
        /////////////////////// get employee ID to identify
        {
            name: "updateEmpId",
            type: "input",
            message: "UPDATE AN EMPLOYEE: What is the employee ID of the employee you would like to update?"
        },
        { /////////////////////// get user input for updated role 
            name: "updateEmpRole",
            type: "list",
            message: "What is the new role id of the employee you are updating? /// 1 - CEO // 2 - VP of Dev // 3 - VP of Marketing // 4 - Engineer // 5 - Junior Engineer // 6 - Implementation Manager // 7 - Marketing Analyst // 8 - Project Manager ///?",
            choices: ["1", "2", "3", "4", "5", "6", "7", "8"]

        }
        /////////////////////// .then async function (urAnswer)
    ]).then(async function (urAnswer) {
        ///////////////////////  query UPDATE employee SET ? WHERE ?
        connection.query("UPDATE employee SET ? WHERE ?",
            [{
                    role_id: urAnswer.updateEmpRole
                },
                {
                    id: urAnswer.updatEmpId
                }
            ],
            function (err) {
                if (err) throw (err);
            });
        await start();
    });
}

/////////////////////////////////////////////////////
// we can only update employees
// specififcally their role and manager id
// how to indentify employees? 
// could do name, but would have to be an exact match
// could do employee id. Would hey know it? probably not
// i think employee id is best
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// Would like to add extra update functionality in the future
// if update emp managerID, 
// prompt for new role name (updatedManager_)
// prompt for emp id (name empId_)
// .then async function (umAnswer)
// query UPDATE employee SET ? WHERE > 
// manager_id: umAnswer.updatedManager_
// id: urAnswer
//////////////////////////////////////////////////////