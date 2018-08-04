'use strict'

class FrontController {
    async index({view}){

        return view.render('home')
    }
    async studentlist({view}){
        return view.render('student_listing')
    }

    async Login({request, view}){
        console.log(request.all())
        var {username, password} = request.all(['username', 'password'])
        if(username == 'admin'&& password== 'admin'){
            return view.render('student_listing')
        } else {
            return view.render('home')
        }
    }
}

module.exports = FrontController
