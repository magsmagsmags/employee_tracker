const mysql = require("sql");
const inquirer = require("inquirer");
require("dotenv").config();

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

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
            viewRoles();
        } else {
            start();
        }
    })
}

start();

// function viewAllData(){

// }

// function viewDepts(){

// }

// function viewRoles(){

// }


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


// // function to handle posting new items up for auction
// function postAuction() {
//     // prompt for info about the item being put up for auction
//     inquirer
//         .prompt([{
//                 name: "item",
//                 type: "input",
//                 message: "What is the item you would like to submit?"
//             },
//             {
//                 name: "category",
//                 type: "input",
//                 message: "What category would you like to place your auction in?"
//             },
//             {
//                 name: "startingBid",
//                 type: "input",
//                 message: "What would you like your starting bid to be?",
//                 validate: function (value) {
//                     if (isNaN(value) === false) {
//                         return true;
//                     }
//                     return false;
//                 }
//             }
//         ])
//         .then(function (answer) {
//             // when finished prompting, insert a new item into the db with that info
//             connection.query(
//                 "INSERT INTO auctions SET ?", {
//                     item_name: answer.item,
//                     category: answer.category,
//                     starting_bid: answer.startingBid || 0,
//                     highest_bid: answer.startingBid || 0
//                 },
//                 function (err) {
//                     if (err) throw err;
//                     console.log("Your auction was created successfully!");
//                     // re-prompt the user for if they want to bid or post
//                     start();
//                 }
//             );
//         });
// }