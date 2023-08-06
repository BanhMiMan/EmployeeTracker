const inquirer = require("inquirer");
const mysql = require('mysql2');

const connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'Halo3odst!?',
        database: 'management_db'
});
    connection.connect((err) => {
      if (err) throw err;
      console.log("Connected to the database.");
    });  



const  employeeTableName       =  "employee";
const  roleTableName           =  "role";
const  departmentTableName     =  "department";


function mainMenu() {
    const  inq_viewAllEmployees    =  "View All Employees";
    const  inq_updateEmployeeRole  =  "Update Employee Role";
    const  inq_addEmployee         =  "Add Employee";
    const  inq_viewAllRoles        =  "View All Roles";
    const  inq_addRole             =  "Add Role";
    const  inq_viewAllDepartments  =  "View All Departments";
    const  inq_addDepartment       =  "Add Department";
    const  inq_Quit                =  "Quit";

    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "mainSelection",
            choices: [
                inq_viewAllDepartments,
                inq_addDepartment,
                inq_viewAllEmployees,
                inq_addEmployee,
                inq_viewAllRoles,
                inq_addRole,
                inq_updateEmployeeRole,
                inq_Quit
            ]
        }
    ]).then(response => {
        switch (response.mainSelection) {
            case inq_viewAllDepartments:
                viewTable(departmentTableName);
                break;
            case inq_addDepartment:
                console.log("Add Department");
                addDepartment();
                break;
            case inq_viewAllEmployees:
                viewTable(employeeTableName);
                break;
            case inq_addEmployee:
                addEmployee();
                break;
            case inq_viewAllRoles:
                viewTable(roleTableName);
                break;
            case inq_addRole:
                console.log("Add Role");
                addRole();
                break;
            case inq_updateEmployeeRole:
                console.log("Update Employee Role");
                updateEmployeeRole();
                break;
            case inq_Quit:
            default:
                console.log("Quitting");
                connection.end();
                break;
            }
    });
};


function viewTable(tableName) {
    const query = `SELECT * FROM ${tableName};`;              

    connection.query(query, (err, res) => {
        if (err) throw err;                                    
        console.table(res);                              
        mainMenu();                                           
    });
};

function addEmployee() {
    connection.query(`SELECT * FROM ${roleTableName};`, (err, roles) => {

        if (err) throw err;
        connection.query(`SELECT * FROM ${employeeTableName};`, (err, employees) => {

            if (err) throw err;
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the employee's first name?",
                    name: "first_name",
                },
                {
                    type: "input",
                    message: "What is the employee's last name?",
                    name: "last_name",
                },
                {
                    type: "list",
                    message: "What is the employee's role?",
                    name: "role_id",
                    choices: roles.map(role => ({
                            name: role.title,
                            value: role.id
                        })
                    )
                },
                {
                    type: "list",
                    message: "Who is the employee's manager?",
                    name: "manager_id",
                    choices: employees.map(employee => ({
                            name: `${employee.first_name} ${employee.last_name}`,
                            value: employee.id
                        })
                    )
                }
            ]).then(response => {
                const insertQuery = `INSERT INTO ${employeeTableName} (first_name, last_name, role_id, manager_id) VALUES ("${response.first_name}", "${response.last_name}", ${response.role_id}, ${response.manager_id});`;
                connection.query(insertQuery, (err, res) => {

                    if (err) throw err;
                    console.log(`Added ${response.first_name} ${response.last_name} to the database.`);

                    mainMenu();
                });
            });
        });
    });
};

function updateEmployeeRole() {
    connection.query(`SELECT * FROM ${roleTableName};`, (err, roles) => {

        if (err) throw err;
        connection.query(`SELECT * FROM ${employeeTableName};`, (err, employees) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: "list",
                    message: "Which employee's role would you like to update?",
                    name: "employee_id",
                    choices: employees.map(employee => ({
                            name: `${employee.first_name} ${employee.last_name}`,
                            value: employee.id
                        })
                    )
                },
                {
                    type: "list",
                    message: "What is the employee's new role?",
                    name: "role_id",
                    choices: roles.map(role => ({
                            name: role.title,
                            value: role.id
                        })
                    )
                }
            ]).then(response => {
                const updateQuery = `UPDATE ${employeeTableName} SET role_id = ${response.role_id} WHERE id = ${response.employee_id};`;
                connection.query(updateQuery, (err, res) => {

                    if (err) throw err;
                    console.log(`Updated role.`);
                    mainMenu();
                });
            });
        });
    });
}
function addRole() {
    connection.query(`SELECT * FROM ${departmentTableName};`, (err, departments) => {

        if (err) throw err;
        inquirer.prompt([
            {
                type: "input",
                message: "What is the title of the role?",
                name: "title",
            },
            {
                type: "input",
                message: "What is the salary of the role?",
                name: "salary",
            },
            {
                type: "list",
                message: "What is the department of the role?",
                name: "department_id",
                choices: departments.map(department => ({
                        name: department.name,
                        value: department.id
                    })
                )
            }
        ]).then(response => {
            const insertQuery = `INSERT INTO ${roleTableName} (title, salary, department_id) VALUES ("${response.title}", ${response.salary}, ${response.department_id});`;
            connection.query(insertQuery, (err, res) => {
                if (err) throw err;
                console.log(`Added ${response.title} to the database.`);

                mainMenu();
            });
        });
    });
}

function addDepartment() {
    connection.query(`SELECT * FROM ${departmentTableName};`, (err, departments) => {
        if (err) throw err;

        inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the department?",
                name: "name",
            }
        ]).then(response => {
            const insertQuery = `INSERT INTO ${departmentTableName} (name) VALUES ("${response.name}");`;
            connection.query(insertQuery, (err, res) => {
                if (err) throw err;
                console.log(`Added ${response.name} to the database.`);
                mainMenu();
            });
        });
    });
};


mainMenu();       