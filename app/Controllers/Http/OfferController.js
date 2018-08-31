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
        //offer = offer.toJSON()
        response.json({data:offer})
        //response.json(offer)
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
        var query = {Year: params.Year, Dept_id: params.DeptID}
        var offer= await Offer.where(query).fetch()
        //offer = offer.toJSON()
        response.json({data:offer})
    }    

    async delete({request, response}){
        var {_id} = request.all(['_id'])
        var offer = await Offer.where({_id:_id}).delete()
        response.json(offer)
    }
}

module.exports = OfferController
