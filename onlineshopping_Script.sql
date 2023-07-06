CREATE DATABASE IF NOT EXISTS onlineshopping;
USE onlineshopping;

SELECT * FROM Watchlist;

DROP TABLE IF EXISTS Order_item;
DROP TABLE IF EXISTS Watchlist;
DROP TABLE IF EXISTS Quiz;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Permission;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Product;


CREATE TABLE IF NOT EXISTS User (
	id bigint PRIMARY KEY AUTO_INCREMENT,
    username varchar(255) UNIQUE,
    password varchar(255) NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    is_active boolean NOT NULL,
    role int NOT NULL
);
INSERT INTO User ( username, password, first_name, last_name, is_active, role) VALUES 
('user1', 'pass1', 'first1','last1', true, 1),
( 'user2', 'pass2', 'first2','last2', true, 2),
( 'user3', 'pass3', 'first3','last3', false, 2);


CREATE TABLE IF NOT EXISTS Permission (
	permission_id bigint PRIMARY KEY AUTO_INCREMENT,
    value varchar(255),
    user_id bigint NOT NULL,
    CONSTRAINT perm_user_fk FOREIGN KEY (user_id)
    REFERENCES User(id)
);

INSERT INTO Permission ( value, user_id) VALUES 
('user_write', 1),
('user_update', 1),
('user_read', 1),
('product_update',1), 
('user_delete', 1);

CREATE TABLE IF NOT EXISTS Orders (
	order_id bigint PRIMARY KEY AUTO_INCREMENT,
    date_placed datetime(6) NOT NULL,
    order_status varchar(255) NOT NULL,
    user_id bigint NOT NULL,
    CONSTRAINT order_user_fk FOREIGN KEY (user_id)
    REFERENCES User(id)
);

INSERT INTO Orders ( date_placed, order_status, user_id) VALUES 
(now(), 'Processing', 1),
(now(6), 'Cancel', 1),
('2014-07-25 11:18:10.999999', 'Completed', 1);

CREATE TABLE IF NOT EXISTS Product (
	product_id bigint PRIMARY KEY AUTO_INCREMENT,
    description varchar(255),
    name varchar(255) NOT NULL UNIQUE,
    quantity int NOT NULL,
    retail_price double NOT NULL,
    wholesale_price double NOT NULL
);
INSERT INTO Product ( description, name, quantity, retail_price, wholesale_price) VALUES 
('sweetest blueberry', 'blueberry',100,5,10),
('fresh main lobster','lobster',20,10,30),
('contains real juice','soda',1000, 0.5,1),
('organic envy apple','apple',500, 1,3.75),
('nice pasta','pasta',250, 1,5);

CREATE TABLE IF NOT EXISTS Order_item (
	item_id bigint PRIMARY KEY AUTO_INCREMENT,
    purchased_price double NOT NULL,
    quantity int NOT NULL,
    wholesale_price double,
    order_id bigint NOT NULL,
    product_id bigint NOT NULL,
    CONSTRAINT item_order_fk FOREIGN KEY (order_id)
    REFERENCES Orders(order_id),
    CONSTRAINT item_product_fk FOREIGN KEY (product_id)
    REFERENCES Product(product_id)
);
INSERT INTO Order_item ( purchased_price, quantity, wholesale_price, order_id, product_id) VALUES 
(10,50,9,3,1),
(30,16,25,3,2),
(4.75,499,2.75,3,4),
(1,901,0.5,3,3),
(5,32,3.5,1,5);


CREATE TABLE IF NOT EXISTS Watchlist (
	watchlist_id bigint PRIMARY KEY AUTO_INCREMENT,
    user_id bigint NOT NULL,
    product_id bigint NOT NULL,
    CONSTRAINT watch_user_fk FOREIGN KEY (user_id)
    REFERENCES User(id),
    CONSTRAINT watch_prod_fk FOREIGN KEY (product_id)
    REFERENCES Product(product_id)
);
INSERT INTO Watchlist(user_id, product_id) VALUES
(2,3),
(1,4);



