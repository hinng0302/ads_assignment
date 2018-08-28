'use strict'
const Env = use('Env')
const got = use('got')
const Enrolled = use('App/Models/Enrolled')

class EnrolledController {
    async add({request, response}){
        var {studentID, CourseID, Year, DeptID} =request.all(['studentID', 'CourseID', 'Year', 'DeptID'])
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
            ret = new Enrolled(query)
            await ret.save()
            ret = {
                success: true
            }
            await got(Env.get('DEFAULT_URL')+'/update/student/'+studentID)
            await got(Env.get('DEFAULT_URL')+'/update/course/'+CourseID)
        } else {
            ret ={
                error: 'already exists'
            }
        }
        response.json(ret)
    }
    async get({response}){
        var enrolled = await Enrolled.fetch()
        response.json(enrolled)
    }
    async delete({request, response}){
        var {studentID, CourseID, Year, DeptID} = request.all(['studentID', 'CourseID', 'Year', 'DeptID'])
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
                error: 'record not exists'
            }
        } else {
            enrolled = await Enrolled.where(query).delete()
            ret = enrolled
        }
        response.json(ret)
    }
}

module.exports = EnrolledController
