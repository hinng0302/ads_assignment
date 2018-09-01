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

$("#student_listing tbody").on('click', 'tr', function(){
    var row = table.row( this ).data()
    var CourseID = row['CourseID']
    window.location = '/front/course/details/'+CourseID
})
