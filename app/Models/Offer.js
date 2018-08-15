'use strict'

const Model = use('Model')

class Offer extends Model {
    offer_course(){
        return this.referMany('App/Models/Department', '_id', 'DeptID')
    }

    Course(){
        return this.embedsOne('App/Models/Course', 'CourseID', 'CourseID')
    }
}

module.exports = Offer
