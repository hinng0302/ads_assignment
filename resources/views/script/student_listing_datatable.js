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
            "defaultContent": "<button id='Delete' class='btn btn-xs btn-delete btn-block'>Delete</button>",
            "targets": -1
        }
    ],
    // "column": [
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     {
    //         "data": null,
    //         "defaultContent": "<button>Edit</button>",
    //         "targets": -1
    //     }
    // ]
})
// var table = $('#myTable').DataTable();
// })