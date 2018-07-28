'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Course=use('App/Models/Course')
const Student=use('App/Models/Student')
const Department = use('App/Models/Department')

const Factory = use('Factory')

class DatabaseSeeder {
  async run () {
    await Course.create({
      CourseID: 'CS101',
      Title: 'Introduction to Data Science', 
      Level: 6,
      Offer: [
        {Dept_id: 'cs', Year: 2016, ClassSize: 40, AvaliablePlaces: 40},
      ]
    })
    await Department.create(
      {
        DeptID:'CS', 
        DeptName: 'Computer Science', 
        Location: 'Green Zone'
      })
    await Student.create({
      studentID: 15101010,
      student_name: 'Chan Tai Man',
      DoB: '2009-08-10',
      Enrolled:[
        { DeptId: 'CS', CourseID:'CS101', Year: 2016, EnrolDate: '2016-05-15' }
      ]
    })
  }
}

module.exports = DatabaseSeeder
