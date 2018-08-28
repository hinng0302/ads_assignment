'use strict'
const Env = use('Env')
const got = use('got')
const Offer = use('App/Models/Offer')
class OfferController {
    async add({request, response}){
        const {Dept_id, CourseID, Year, ClassSize} = request.only(['Dept_id', 'CourseID', 'Year', 'ClassSize'])
        console.log(Dept_id+", "+CourseID+", "+Year+", "+ClassSize)
        var ret = {}
        try{
            var object = {
                Dept_id: Dept_id,
                CourseID: CourseID,
                Year: parseInt(Year),
                ClassSize: parseInt(ClassSize),
                AvaliablePlaces: parseInt(AvaliablePlaces)
            }
            console.log(object)
            // var offer = new Offer(object)
            // await offer.save()
            // await got(Env.get('DEFAULT_DOMAIN')+'/upate/course/'+CourseID)
            // console.log(Env.get('DEFAULT_DOMAIN')+'/upate/course/'+CourseID)
            // await got(Env.get('DEFAULT_DOMAIN')+'/upate/dept/'+Dept_id)
            // console.log(Env.get('DEFAULT_DOMAIN')+'/upate/dept/'+Dept_id)
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
        response.json(offer)
    }
    async delete({params, response}){
        var offer = await Offer.find(params._id).delete()
        response.json(offer)
    }
}

module.exports = OfferController
