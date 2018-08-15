'use strict'

const Schema = use('Schema')

class EnrolledSchema extends Schema {
  up () {
    this.create('enrolleds', (collection) => {
      // table.increments()
      // table.timestamps()

    })
  }

  down () {
    this.drop('enrolleds')
  }
}

module.exports = EnrolledSchema
