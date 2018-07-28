'use strict'

const Schema = use('Schema')

class StudentsSchema extends Schema {
  up () {
    // this.create('stodents', (table) => {
    //   table.increments()
    //   table.timestamps()
    // })
    this.create('students', (collection)=> {
    })
  }

  down () {
    this.drop('students')
  }
}

module.exports = StudentsSchema
