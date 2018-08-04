'use strict'

class FrontController {
    async index({session, view, response}){
        var is_login = session.get('is_logged_in')
        console.log(is_login)
        if(is_login){
            response.redirect('/front/student/listing')
        }
        return view.render('home')
    }
    async studentlist({session, view}){
        return view.render('student_listing')
    }

    async Login({session, request, view}){
        console.log(request.all())
        var {username, password} = request.all(['username', 'password'])
        if(username == 'admin'&& password== 'admin'){
            session.put('is_logged_in', true)
            return view.render('student_listing')
        } else {
            return view.render('home')
        }
    }
}

module.exports = FrontController
