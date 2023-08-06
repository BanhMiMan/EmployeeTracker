INSERT INTO department (name)
VALUES 
("Programming"),
("Art"), 
("Game Design"), 
("Audio"), 
("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES
("Programming", 120000, 1),
("Programming Manager", 180000, 1),
("Art", 70000, 2),
("Art Manager", 10000, 2),
("Game Design", 130000, 3),
("Game Design Manager", 20000, 3),
("Audio", 110000, 4),
("Audio Manager", 140000, 4),
("Marketing", 60000, 5),
("Marketing Manager", 90000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Mi", "Mao", 2, NULL),
("Miranda", "ppface", 1, 1),
("Syl", "Sili", 1, 1),
("Cameron", "Mckelwee", 4, NULL),
("Christopher", "Thomas", 3, 4),
("Rick", "Sanchez", 3, 4),
("Morty", "Smith", 6, NULL),
("Samira", "Mansoor", 5, 7),
("Stef", "Stefferson", 5, 7),
("Meo", "Mao", 8, NULL),
("Puss", "inBoots", 7, 10),
("Kitty", "SoftPaws", 7, 10),
("Eliza", "Korov", 10, NULL),
("Jun", "Tang", 9, 13),
("Yoon", "Li", 9, 13);