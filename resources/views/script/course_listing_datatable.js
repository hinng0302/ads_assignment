var table = $("#student_listing").DataTable({
    "ajax": "/course",
    "columns": [
        {data:'CourseID'},
        {data:'Title'},
        {data:'Level'},
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
    var studentID = data['CourseID']
    window.location = '/front/course/edit/'+studentID
})

$("#student_listing").on('click', 'button.btn-danger', function(){
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