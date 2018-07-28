'use strict'

const Schema = use('Schema')

class CoursesSchema extends Schema {
  up () {
    // this.create('courses', (table) => {
    //   table.increments()
    //   table.timestamps()
    // })
    this.create('courses', (collection)=> {
    })
  }

  down () {
    this.drop('courses')
  }
}

module.exports = CoursesSchema
