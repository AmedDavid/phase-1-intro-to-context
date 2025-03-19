// Your code here

// My function to create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create multiple employee records
function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

// Function to create a "Time In" event
function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    return employeeRecord;


}

// "Time Out" event
function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    return employeeRecord;
}

// Function to calculate hours worked on a given date
function hoursWorkedOnDate(employeeRecord, date) { //Finds the difference between time-in and time-out.
    
    let timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    
    return (timeOut.hour - timeIn.hour) / 100;
}

// wages
function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
}

// Function to calculate all wages for an employee
function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(employeeRecord, event.date);
    }, 0);
}

// Function to calculate total payroll
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
        return total + allWagesFor(employee);
    }, 0);
}

// the tests
let employees = createEmployeeRecords([
    ["David", "Amedi", "Software Engineer", 50],
    ["Sharon", "Kimani", "Project Manager", 60]
]);

createTimeInEvent(employees[0], "2025-03-19 0800");
createTimeOutEvent(employees[0], "2025-03-19 1600");
createTimeInEvent(employees[1], "2025-03-19 0900");
createTimeOutEvent(employees[1], "2025-03-19 1700");

console.log("David's wages:", wagesEarnedOnDate(employees[0], "2025-03-19"));
console.log("Sharon's wages:", wagesEarnedOnDate(employees[1], "2025-03-19"));
console.log("Total Payroll:", calculatePayroll(employees));


