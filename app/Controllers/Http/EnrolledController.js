"use strict"
const Env = use("Env")
const got = use("got")
const Enrolled = use("App/Models/Enrolled")

class EnrolledController {
    async add({request, response}){
        var {studentID, CourseID, Year, DeptID} = request.all(["studentID", "CourseID", "Year", "DeptID"])
        var query = {
            studentID: studentID,
            CourseID: CourseID,
            Year: parseInt(Year),
            DeptID: DeptID
        }
        console.log(query)
        var ret = {}
        var enrolled = await Enrolled.where(query).fetch()
        enrolled = enrolled.toJSON()
        if(enrolled.length == 0){
            enrolled = new Enrolled(query)
            await enrolled.save()
            ret = {
                success: enrolled
            }
            console.log(Env.get("DEFAULT_DOMAIN")+"/update/student/"+studentID)
            console.log(Env.get("DEFAULT_DOMAIN")+"/update/course/"+CourseID)
            await got(Env.get("DEFAULT_DOMAIN")+"/update/student/"+studentID)
            await got(Env.get("DEFAULT_DOMAIN")+"/update/course/"+CourseID)
            
        } else {
            ret ={
                error: "already exists"
            }
        }
        response.json(ret)
    }
    async get({response}){
        var enrolled = await Enrolled.fetch()
        response.json(enrolled)
    }
    async delete({request, response}){
        var {studentID, CourseID, Year, DeptID} = request.all(["studentID", "CourseID", "Year", "DeptID"])
        var query = {
            studentID: studentID,
            CourseID: CourseID,
            Year: parseInt(Year),
            DeptID: DeptID
        }
        
        var ret = {}
        var enrolled = await Enrolled.where(query).fetch()
        enrolled = enrolled.toJSON()
        if(enrolled.length == 0){
            ret = {
                error: "record not exists"
            }
        } else {
            enrolled = await Enrolled.where(query).delete()
            ret = enrolled
        }
        response.json(ret)
    }
    async studentCount({params, response}){
        var studentID = params.studentId
        var query = {
            studentID: studentID
        }
        console.log(query)
        var enrolled_count =await Enrolled.where(query).fetch()
        enrolled_count=enrolled_count.toJSON()
        var ret = {
            student_count: enrolled_count.length
        }
        response.json(ret)
    }
}

module.exports = EnrolledController
