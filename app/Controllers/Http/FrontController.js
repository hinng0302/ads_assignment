'use strict'

class FrontController {
    async index({view}){

        return view.render('home')
    }
    async studentlist({view}){
        return view.render('student_listing')
    }
}

module.exports = FrontController
