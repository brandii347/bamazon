CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    primary key(item_id)


);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Safety 1st Grow and Go Car Seat", "Baby", 134.99, 250),
("Inglesina Net Stroller", "Baby", 149.00, 100),
("Pop-up Hot Dog Toaster", "Kitchen", 14.99, 57),
("Uno Card Game", "Toys and Games", 4.99, 534),
("Shopping Cart Cover", "Baby", 19.98, 39),
("Mama Mia DVD", "Movies", 12.99, 23),
("Coyote Ugly DVD", "Movies", 15.99, 14),
("Hasbro Connect Four", "Toys and Games", 8.77, 36),
("Star Wars Darth Vadar Toaster", "Kitchen", 49.95, 103),
("Star Wars Death Star Waffle Maker", "Kitchen", 39.99, 478);