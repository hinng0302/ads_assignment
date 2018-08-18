'use strict'
const Student = use('App/Models/Student')
const Department = use('App/Models/Department')
class StudentController {
    async list({response}){
        var student = await Student.fetch()
        var ret = {}
        ret.data = student
        response.json(ret)
    }
    async get({params,request, response}){
        // console.log(request.all())
        var {Year, courseID} = request.all(['Year', 'courseID'])
        console.log(Year+', '+courseID)
        var studentID = {studentID: params.studentID}
        
        const Enrolled = use('App/Models/Enrolled')
        
        var ret = {
            Student: {},
            Enrolled: []
        }

        var stud = await Student.where(studentID).first()
        var enrolled = await Enrolled.where(studentID).fetch()
        var dept = await Department.fetch()
        dept = dept.toJSON()
        ret.Student = stud
        enrolled = enrolled.toJSON()
        for(var enroll of enrolled){
            for(var temp of dept){
                if(temp['_id'] == enroll['DeptID']){
                    enroll['DeptID'] = temp['DeptName']
                }
            }
        }
        ret.Enrolled = enrolled
            // console.log(row)
            // var temp2[temp['_id']] = temp['DeptName']
            // DeptId = { ...DeptId, ...temp}
        // )
        response.json(ret)
    }

    async add({request, response}){
        var {studentID, student_name, DoB } = request.only(['studentID', 'student_name', 'DoB'])
        console.log(typeof studentID+', '+typeof student_name+', '+typeof DoB )
        var ret = false
        try{
            var count = await Student.where({studentID: studentID}).fetch()
            count = count.toJSON()
            count = count.length
            console.log(count)
            if(count == 0){
                var stud = new Student(request.only(['studentID', 'student_name', 'DoB']))
                await stud.save()
                ret = {
                    success: true
                }
            } else {
                ret = {
                    error: 'studentID already exists'
                }
            }
        }catch(e){
            console.log(e)
            ret = false
        }
        response.json(ret)
    }

    async edit({request, response}){
        var ret = {}
        var {studentID, student_name, DoB } = request.all(['studentID', 'student_name', 'DoB'])
        var stud = await Student.where(
            { studentID: studentID },
        ).update({
            student_name:student_name,
            DoB: DoB,
        })
        stud = stud.toJSON()
        if(stud['nModified'] == 1){
            ret['response'] = true
        } else {
            ret['response'] = false
        }
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
