'use strict'

const Schema = use('Schema')

class EmbedCourseSchema extends Schema {
  up () {
    this.create('embed_courses', (table) => {
      // table.increments()
      // table.timestamps()
    })
  }

  down () {
    this.drop('embed_courses')
  }
}

module.exports = EmbedCourseSchema
