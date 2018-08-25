'use strict'

const Schema = use('Schema')

class EmbedDepartmentSchema extends Schema {
  up () {
    this.create('embed_departments', (table) => {
      // table.increments()
      // table.timestamps()
    })
  }

  down () {
    this.drop('embed_departments')
  }
}

module.exports = EmbedDepartmentSchema
