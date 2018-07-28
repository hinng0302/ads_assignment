'use strict'
const Course = use('App/Models/Course')
class CourseController {
    async index({response}){
        var course = await Course.fetch()
        response.json(course)
    }
    async offerby_dept({params,response}){
        var depart_code = params.depart_code
        var year = parseInt(params.year)
        var course = await Course.where({Offer:{$elemMatch:{Dept_id: depart_code, Year: year}}}).fetch()
        // console.log(Course.where({Offer:{$elemMatch:{Dept_id: depart_code, Year: year}}}).toSQL())
        response.json(course)
    }

    async offerby_dept_or({params,response}){
        var depart_code1 = params.depart_code1
        var depart_code2 = params.depart_code2
        var year = parseInt(params.year)
        var course = await Course.where({Offer:{$elemMatch:{Year: year, $or:[{Dept_id: depart_code1}, {Dept_id: depart_code2}]}}}).fetch()
        // console.log(Course.where({Offer:{$elemMatch:{Year: year, $or:[{Dept_id: depart_code1}, {Dept_id: depart_code2}]}}}).toSQL())
        response.json(course)
    }
}

module.exports = CourseController
