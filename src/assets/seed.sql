CREATE TABLE IF NOT EXISTS category(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,img TEXT);
INSERT or IGNORE INTO category VALUES (1, 'Grocery & Staples', 'categories/cat1.jpg');
INSERT or IGNORE INTO category VALUES (2, 'Vegetables & Fruit', 'categories/cat2.jpg');
INSERT or IGNORE INTO category VALUES (3, 'Dairy', 'categories/cat3.jpg');
INSERT or IGNORE INTO category VALUES (4, 'Household Items', 'categories/cat4.jpg');
INSERT or IGNORE INTO category VALUES (5, 'Personel Care', 'categories/cat5.jpg');
INSERT or IGNORE INTO category VALUES (6, 'Kichen & Dining Needs', 'categories/cat6.jpg');

CREATE TABLE IF NOT EXISTS subcategory(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,img TEXT,categoryId INTEGER);
INSERT or IGNORE INTO subcategory(id, name, img, categoryId) VALUES (1, 'Pulses', 'categories/cat1.jpg',1);
INSERT or IGNORE INTO subcategory(id, name, img, categoryId) VALUES (2, 'Atta', 'categories/cat2.jpg',1);
INSERT or IGNORE INTO subcategory(id, name, img, categoryId) VALUES (3, 'Oil', 'categories/cat3.jpg',1);
INSERT or IGNORE INTO subcategory(id, name, img, categoryId) VALUES (4, 'Bread & Eggs', 'categories/cat4.jpg',3);
INSERT or IGNORE INTO subcategory(id, name, img, categoryId) VALUES (5, 'paneer & curd', 'categories/cat5.jpg',3);
INSERT or IGNORE INTO subcategory(id, name, img, categoryId) VALUES (6, 'Vegetables', 'categories/cat6.jpgy',2);
 
CREATE TABLE IF NOT EXISTS product(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, subcategoryId INTEGER);
INSERT or IGNORE INTO product(id, name, subcategoryId) VALUES (1, 'Arhar Dal', 1);
INSERT or IGNORE INTO product(id, name, subcategoryId) VALUES (2, 'Chakki Atta', 2);
INSERT or IGNORE INTO product(id, name, subcategoryId) VALUES (3, 'Aashirwad Atta', 2);
INSERT or IGNORE INTO product(id, name, subcategoryId) VALUES (4, 'Safola', 3);
INSERT or IGNORE INTO product(id, name, subcategoryId) VALUES (5, 'amul curd', 5);
INSERT or IGNORE INTO product(id, name, subcategoryId) VALUES (6, 'Ionicons', 3);