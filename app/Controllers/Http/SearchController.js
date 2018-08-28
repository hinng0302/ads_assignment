'use strict'

class SearchController {
    async searchEnrolled({request, response}){
        var stud_id = [], query = {}
        const Course = use('App/Models/Course')
        const Student = use('App/Models/Student')
        const {studentName}=request.all(['studentName'])
        if(studentName != ''){
            query = {
                student_name: studentName
            }
            
            var students = await Student.where(query).fetch()
            students = students.toJSON()
            for(let stud of students){
                stud_id.push(stud.studentID)
            }
        }
        const Enrolled = use('App/Models/Enrolled')
        const { courseID, yearselect, DeptID} = request.all(['courseID', 'yearselect', 'DeptID'])
        query = {}
        const {studentID} = request.all(['studentID'])
        if(studentID != null){
            stud_id.push(studentID)
        }
        if(courseID != null){
            query={...query, ...{"CourseID": courseID}}
        }
        if(yearselect != null){
            query={...query, ...{"Year": parseInt(yearselect)}}
        }
        if(DeptID != null){
            query={...query, ...{"DeptID": DeptID}}
        }
        if(stud_id.length > 0){
            query={...query, ...{studentID:{"$in": stud_id}}}
        }
        console.log(query)
        var enrolled = await Enrolled.where(query).fetch()
        enrolled = enrolled.toJSON()
        for(let enroll of enrolled){
            var student = await Student.where({studentID: enroll.studentID}).first()
            console.log({"CourseID":enroll.CourseID})
            var course = await Course.where({CourseID:enroll.CourseID}).first()
            console.log(course)
            enroll.course_name = course.Title
            enroll.student_name = student.student_name
        }
        query = {...query, ...{"Enrolled": enrolled}}
        response.json(query)
    }
}

module.exports = SearchController
