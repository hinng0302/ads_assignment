'use strict'

class UpdateController {
    async update_students({params, response}){
        const Student = use('App/Models/Student')
        const Enrolled = use('App/Models/Enrolled')
        const Department = use('App/Models/Department')
        const EmbedStudent = use('App/Models/EmbedStudent')
        var studentID = {studentID: params.studentID}
        var stud = await Student.where(studentID).first()
        stud = stud.toJSON()
        var enrolled = await Enrolled.where(studentID).fetch()
        var dept = await Department.fetch()
        dept = dept.toJSON()
        var ret = {}
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
        ret = {...studentID, ...ret}
        // ret = JSON.stringify(ret)
        var count = await EmbedStudent.where(studentID).fetch()
        count = count.toJSON()
        
        if(count.length > 0 ){
            await EmbedStudent.where(studentID).delete()
        }
        console.log(ret)
        var emb = new EmbedStudent(ret)
        await emb.save()
        response.json(ret)
    }
    
    async getStudents({params, response}){
        const EmbedStudent = use('App/Models/EmbedStudent')
        var query = {studentID: params.studentID}
        console.log(query)
        var student = await EmbedStudent.where(query).first()
        student = student.toJSON()
        response.json(student)
    }

    async update_course({params, response}){
        const Offer = use('App/Models/Offer')
        const Course = use('App/Models/Course')
        const Enrolled = use('App/Models/Enrolled')
        const EmbedCourse = use('App/Models/EmbedCourse')
        var ret = {}
        var query = {CourseID: params.CourseID}
        console.log(query)
        var course = await Course.where(query).fetch()
        course = course.toJSON()
        if(course.length != 0){
            var course_obj = await Course.where(query).first()
            var offer = await Offer.where(query).fetch()
            var enrolled = await Enrolled.where(query).fetch()

            course_obj = course_obj.toJSON()
            offer = offer.toJSON()
            enrolled = enrolled.toJSON()
            for(var i= 0; i< offer.length ; i ++){
                var each_offer = offer[i]
                // let AvaliablePlaces = each_offer.AvaliablePlaces
                for(var j=0; j<enrolled.length ; j++){
                    var eachenrolled = enrolled[j]
                    if(eachenrolled.CourseID == each_offer.CourseID && each_offer.Year == eachenrolled.Year){
                        offer[i].AvaliablePlaces = offer[i].AvaliablePlaces-1
                    }
                }
            }
            ret = {
                course: course_obj,
                offers: offer,
                enrolled: enrolled
            }
            
            ret = {...query, ...ret}
            
            var emb_course = await EmbedCourse.where(query).fetch()
            emb_course = emb_course.toJSON()
            if(emb_course.length > 0){
                await EmbedCourse.where(query).delete()
            }
            console.log(ret)
            var emc = new EmbedCourse(ret)
            await emc.save()
        } else {
            await Course.where(query).delete()
            await Offer.where(query).delete()
            await EmbedCourse.where(query).delete()
            await Enrolled.where(query).delete()
            ret = {}
        }
        response.json(ret)
    }
    async getCourse({params, response}){
        const EmbedCourse = use('App/Models/EmbedCourse')
        var query = {CourseID: params.CourseID}
        var emb_course = await EmbedCourse.where(query).first()
        response.json(emb_course)
    }
}

module.exports = UpdateController
