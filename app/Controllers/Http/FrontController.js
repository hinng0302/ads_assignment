'use strict'
const Env = use('Env')
const got = use('got')
class FrontController {
    async index({session, view, response}){
        var is_login = session.get('is_logged_in')
        console.log(is_login)
        if(is_login){
            response.redirect('/front/student/listing')
        }
        return view.render('home', {is_login: is_login})
    }
    async studentlist({session, view}){
        var object = {
            is_login: session.get('is_logged_in')
        }
        return view.render('student_listing', object)
    }
    async studentcreate({session, view}){
        var object = {
            is_login: session.get('is_logged_in')
        }
        return view.render('student_create', object)
    }
    async studentedit({session,params ,view}){
        var object = {
            is_login: session.get('is_logged_in'),
            studentID: params.studentID
        }
        return view.render('student_edit', object)
    }
    async studentdetails({session,params ,view}){
        var studentID = params.studentID
        var result
        try{
            result = await got(Env.get('DEFAULT_DOMAIN')+'/update/getstudent/'+studentID)
            console.log('/student/'+studentID)
            result = JSON.parse(result.body)
        }catch(error){
            console.log(error)
            console.log(error.body)
        }
        var object = {
            is_login: session.get('is_logged_in'),
            Student: result.Student,
            Enrolled: result.Enrolled
        }

        return view.render('student_details', object)
    }
    async courselist({session, view}){
        var object = {
            is_login: session.get('is_logged_in')
        }
        return view.render('course_listing', object)
    }
    async coursecreate({session, view}){
        var object = {
            is_login: session.get('is_logged_in')
        }
        return view.render('course_create', object)
    }
    async courseedit({session, params, view}){
        var object = {
            is_login: session.get('is_logged_in'),
            courseID: params.courseID
        }
        return view.render('course_edit', object)
    }
    async coursedetails({session, params, view}){
        var CourseID = params.CourseID
        var result = await got(Env.get('DEFAULT_DOMAIN')+'/update/getcourse/'+CourseID)
        result = JSON.parse(result.body)
        console.log(result)
        var object = {
            is_login: session.get('is_logged_in'),
            Course: result.course,
            offers: result.offers,
            enrolled: result.enrolled
        }
        return view.render('course_details', object)
    }
    async courseAddStudent({session, params, view}){
        var _id = params._id
        var students = await Student.fetch()
        students =students.toJSON()
        const Enrolled = use('App/Models/Enrolled')
        var enrolled = await Enrolled.find(_id)
        enrolled = enrolled.toJSON()
        var object = {
            is_login: session.get('is_logged_in'),
            Students: students,
            enrolled: enrolled
        }
        return view.render('course_addStudent', object)
    }
    async departmentlist({session, view}){
        var object = {
            is_login: session.get('is_logged_in')
        }
        return view.render('dept_listing', object)
    }
    async departmentcreate({session, view}){
        var object = {
            is_login: session.get('is_logged_in')
        }
        return view.render('dept_create', object)
    }
    async departmentedit({session, params, view}){
        
        var DeptID = params.DeptID
        var result = await got(Env.get('DEFAULT_DOMAIN')+'/update/getdept/'+CourseID)
        result = JSON.parse(result.body)
        var object = {
            is_login: session.get('is_logged_in'),
            DeptID: DeptID,
            Department: result.Department,
            enrolled: result.Enrolled
        }
        return view.render('dept_edit', object)
    }
    async departmentdetails({session, params, view}){
        var DeptID = params.DeptID
        await got(Env.get('DEFAULT_DOMAIN')+'/update/dept/'+DeptID)
        var result = await got(Env.get('DEFAULT_DOMAIN')+'/update/getdept/'+DeptID)
        result = JSON.parse(result.body)
        var object = {
            is_login: session.get('is_logged_in'),
            DeptID: DeptID,
            Department: result.Department,
            enrolled: result.Enrolled
        }
        return view.render('dept_details', object)
    }
    async departmentaddOffer({session, params, view}){
        var DeptID = params.DeptID
        var courses = await got(Env.get('DEFAULT_DOMAIN')+'/course')
        courses = JSON.parse(courses.body)
        var result = await got(Env.get('DEFAULT_DOMAIN')+'/update/getdept/'+DeptID)
        result = JSON.parse(result.body)
        var object = {
            is_login: session.get('is_logged_in'),
            DeptID: DeptID,
            Department: result.Department,
            Courses: courses
        }
        return view.render('dept_new_course', object)
    }
    async Login({session, request, response}){
        console.log(request.all())
        var {username, password} = request.all(['username', 'password'])
        if(username == 'admin'&& password== 'admin'){
            session.put('is_logged_in', true)
            var object = {
                is_login: true
            }
            response.redirect('/front/student/listing', object)
        } else {
            response.redirect('/')
        }
    }
    async logout({session, response}){
        session.put('is_logged_in', null)
        response.redirect('/')
    }
}

module.exports = FrontController
