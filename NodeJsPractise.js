const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Array to store employee data
let employees = [
    { name: 'Alice', id: 'E101' },
    { name: 'Bob', id: 'E102' },
    { name: 'Charlie', id: 'E103' }
];

// Function to display the main menu
function displayMenu() {
    console.log('\nEmployee Management System');
    console.log('1. Add Employee');
    console.log('2. List Employees');
    console.log('3. Remove Employee');
    console.log('4. Exit');
    console.log('');
    
    rl.question('Enter your choice: ', handleMenuChoice);
}

// Function to handle menu selection
function handleMenuChoice(choice) {
    choice = choice.trim();
    
    switch(choice) {
        case '1':
            addEmployee();
            break;
        case '2':
            listEmployees();
            break;
        case '3':
            removeEmployee();
            break;
        case '4':
            exitApplication();
            break;
        default:
            console.log('Invalid choice. Please try again.');
            displayMenu();
    }
}

// Function to add a new employee
function addEmployee() {
    rl.question('Enter employee name: ', (name) => {
        name = name.trim();
        
        if (!name) {
            console.log('Name cannot be empty. Please try again.');
            displayMenu();
            return;
        }
        
        rl.question('Enter employee ID: ', (id) => {
            id = id.trim();
            
            if (!id) {
                console.log('ID cannot be empty. Please try again.');
                displayMenu();
                return;
            }
            
            // Check if ID already exists
            const existingEmployee = employees.find(emp => emp.id === id);
            if (existingEmployee) {
                console.log(`Employee with ID ${id} already exists. Please use a different ID.`);
                displayMenu();
                return;
            }
            
            // Add new employee to array
            employees.push({ name, id });
            console.log(`Employee ${name} (ID: ${id}) added successfully.`);
            displayMenu();
        });
    });
}

// Function to list all employees
function listEmployees() {
    console.log('\nEmployee List:');
    
    if (employees.length === 0) {
        console.log('No employees found.');
    } else {
        employees.forEach((employee, index) => {
            console.log(`${index + 1}. Name: ${employee.name}, ID: ${employee.id}`);
        });
    }
    
    displayMenu();
}

// Function to remove an employee by ID
function removeEmployee() {
    if (employees.length === 0) {
        console.log('No employees to remove.');
        displayMenu();
        return;
    }
    
    rl.question('Enter employee ID to remove: ', (id) => {
        id = id.trim();
        
        if (!id) {
            console.log('ID cannot be empty. Please try again.');
            displayMenu();
            return;
        }
        
        // Find the index of the employee with the given ID
        const index = employees.findIndex(emp => emp.id === id);
        
        if (index === -1) {
            console.log(`No employee found with ID: ${id}`);
        } else {
            const removedEmployee = employees[index];
            employees.splice(index, 1);
            console.log(`Employee ${removedEmployee.name} (ID: ${removedEmployee.id}) removed successfully.`);
        }
        
        displayMenu();
    });
}

// Function to exit the application
function exitApplication() {
    console.log('Thank you for using Employee Management System. Goodbye!');
    rl.close();
    process.exit(0);
}

// Function to handle unexpected closure
rl.on('close', () => {
    console.log('\nApplication closed.');
    process.exit(0);
});

// Start the application
console.log('Welcome to Employee Management System!');
displayMenu();
