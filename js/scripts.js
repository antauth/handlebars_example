/**
 * Employee representation.
 */
function Employee(num, firstName, lastName, salary, reviewScore) {
 	this.num = num;
 	this.firstName = firstName;
 	this.lastName = lastName;
 	this.salary = salary;
 	this.reviewScore = reviewScore;
 }
/**
 * Employee list.
 */
function EmployeeList() {
 	var list = [];
 	/**
 	 * Get a copy of the list
 	 */
 	this.getList = function() {
 		return list.slice(0);
 	}
 	/**
 	 * Add an Employee
 	 *
 	 * @param an employee
 	 */
 	this.addEmployee = function(employee) {
 		if(numExists(employee.num)) {
 			console.log('Unable to create employee, num is not unique.');
 			return;
 		}
 		if(employee instanceof Employee) {
 			list.push(employee);
 		}
 	}
 	/**
 	 * Remove an Employee
 	 *
 	 * @param employee number
 	 */
 	 this.removeEmployee = function(num) {
 	 	for(i = 0; i < list.length; i++) {
 	 		if(num == list[i].num) {
 	 			list.splice(i, 1);
 	 			break;
 	 		}
 	 	}	 	
 	 }
 	 /**
 	  * Check if an employee number already exists
 	  * 
 	  * @param employee number
 	  */
 	  numExists = function(num) {
 	  	return list.some(function(element, index, array) {
 	  		return num == element.num;
 	  	});
 	  }
 }
 $(document).ready(function(){
 	// create a list
 	var list = new EmployeeList();

 	// add some employees to the list
 	list.addEmployee(new Employee(1, "Alicia", "Keys", 50000, 4));
 	list.addEmployee(new Employee(3, "Michael", "Shanks", 40000, 3));
 	list.addEmployee(new Employee(5, "Larry", "Whitmore", 70000, 2));
 	list.addEmployee(new Employee(9, "Maggie", "Gyllenhaal", 72000, 5));

 	// create template for displaying employees
 	var employeeTemplate = $("#employee-list").html();

 	// Compile the template
  	var theTemplate = Handlebars.compile(employeeTemplate);

  	// Pass our data to the template
  	var compiledHtml = theTemplate({employees: list.getList()});

  	// Add the compiled html to the page
  	$(".employees").append(compiledHtml);

 });