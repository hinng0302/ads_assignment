'use strict'
const Course = use('App/Models/Course')
class CourseController {
    async index({response}){
        var course = await Course.fetch()
        response.json(course)
    }
    async offerby_dept({params,response}){
        var depart_code = params.depart_code
        var course = await Course.where({Offer:{$elemMatch:{Dept_id: depart_code}}}).fetch()
        response.json(course)
    }
}

module.exports = CourseController
