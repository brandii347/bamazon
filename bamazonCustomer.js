// all the packages i used

var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table"); //table printing for console.log

//connection to mysql
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    Password: "",
    database: "bamazon"
});

//connects the server and loads product data
connection.connect(function(err){
    if (err) {
        console.log("error connecting: " + err.stack);
    }
    loadProducts();
});

//loads the table from mysql and prints results!
function loadProducts() {

//selects all of the data from the mysql table
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;

        
        console.table(res);

        promptCustomerForItem(res); 
    });
} 

//asks the customer for product ID
function promptCustomerForItem(inventory) {

      
//asks user what they want to buy
            inquirer
                .prompt([
                   {
                       type: "input",
                       name: "choice",
                       message: "What is the ID of the item you would like to purchase? [Quit with Q]",
                       validate: function(val) {
                           return !isNaN(val) || val.toLowerCase() === "q";
                       }
                    } 
                ])
                .then(function(val) {
                    //check if user wants to be a quitter
                    checkIfShouldExit(val.choice);
                    var choiceId = parseInt(val.choice);
                    var product = checkInventory(choiceId, inventory);

                    //if customer wants the product with the id they had be like how many??
                    if (product) {

                    //pass the chosen product to promptCustomerForQuantity    
                        promptCustomerForQuantity(product);
                    }
                    else {
                        console.log("\nThat item is not in the inventory.");
                        loadProducts();
                        
                        }
                    
                });
        }

        function promptCustomerForQuantity(product) {
            inquirer
                .prompt([
                    {
                     type: "input",
                     name: "quantity",
                     message: "How many would you like? [Quit with Q]",
                     validate: function(val) {
                         return val > 0 || val.toLowerCase() === "q";
                     }
                    }
                ])
                .then(function(val) {

                    checkIfShouldExit(val.quantity);
                    var quantity = parseInt(val.quantity);


                    if (quantity > product.stock_quantity) {
                        console.log("\nInsufficient quantity!");
                        loadProducts();
                    }
                    else {

                        makePurchase(product, quantity);
                    }
                });
        }

        function makePurchase(product, quantity) {
            connection.query(
                "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
                [quantity, product.item_id],
                function(err, res) {

                    console.log("\nSuccessfully purchased " + quantity +  product.product_name  + "'s!");
                    loadProducts();
                }
            );
        }

        function checkInventory(choiceId, inventory) {
            for (var i = 0; i < inventory.length; i++) {
                if (inventory[i].item_id === choiceId) {

                    return inventory[i];
                }
            }
            return null;
        }

        function checkIfShouldExit(choice) {
            if (choice.toLowerCase() === "q") {
                console.log("Goodbye!");
                process.exit(0);
            }
        }
    

