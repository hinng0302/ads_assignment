// $(document).ready(function(){
var table = $("#student_listing").DataTable({
    // "processing": true,
    // "serverSide": true,
    "ajax": "/student",
    "columns": [
        {data:'studentID'},
        {data:'student_name'},
        {data:'DoB'},
        {data:'created_at'},
        {data:'updated_at'},
        {
            data: 'Edit',
            "defaultContent": "<button type='Edit' class='btn btn-xs btn-warning btn-block'>Edit</button>",
            "targets": -1
        },
        {
            data: 'Delete',
            "defaultContent": "<button id='Delete' class='btn btn-xs btn-danger btn-block'>Delete</button>",
            "targets": -1
        }
    ],
})

$("#student_listing").on('click', 'button.btn-warning', function(){
    var data = table.row( $(this).parents('tr') ).data()
    var studentID = data['studentID']
    window.location = '/front/student/edit/'+studentID
})
$("#student_listing").on('click', 'button.btn-danger', function(){
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