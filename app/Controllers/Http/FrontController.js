'use strict'
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
        console.log('localhost:3333/student/'+studentID)
        var result = await got('http://localhost:3333/student/'+studentID)
        console.log('/student/'+studentID)
        result = JSON.parse(result.body)
        console.log(result)
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
