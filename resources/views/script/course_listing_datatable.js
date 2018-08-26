var table = $("#student_listing").DataTable({
    "ajax": "/course",
    "searching": false,
    "columns": [
        {data:'CourseID'},
        {data:'Title'},
        {data:'Level'},
        {data:'created_at'},
        {data:'updated_at'},
        {
            data: 'Action',
            "defaultContent": "<i class=\"far fa-edit\" style=\"cursor: pointer;\"></i> / <i class=\"far fa-trash-alt button\" style=\"cursor: pointer;\"></i>",
            "targets": -1
        }
    ],
})

$("#student_listing").on('click', 'i.far.fa-edit', function(){
    var data = table.row( $(this).parents('tr') ).data()
    var studentID = data['CourseID']
    window.location = '/front/course/edit/'+studentID
})

$("#student_listing").on('click', 'i.fa-trash-alt', function(){
    var data = table.row( $(this).parents('tr') ).data()
    var studentID = data['CourseID']
    $.ajax({
        url: '/course',
        type: 'DELETE',
        data: JSON.stringify({
            "CourseID": studentID
        }),
        headers: {
            "Content-Type": "application/json",
            "accept": 'application/json'
        },
        success: function(data){
            window.location = "/front/course/listing"
        }
    })
})

$("#student_listing").on('click', 'tr', function(){
    var row = table.row( this ).data()
    var CourseID = row['CourseID']
    window.location = '/front/course/details/'+CourseID
})
