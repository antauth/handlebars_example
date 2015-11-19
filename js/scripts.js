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
 	list = [];
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
 		if(this.numExists(employee.num)) {
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
 	 * Retrieve an Employee
 	 *
 	 * @param employee number
 	 * @return found Employee
 	 */
 	 this.getEmployee = function(num) {
 	 	for(i = 0; i < list.length; i++) {
 	 		if(num == list[i].num) {
 	 			return list[i];
 	 		}
 	 	}	 	
 	 }
 	 /**
 	  * Check if an employee number already exists
 	  * 
 	  * @param employee number
 	  */
 	  this.numExists = function(num) {
 	  	return list.some(function(element, index, array) {
 	  		return num == element.num;
 	  	});
 	  }
 }
 $(document).ready(function(){
 	// create a list
 	var list = new EmployeeList();

 	// add some employees to the list
 	list.addEmployee(new Employee(1, 'Alicia', 'Keys', 50000, 4));
 	list.addEmployee(new Employee(3, 'Michael', 'Shanks', 40000, 3));
 	list.addEmployee(new Employee(5, 'Larry', 'Whitmore', 70000, 2));
 	list.addEmployee(new Employee(9, 'Maggie', 'Gyllenhaal', 72000, 5));

 	// Compile the template
  	var employeeListTemplate = Handlebars.compile($('#employee-list').html());
	renderEmployeeList(list.getList());

 	// Compile the template
  	var formTemplate = Handlebars.compile($('#employee-form').html());
  	renderForm(new Employee("", "", "", "", ""));

  	/** ------------ FORM SUBMISSION ------------ **/
  	$('.add form').on('submit', function(e){
  		e.preventDefault();

  		num = $('#num').val();
  		firstName = $('#firstName').val();
  		lastName = $('#lastName').val();
  		reviewScore = $('input[name=reviewScore]:checked').val();
  		salary = $('#salary').val();

  		if(list.numExists(num)) {
  			//update object
  			var emp = list.getEmployee(num);
  			emp.firstName = firstName;
  			emp.lastName = lastName;
  			emp.reviewScore = reviewScore;
  			emp.salary = salary;
  		} else {
  			list.addEmployee(new Employee(num, firstName, lastName, salary, reviewScore));
  		}
  		
  		renderEmployeeList(list.getList());
  	});

  	/** ------------ EMPLOYEE EDIT ------------ **/
  	$('.employees').on('click', '.edit', function(e){
  		console.log($(this).parents('tr'));
  		var employee = list.getEmployee($(this).parents('tr').data('num'));

  		renderForm(employee);
  	});


  	/** ------------ RENDER FUNCTIONS ------------ **/
  	function renderEmployeeList(employeeList) {
  		// Pass our data to the template
  		var compiledHtml = employeeListTemplate({employees: employeeList});

  		// Add the compiled html to the page
  		$('.employees').html(compiledHtml);
  	}

  	function renderForm(employee) {
  		// Pass our data to the template
  		var compiledHtml = formTemplate({employee: employee, ratings: [1,2,3,4,5]});

  		// Add the compiled html to the page
  		$('.add form').html(compiledHtml);
  	}

 });
Handlebars.registerHelper('areEqual', function(arg1, arg2, options) {
	if(arg1 === arg2) {
		return options.fn(this);
	}
	// run else tag
	return options.inverse(this);
});