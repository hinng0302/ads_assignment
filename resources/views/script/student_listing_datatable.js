// $(document).ready(function(){
var table = $("#student_listing").DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": "http://223.17.69.134/student",
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