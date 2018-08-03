'use strict'

const Model = use('Model')

class Offer extends Model {
    Courses(){
        return this.embedsMany('App/Models/Course', 'CourseID', 'CourseID')
    }
}

module.exports = Offer
