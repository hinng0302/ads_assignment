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
    ]
})
// var table = $('#myTable').DataTable();
// })