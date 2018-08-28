'use strict'

class UpdateController {
    async update_students({params, response}){
        const Student = use('App/Models/Student')
        const Enrolled = use('App/Models/Enrolled')
        const Department = use('App/Models/Department')
        const EmbedStudent = use('App/Models/EmbedStudent')
        var studentID = {studentID: params.studentID}
        var stud, enrolled, dept
        try {
            stud = await Student.where(studentID).first()
            stud = stud.toJSON()
            console.log(stud)
            if(stud.length == 0){
                response.json({error: 'record Not Found'})
            }
            enrolled = await Enrolled.where(studentID).fetch()
            enrolled = enrolled.toJSON()
            dept = await Department.fetch()
            dept = dept.toJSON()    
        } catch (error) {
            response.json({error: 'record Not Found'})
        }
        
        var ret = {}
        ret.Student = stud
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
        var student = {}
        
        query = {
            studentID: params.studentID,
        }
        console.log(query)
        try{
            student = await EmbedStudent.where(query).first()
            student = student.toJSON()
        }catch(e){
            student = {
                error: 'record Not Found'
            }
        }
        
        response.json(student)
    }

    async update_course({params, response}){
        const Offer = use('App/Models/Offer')
        const Course = use('App/Models/Course')
        const Student = use('App/Models/Student')
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
            var students = await Student.fetch()
            students = students.toJSON()
            course_obj = course_obj.toJSON()
            offer = offer.toJSON()
            enrolled = enrolled.toJSON()
            for(var i= 0; i< offer.length ; i ++){
                var each_offer = offer[i]
                // let AvaliablePlaces = each_offer.AvaliablePlaces
                if(offer[i].Dept_id != null){
                    offer[i].DeptID=offer[i].Dept_id
                }
                for(var j=0; j<enrolled.length ; j++){
                    var eachenrolled = enrolled[j]
                    for(let student of students){
                        if(student.studentID == eachenrolled.studentID){
                            var stud = await Student.where({studentID:student.studentID}).first()
                            stud=stud.toJSON()
                            enrolled[i].student_name = stud.student_name
                        }
                    }
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
        var emb_course = {}
        try {
            emb_course = await EmbedCourse.where(query).first()
            emb_course = emb_course.toJSON()
        } catch (error) {
            emb_course = {
                error: 'Not Found'
            }
        }
        
        response.json(emb_course)
    }

    async update_dept({params, response}){
        const Offer = use('App/Models/Offer')
        const Department = use('App/Models/Department')
        const EmbedDepartment = use('App/Models/EmbedDepartment')
        var query = { DeptID: params.DeptID}
        var department = await Department.where(query).fetch()
        department = department.toJSON()
        var ret = {}
        if(department.length > 0){
            department = await Department.where(query).first()
            department = department.toJSON()
            var _id = []
            // for(var dept of department){
                _id = department._id
            // }
            console.log(_id)
            var offer = await Offer.where({"Dept_id": params.DeptID}).fetch()
            offer = offer.toJSON()
            ret = {
                Department: department,
                Offer: offer
            }
            ret = ret
            ret = {...query, ...ret}
            var embeddepar = new EmbedDepartment(ret)
            await embeddepar.save()
        } else {
            await Department.where(query).delete()

        }
        response.json(ret)
    }
    async getDept({params, response}){
        const EmbedDepartment = use('App/Models/EmbedDepartment')
        var query = { DeptID: params.DeptID}
        var emb_course = {}
        try {
            emb_course = await EmbedDepartment.where(query).first()
            emb_course = emb_course.toJSON()
        } catch (error) {
            emb_course = {
                error: 'Not Found'
            }
        }
        
        response.json(emb_course)                
    }
}

module.exports = UpdateController
