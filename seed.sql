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






            -- insert
            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUES
                ("", "", #, #)
   