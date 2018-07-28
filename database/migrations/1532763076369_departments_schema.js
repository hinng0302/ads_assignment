'use strict'

const Schema = use('Schema')

class DepartmentsSchema extends Schema {
  up () {
    this.create('departments', (collection) => {
    })
    this.create('courses', (collection)=> {
    })
    this.create('students', (collection)=> {
    })
  }

  down () {
    this.drop('departments', 'courses', 'students')
  }
}

module.exports = DepartmentsSchema
