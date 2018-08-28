'use strict'
const Env = use('Env')
const got = use('got')
const Enrolled = use('App/Models/Enrolled')

class EnrolledController {
    // async add({request, response}){

    // }
    async get({response}){
        var enrolled = await Enrolled.fetch()
        response.json(enrolled)
    }
}

module.exports = EnrolledController
