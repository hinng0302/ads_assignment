'use strict'

const Schema = use('Schema')

class OffersSchema extends Schema {
  up () {
    // this.create('of_offers', (table) => {
    //   table.increments()
    //   table.timestamps()
    // })
    this.create('offers', (collection)=> {
    })
  }

  down () {
    this.drop('offers')
  }
}

module.exports = OffersSchema
