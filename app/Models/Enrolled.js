'use strict'

const Model = use('Model')

class Enrolled extends Model {
    // static get hidden(){
    //     return ['_id', 'Enrolled']
    // }
    Departments() {
        return this.morphMany('App/Models/Department', 'DeptID', '_id')
    }
}

module.exports = Enrolled
