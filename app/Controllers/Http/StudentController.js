'use strict'
const Student = use('App/Models/Student')
class StudentController {
    async index({response}){
        var student = await Student.fetch()
        response.json(student)
    }
    async get({params, response}){
        var studentID = {studentID: parseInt(params.studentID)}
        console.log(studentID)
        const Enrolled = use('App/Models/Enrolled')
        var ret = {
            Student: {},
            Enrolled: []
        }
        var stud = await Student.where(studentID).first()
        var enrolled = await Enrolled.where(studentID).fetch()
        ret.Student = stud
        ret.Enrolled = enrolled
        response.json(ret)
    }

    async add({request, response}){
        var {studentID, student_name, DoB } = request.only(['studentID', 'student_name', 'DoB'])
        console.log(typeof studentID+', '+typeof student_name+', '+typeof DoB )
        try{
            var stud = new Student(request.only(['studentID', 'student_name', 'DoB']))
            await stud.save()
        }catch(e){
            console.log(e)
            response.json(e)
        }
        response.json(true)
    }

    async edit({request, response}){
        var {studentID, student_name, DoB } = request.all(['studentID', 'student_name', 'DoB'])
        var stud = await Student.where(
            { studentID:studentID },
            { upsert: true }
        ).update({
            studentID:studentID,
            student_name:student_name,
            DoB: DoB,
            updated_at: new Date
        })
        response.json(stud)
    }
    async delete({request, response}){
        var {studentID } = request.all(['studentID'])
        var stud = await Student.where({ studentID:studentID }).delete()
        response.json(stud)
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
        response.json(student)
    }
}

module.exports = StudentController
