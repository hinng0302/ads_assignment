'use strict'

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
    async courselist({session, view}){
        var object = {
            is_login: session.get('is_logged_in')
        }
        return view.render('course_listing', object)
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
