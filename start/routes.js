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

Route.on('/').render('welcome')

Route.get('/dept/test', 'DepartmentController.index')
Route.get('/stud/test', 'StudentController.index')
Route.get('/cour/test', 'CourseController.index')
Route.get('/stud/groupbycouse', 'StudentController.groupbycouse')
Route.get('/course/offer_by_depart/:depart_code/year/:year', 'CourseController.offerby_dept')
Route.get('/course/offer_by_multi_depart/:depart_code1/:depart_code2/year/:year', 'CourseController.offerby_dept_or')

Route.group(()=>{
    Route.get('/:studentID', 'StudentController.get')
    Route.put('/', 'StudentController.add')
    Route.post('/', 'StudentController.edit')
    Route.delete('/', 'StudentController.delete')
}).prefix('/student')