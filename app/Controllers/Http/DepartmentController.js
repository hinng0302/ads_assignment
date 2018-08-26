'use strict'
const got = use('got')
const Department = use('App/Models/Department')
class DepartmentController {
    async index({response}){
        var Dep = await Department.fetch()
        response.json({data:Dep})
    }
    async add({request, response}){
        var DeptID = request.only(['DeptID'])
        console.log(DeptID)
        var ret = {}
        var count = await Department.where({ DeptID: DeptID}).fetch()
        count = count.toJSON()
        if(count.length == 0){
            var department = new Department(request.only(['DeptID', 'DeptName', 'Location']))
            await department.save()
            ret = {
                success: true
            }
            await got('http://40.74.84.116'+ '/update/department/'+DeptID)
        }else {
            ret = {
                error: 'DeptID already exists'
            }
        }
        response.json(ret)
    }
    async edit({request, response}){
        var ret = {}
        var {DeptID, DeptName, location} = request.only(['DeptID', 'DeptName', 'Location'])
        var department = await Department.where({
            DeptID: DeptID
        }).update({
            DeptID: DeptID,
            DeptName: DeptName, 
            Location: location
        })
        department.toJSON()
        if(department['mModified'] == 1){
            ret = {
                success: true
            }
            await got('http://40.74.84.116'+ '/update/department/'+DeptID)
        } else {
            ret = {
                success: false
            }
        }
        response.json(ret)
    }

    async department_corse({request, response}){
        var department = await Department.with('Offers').fetch()
        console.log(Department.with('Offers').toSQL())
        response.json(department)
    }
}

module.exports = DepartmentController
