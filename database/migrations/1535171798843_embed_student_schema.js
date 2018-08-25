'use strict'

const Schema = use('Schema')

class EmbedStudentSchema extends Schema {
  up () {
    this.create('embed_students', (table) => {
      // table.increments()
      // table.timestamps()
    })
  }

  down () {
    this.drop('embed_students')
  }
}

module.exports = EmbedStudentSchema
