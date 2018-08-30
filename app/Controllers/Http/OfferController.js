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

    async search({response}){
        var {year1, deptID1, year2, deptID2} = request.only(['year1', 'deptID1', 'year2', 'deptID2'])
        year1 = parseInt(year1)
        year2 = parseInt(year2)

        if (year2 != "" && deptID2 != "") {
            var offer= await Offer
            .where({
                $or: [
                    {
                        DeptId: deptID1,
                        Year: year1    
                    },
                    {
                        DeptId: deptID2,
                        Year: year2    
                    }                            
                ]
            })
            .fetch()
        }   else {
            var offer= await Offer
            .where({
                    DeptId: deptID1,
                    Year: year1                                                   
            })
            .fetch()            
        }


        response.json(offer)
    }    

    async delete({request, response}){
        var {_id} = request.all(['_id'])
        var offer = await Offer.where({_id:_id}).delete()
        response.json(offer)
    }
}

module.exports = OfferController
