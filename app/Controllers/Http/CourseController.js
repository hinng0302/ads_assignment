'use strict'
const got = use('got')
const Offer = use('App/Models/Offer')
const Course = use('App/Models/Course')
class CourseController {
    async get({response}){
        var course = await Course.fetch()
        response.json({data:course})
    }

    async add({request, response}){
        var CourseID = request.only(['CourseID'])
        console.log('add Course: '+CourseID.CourseID)
        var ret = {}
        var count = await Course.where({CourseID:CourseID}).fetch()
        count = count.toJSON()
        if(count.length == 0){
            var course = new Course(request.only(['CourseID', 'Title', 'Level']))
            await course.save()
            ret = {
                success: true
            }
            await got('http://40.74.84.116'+ '/update/course/'+CourseID.CourseID)
        } else {
            ret = {
                error: 'CourseID already exists'
            }
        }
        response.json(ret)
    }

    async edit({request, response}){
        var ret = {}
        var {CourseID, Title, Level } = request.all(['CourseID', 'Title', 'Level'])
        var course = await Course.where({
            CourseID: CourseID
        }).update({
            CourseID: CourseID,
            Title: Title, 
            Level: parseInt(Level)
        })
        course.toJSON()
        if(course['mModified'] == 1){
            ret = {
                success: true
            }
        } else {
            ret = {
                success: false
            }
        }
        response.json(ret)
    }

    async delete({request,response}){
        var {CourseID } = request.all(['CourseID'])
        var course = await Course.where({ CourseID:CourseID }).delete()
        await got('http://40.74.84.116'+ '/update/course/'+CourseID)
        response.json(course)
    }

    async CourseDetails({params, response}){
        var CourseID = params.CourseID
        var ret = {}
        var course = await Course.where({CourseID:CourseID}).fetch()
        course = course.toJSON()
        if(course.length != 0){
            var course_obj = await Course.where({CourseID:CourseID}).first()
            var offer = await Offer.where({CourseID:CourseID}).fetch()
            ret = {
                course: course_obj,
                offers: offer
            }
        }else {
            ret = {
                error: 'unable to find Course Details'
            }
        }
        response.json(ret)
    }

    async index2({response}){
        var csdefault = 'CS'
        var year = 2016
        const Offer = use('App/Models/Offer')
        // var enrolled = await Database.collection('Enrolled').where([
        var offer = await Offer.with('Courses')
            .where({DeptID:csdefault, Year: year})
            .fetch()
            
        response.json(offer)
    }

    async offerby_dept({params,response}){
        var depart_code = params.depart_code
        var year = parseInt(params.year)
        var course = await Course.aggregate({Offer:{$elemMatch:{DeptID: depart_code, Year: year}}}).fetch()
        // console.log(Course.where({Offer:{$elemMatch:{Dept_id: depart_code, Year: year}}}).toSQL())
        response.json(course)
    }

    async offerby_dept_or({params,response}){
        var depart_code1 = params.depart_code1
        var depart_code2 = params.depart_code2
        var year = parseInt(params.year)
        var course = await Course.where({Offer:{$elemMatch:{Year: year, $or:[{DeptID: depart_code1}, {DeptID: depart_code2}]}}}).fetch()
        // console.log(Course.where({Offer:{$elemMatch:{Year: year, $or:[{Dept_id: depart_code1}, {Dept_id: depart_code2}]}}}).toSQL())
        response.json(course)
    }

    async popular({response}){
        var enrolled = await enrolled.aggregate([
            {
                "$group":{
                    _id: '$CourseID',
                    count: { $sum: 1 }
                }
            }
        ]).fetch()
        enrolled = enrolled.toJSON()
        var maxCount = 0
        var courseID = ''
        for(var enroll of enrolled){
            if(enroll['count'] > maxCount) {
                maxCount = enroll['count']
                courseID = enroll['_id']
            }
        }
        console.log(courseID)
        var course = await Course.where({CourseID: courseID}).fetch()
        response.json({data: course})
    }

    async popular2({response}){
        // const EmbedCourse = use('App/Models/EmbedCourse')
        // var result = await EmbedCourse.fetch()
        // .count({'$size':'enrolled'})
        const Database = use('Database')
        const mongoClient = await Database.connect()
        var result = await mongoClient.collection('embed_courses').aggregate([
            {
                $project:{ 
                    CourseID: "$CourseID",
                        course: "$course",
                        offers: "$offers",
                        created_at: "$created_at",
                        updated_at: "$updated_at",
                    enrolled_count: {
                        $size: { "$ifNull": [ "$enrolled", [] ]} 
                    } 
                }
                },
            {   
                $sort: {"enrolled_count":-1} 
            }

        ]).toArray()

        response.json({data: result})
    }
}

module.exports = CourseController
