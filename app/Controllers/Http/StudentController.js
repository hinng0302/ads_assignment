'use strict'
const Student = use('App/Models/Student')
class StudentController {
    async index({response}){
        var student = await Student.fetch()
        response.json(student)
    }
}

module.exports = StudentController
