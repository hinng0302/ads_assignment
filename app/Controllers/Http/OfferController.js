'use strict'
const Env = use('Env')
const got = use('got')
const Offer = use('App/Models/Offer')
class OfferController {
    async add({request, response}){
        const {Dept_id, CourseID, Year, ClassSize} = request.only(['Dept_id', 'CourseID', 'Year', 'ClassSize'])
        console.log(request.all())
        var ret = {}
        try{
            console.log(Dept_id+", "+CourseID+", "+Year+", "+ClassSize)
            var object = {
                Dept_id: Dept_id,
                CourseID: CourseID,
                Year: parseInt(Year),
                ClassSize: parseInt(ClassSize),
                AvaliablePlaces: parseInt(ClassSize)
            }
            console.log(object)
            var offer = new Offer(object)
            await offer.save()
            await got(Env.get('DEFAULT_DOMAIN')+'/update/course/'+CourseID)
            console.log(Env.get('DEFAULT_DOMAIN')+'/update/course/'+CourseID)
            await got(Env.get('DEFAULT_DOMAIN')+'/update/dept/'+Dept_id)
            console.log(Env.get('DEFAULT_DOMAIN')+'/update/dept/'+Dept_id)
            ret = {
                success: true
            }
        }catch(error){
            ret = {
                error: error
            }
        }
        response.json(ret)
    }
    async get({response}){
        var offer= await Offer.fetch()
        offer = offer.toJSON()
        response.json(offer)
    }

    /*
    async search1({request, response}){
        var {year, deptID} = request.only(['year', 'deptID'])
        year = parseInt(year)
            var offer= await Offer
            .where(
                    {
                        Dept_id: deptID1,
                        Year: year1    
                    }                           
            )
            .fetch()
        response.json(offer)
    }   
    */
    
    async search({params, response}){
        const Offer = use('App/Models/Offer')
        const Department = use('App/Models/Department')
        const EmbedDepartment = use('App/Models/EmbedDepartment')
        var query = {Year: params.Year, Dept_id: params.DeptID}
        var department = await Department.fetch()
        department = department.toJSON()
        var ret = {}
        if(department.length > 0){
            department = await Department.fetch()
            department = department.toJSON()
            //var _id = []
            // for(var dept of department){
                //_id = department._id
            // }
           // console.log(_id)
            var offer = await Offer.where(query).fetch()
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
            await Department.where().delete()

        }
        response.json(ret)
    }    

    async delete({request, response}){
        var {_id} = request.all(['_id'])
        var offer = await Offer.where({_id:_id}).delete()
        response.json(offer)
    }
}

module.exports = OfferController
