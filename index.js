const sql = require("sql");
const inquirer = require("inquirer");
const dotenv = require("dotenv");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3308,

    // Your username
    user: "root",

    // Your password
    password: "Magsmags5!4",
    database: "staff_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "viewOrAdd",
            type: "list",
            message: "Would you like to view information or add new infomation?",
            choices: ["View", "Add", "Exit"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.viewOrAdd === "View") {
                queryAllItems();
            } else if (answer.viewOrAdd === "Add") {
                addItem();
            } else {
                connection.end();
            }
        });
}

function queryAllItems() {
    console.log("...Selecting all items in table to READ...");
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].first_name + " | " + res[i].role_id + " | " + res[i].manager_id);
        }
        console.log("-----------------------------------");
    });
}


// function to handle posting new items up for auction
function postAuction() {
    // prompt for info about the item being put up for auction
    inquirer
        .prompt([{
                name: "item",
                type: "input",
                message: "What is the item you would like to submit?"
            },
            {
                name: "category",
                type: "input",
                message: "What category would you like to place your auction in?"
            },
            {
                name: "startingBid",
                type: "input",
                message: "What would you like your starting bid to be?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO auctions SET ?", {
                    item_name: answer.item,
                    category: answer.category,
                    starting_bid: answer.startingBid || 0,
                    highest_bid: answer.startingBid || 0
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your auction was created successfully!");
                    // re-prompt the user for if they want to bid or post
                    start();
                }
            );
        });
}