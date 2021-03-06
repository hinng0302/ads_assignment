var table = $("#student_listing").DataTable({
    "ajax": "/department",
    "searching": false,
    "columnDefs": [
        {
            targets: -1,
            className: 'dt-body-right'
        }
      ],
    "columns": [
        {data:'DeptID'},
        {data:'DeptName'},
        {data:'Location'},
        {data:'created_at'},
        {data:'updated_at'},
        {
            data: 'Action',
            "defaultContent": "<i class=\"far fa-edit\" style=\"cursor: pointer;\"></i> / <i class=\"far fa-trash-alt button\" style=\"cursor: pointer;\"></i>",
            "targets": -1
        }
    ],
})

$("#student_listing").on('click', 'i.fa-edit', function(){
    var data = table.row( $(this).parents('tr') ).data()
    var DeptID = data['DeptID']
    window.location = '/front/department/edit/'+DeptID
})

$("#student_listing tbody").on('click', 'tr', function(){
    var row = table.row( this ).data()
    var DeptID = row['DeptID']
    window.location = '/front/department/details/'+DeptID
})

$("#student_listing").on('click', 'i.fa-trash-alt', function(){
    var data = table.row( $(this).parents('tr') ).data()
    var DeptID = data['DeptID']
    $.ajax({
        url: '/department',
        type: 'DELETE',
        data: JSON.stringify({
            "DeptID": DeptID
        }),
        headers: {
            "Content-Type": "application/json",
            "accept": 'application/json'
        },
        success: function(data){
            window.location = "/front/department/listing"
        }
    })
})