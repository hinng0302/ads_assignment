'use strict'
const Env = use('Env')
const got = use('got')
const Offer = use('App/Models/Offer')
class OfferController {
    async add({request, response}){
        const {Dept_id, CourseID, Year, ClassSize} = request.all(['Dept_id', 'CourseID', 'Year', 'ClassSize'])
        try{
            var offer = new Offer(request.all(['Dept_id', 'CourseID', 'Year', 'ClassSize']))
            await offer.save()
            await got(Env.get('DEFAULT_DOMAIN')+'/upate/course/'+CourseID)
            await got(Env.get('DEFAULT_DOMAIN')+'/upate/dept/'+Dept_id)
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
}

module.exports = OfferController
