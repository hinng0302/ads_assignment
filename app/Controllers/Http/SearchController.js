'use strict'

class SearchController {
    async searchEnrolled({request, response}){
        var stud_id = [], query = {}
        const {studentName}=request.all(['studentName'])
        if(studentName != ''){
            query = {
                student_name: studentName
            }
            const Student = use('App/Models/Student')
            var students = await Student.where(query).fetch()
            students = students.toJSON()
            for(let stud of students){
                stud_id.push(stud.studentID)
            }
        }
        const Enrolled = use('App/Models/Enrolled')
        const { courseID, yearselect, DeptID} = request.all(['courseID', 'yearselect', 'DeptID'])
        query = {
            courseID: courseID,
            Year: parseInt(yearselect),
            DeptID: DeptID
        }
        response.json(query)
    }
}

module.exports = SearchController
