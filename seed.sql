DROP DATABASE IF EXISTS staff_db;

CREATE DATABASE staff_db;

USE staff_db;

-- employee table
CREATE TABLE employee
(
    id INT NOT NULL
    AUTO_INCREMENT primary key,
  first_name VARCHAR
    (30) NULL,
    last_name VARCHAR
    (30) NULL,
   role_id INT,
   -- references the employee id of a manager,the employee's manager
    manager_id INT, 
);

    -- role table
    CREATE TABLE role
    (
        id INT NOT NULL
        AUTO_INCREMENT primary key,
  title VARCHAR
        (30) NOT NULL,
    salary DECIMAL
        (10,2),
    -- Connected to department ID in department table. --
   department_id INT,
    foreign key
        (department_id)
            references department
        (id)
            on
        delete CASCADE
            on
        update no action;
        );

        -- department table
        CREATE TABLE department
        (
            id INT NOT NULL
            AUTO_INCREMENT primary key,
  deptName VARCHAR
            (30) NOT NULL,
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
                ("Marketing Analyst", 70000, 5, ("Customer Success Associate", 60000, 3);

            SELECT *
            FROM role;

            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUES
                ("Laura", "Baker", 1, NULL),
                ("Jason", "Miller", 2, 1),
                ("Amanda", "Smith", 2, 1),
                ("Mark", "Johnson", 3, NULL),
                ("Rebecca", "Anderson", 4, 4),
                ("Nick", "Jackson", 5, NULL),
                ("Molly", "Rose", 6, 6),
                ("Cindy", "Martinez", 7, NULL),
                ("Andrew", "Carson", 8, 8),
                ("Melissa", "Velez", 8, 8);

            SELECT *
            FROM employee;

            SELECT a.id, a.first_name, a.last_name, role.title, role.salary, department.name, CONCAT(b.first_name ," " ,b.last_name) AS Manager
            FROM department
                RIGHT JOIN role ON role.department_id = department.id
                RIGHT JOIN employee a ON a.role_id = role.id
                LEFT JOIN employee b ON b.id = a.manager_id;