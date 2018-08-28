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
        query = {}
        if(courseID != ''){
            query={...query, ...{"CourseID": courseID}}
        }
        if(yearselect != null){
            query={...query, ...{"Year": parseInt(yearselect)}}
        }
        if(DeptID != ''){
            query={...query, ...{"DeptID": DeptID}}
        }
        if(stud_id.length > 0){
            query={...query, ...{studentID:{"$in": stud_id}}}
        }
        console.log(query)
        var enrolled = await Enrolled.where(query).fetch()
        enrolled = enrolled.toJSON()
        console.log(enrolled)
        query = {...query, ...{"Enrolled": enrolled}}
        response.json(query)
    }
}

module.exports = SearchController
