'use strict'
const Course = use('App/Models/Course')
class CourseController {
    async index({response}){
        var course = await Course.fetch()
        response.json(course)
    }
}

module.exports = CourseController
