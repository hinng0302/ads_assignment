var table = $("#student_listing").DataTable({
    "searching": false,
    "ajax": "/student",
    "columns": [
        {data:'studentID'},
        {data:'student_name'},
        {data:'DoB'},
        {data:'created_at'},
        {data:'updated_at'},
        {
            data: 'Action',
            "defaultContent": "<i class=\"far fa-edit\"  style=\"cursor: pointer;\"></i> / <i class=\"far fa-trash-alt button\" style=\"cursor: pointer;\"></i>",
            "targets": -1
        },
    ],
})
$("#student_listing tbody").on('click', 'tr', function(){
    var row = table.row( this ).data()
    var studentID = row['studentID']
    window.location = '/front/student/details/'+studentID
})
$("#student_listing").on('click', 'i.fa-edit', function(){
    var data = table.row( $(this).parents('tr') ).data()
    var studentID = data['studentID']
    window.location = '/front/student/edit/'+studentID
})
$("#student_listing").on('click', 'i.fa-trash-alt', function(){
    var data = table.row( $(this).parents('tr') ).data()
    var studentID = data['studentID']
    $.ajax({
        url: '/student',
        type: 'DELETE',
        data: JSON.stringify({
            "studentID": studentID
        }),
        headers: {
            "Content-Type": "application/json",
            "accept": 'application/json'
        },
        success: function(data){
            window.location = "/front/student/listing"
        }
    })

})