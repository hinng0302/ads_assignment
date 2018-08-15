'use strict'

const Model = use('Model')

class Department extends Model {
    Offers(){
        return this.morphMany('App/Models/Offer', 'DeptID', 'DeptID')
    }
    
}


module.exports = Department
