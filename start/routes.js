'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')
Route.get('_test', 'DepartmentController.department_corse')
const swaggerJSDoc = use('swagger-jsdoc')
Route.get('/api-specs', async({request, response})=>{
    const options = {
		swaggerDefinition: {
			openapi: '3.0.0',
			info:{
				version: '1.0.0',
				title: 'ADS_assignment',
			},
        },
        apis:[
            'apidocs/paths/*',
            'apidocs/components/*'
        ]
    }
    var swaggerSpec = swaggerJSDoc(options)
	delete swaggerSpec.swagger
	swaggerSpec.components = swaggerSpec.paths.components
	delete swaggerSpec.paths.components
	return swaggerSpec
})

Route.get('/', 'FrontController.index')
Route.post('/login', 'FrontController.Login')
Route.get('/logout', 'FrontController.logout')
Route.group(()=> {
    Route.get('/student/:studentID', 'UpdateController.update_students')
    Route.get('/getstudent/:studentID', 'UpdateController.getStudents')
    Route.get('/course/:CourseID', 'UpdateController.update_course')
    Route.get('/getcourse/:CourseID', 'UpdateController.getCourse')
    Route.get('/dept/:DeptID', 'UpdateController.update_dept')
    Route.get('/getDept/:DeptID', 'UpdateController.update_dept')
    Route.get('/getOffer', 'UpdateController.getOffer')
}).prefix('/update')

Route.group(()=>{
    Route.get('/listing', 'FrontController.studentlist')
    Route.get('/create', 'FrontController.studentcreate')
    Route.get('/edit/:studentID', 'FrontController.studentedit')
    Route.get('/details/:studentID', 'FrontController.studentdetails')
}).prefix('/front/student')


Route.group(()=>{
    Route.get('/listing', 'FrontController.courselist')
    Route.get('/create', 'FrontController.coursecreate')
    Route.get('/edit/:courseID', 'FrontController.courseedit')
    Route.get('/details/:CourseID', 'FrontController.coursedetails')
    Route.get('/addstudent/:_id', 'FrontController.courseAddStudent')
}).prefix('/front/course')
Route.group(()=>{
    Route.get('/create', 'FrontController.departmentcreate')
    Route.get('/listing', 'FrontController.departmentlist')
    Route.get('/search', 'FrontController.departmentsearch')
    Route.get('/edit/:DeptID', 'FrontController.departmentedit')
    Route.get('/details/:DeptID', 'FrontController.departmentdetails')
    Route.get('/addOffer/:DeptID', 'FrontController.departmentaddOffer')
}).prefix('/front/department')


// Route.on('/').render('welcome')
Route.group(()=>{
    Route.get('/', 'DepartmentController.index')
    Route.put('/', 'DepartmentController.add')
    Route.post('/', 'DepartmentController.edit')
    Route.delete('/', 'DepartmentController.delete')
}).prefix('/department')

Route.get('/stud/test', 'StudentController.index')

Route.get('/stud/groupbycouse', 'StudentController.groupbycouse')
Route.get('/course/offer_by_depart/:depart_code/year/:year', 'CourseController.offerby_dept')
Route.get('/course/offer_by_multi_depart/:depart_code1/:depart_code2/year/:year', 'CourseController.offerby_dept_or')

Route.group(()=>{
    Route.get('/', 'StudentController.list')
    Route.get('/:studentID', 'StudentController.get')
    Route.put('/', 'StudentController.add')
    Route.post('/', 'StudentController.edit')
    Route.delete('/', 'StudentController.delete')
}).prefix('/student')


Route.group(() => {
    Route.get('/', 'CourseController.get')
    Route.get('/:CourseID', 'CourseController.CourseDetails')
    Route.put('/', 'CourseController.add')
    Route.post('/', 'CourseController.edit')
    Route.delete('/', 'CourseController.delete')
    Route.get('/group_by_dept', 'CourseController.index2')
}).prefix('/course')

Route.group(()=>{
    Route.get('/', 'OfferController.get')
    Route.get('/search/:Year/:DeptID', 'OfferController.search')
    Route.put('/', 'OfferController.add')
    Route.delete('/', 'OfferController.delete')
}).prefix('/offer')

Route.group(()=>{
    Route.get('/', 'EnrolledController.get')
    Route.put('/', 'EnrolledController.add')
    Route.delete('/', 'EnrolledController.delete')
}).prefix('/enrolled')

Route.group(()=>{
    Route.get('/enrolled', 'SearchController.searchEnrolled')
}).prefix('/search')