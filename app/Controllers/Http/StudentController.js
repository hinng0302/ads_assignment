'use strict'
const Student = use('App/Models/Student')
class StudentController {
    async index({response}){
        var student = await Student.fetch()
        response.json(student)
    }

    async groupbycouse({response}){
        var student = await Student.count(
            {
                'DeptId': '$Enrolled.DeptId',
                'CourseID': '$Enrolled.CourseID'
            },
            {
                DeptId: 'Enrolled.DeptId', 
                CourseID:'Enrolled.CourseID'
            }
        ).sort('count')
            // student = student.toJSON()
            // console.log(student)
        // var student = await Student.distinct( 'Enrolled' )
        response.json(student)
    }
}

module.exports = StudentController
