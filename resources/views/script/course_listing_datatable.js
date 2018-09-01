var table = $("#student_listing").DataTable({
    "ajax": "/course",
    "searching": false,
    "columns": [
        {data:'CourseID'},
        {
            data:'Title',
            render: function(data, type, full, meta){
                return '<a href="/front/course/details/'+full.CourseID+'">'+full.Title+'</a>'
            }
        },
        {data:'Level'},
        {data:'created_at'},
        {data:'updated_at'},
        {
            data: 'Action',
            "defaultContent": "<i class=\"far fa-edit\" style=\"cursor: pointer;\"></i>",
            "targets": -1
        }
    ],
})

// $("#student_listing").on('click', 'i.far.fa-edit', function(){
//     var data = table.row( $(this).parents('tr') ).data()
//     console.log(data)
//     var CourseID = data['CourseID']
//     window.location = '/front/course/edit/'+CourseID
// })

// $("#student_listing").on('click', 'i.fa-trash-alt', function(){
//     var data = table.row( $(this).parents('tr') ).data()
//     var CourseID = data['CourseID']
//     $.ajax({
//         url: '/course',
//         type: 'DELETE',
//         data: JSON.stringify({
//             "CourseID": CourseID
//         }),
//         headers: {
//             "Content-Type": "application/json",
//             "accept": 'application/json'
//         },
//         success: function(data){
//             window.location = "/front/course/listing"
//         }
//     })
// })

$("#student_listing tbody").on('click', 'tr', function(){
    var row = table.row( this ).data()
    var CourseID = row['CourseID']
    window.location = '/front/course/details/'+CourseID
})
