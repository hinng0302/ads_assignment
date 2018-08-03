'use strict'

const Model = use('Model')

class Student extends Model {
    // static get primaryKey (){
    //     return 'studentID'
    // }
    static get hidden(){
        return ['_id', 'Enrolled']
    }
}

module.exports = Student
