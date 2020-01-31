
DROP DATABASE IF EXISTS staff_db;
CREATE DATABASE staff_db;

USE staff_db;

CREATE TABLE department
(
    id INT NOT NULL
    AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR
    (30) NOT NULL
);

    CREATE TABLE role
    (
        id INT NOT NULL
        AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR
        (30) NOT NULL,
    salary DECIMAL
        (10, 2) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY
        (department_id) REFERENCES department
        (id) ON
        DELETE CASCADE ON
        UPDATE NO ACTION
);

        CREATE TABLE employee
        (
            id INT NOT NULL
            AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR
            (30) NOT NULL,
    last_name VARCHAR
            (30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    FOREIGN KEY
            (manager_id) REFERENCES employee
            (id),
    FOREIGN KEY
            (role_id) REFERENCES role
            (id)
);

            INSERT INTO department
                (name)
            VALUES
                ("Operations"),
                ("Engineering"),
                ("Customer Support"),
                ("Implementation"),
                ("Sales");

            SELECT *
            FROM department;

            INSERT INTO role
                (title, salary, department_id)
            VALUES
                ("CEO", 500000, 1),
                ("VP of Development", 200000, 2),
                ("VP of Marketing", 180000, 5),
                ("Engineer", 80000, 2),
                ("Junior Engineer", 50000, 2),
                ("Implementation Manager", 150000, 4),
                ("Marketing Analyst", 70000, 5),
                ("Project Manager", 180000, 3);

            SELECT *
            FROM role;

            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUES
                ("Lucy", "Martin", 1, NULL),
                ("Nancy", "King", 2, NULL),
                ("Sean", "Samuels", 3, NULL),
                ("Parker", "Bowles", 6, NULL),
                ("Sawyer", "Andrews", 4, 2),
                ("Joe", "Jonas", 4, 2),
                ("Bianca", "Carter", 4, 2),
                ("Crystal", "Del Rio", 5, 2),
                ("Emily", "Shea", 7, 3),
                ("Elizabeth", "Sulentc", 7, 3),
                ("Trinity", "Sanchez", 8, 6),
                ("Courtney", "Act", 8, 6);

            SELECT *
            FROM employee;

            SELECT a.id, a.first_name, a.last_name, role.title, role.salary, department.name, CONCAT(b.first_name ," " ,b.last_name) AS Manager
            FROM department
                RIGHT JOIN role ON role.department_id = department.id
                RIGHT JOIN employee a ON a.role_id = role.id
                LEFT JOIN employee b ON b.id = a.manager_id;