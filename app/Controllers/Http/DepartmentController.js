'use strict'
const Department = use('App/Models/Department')
class DepartmentController {
    async index({response}){
        var Dep = await Department.fetch()
        response.json(Dep)
    }
}

module.exports = DepartmentController
