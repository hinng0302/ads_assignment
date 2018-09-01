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
        {
            data:'DeptName',
            render: function(data, type, full, meta){
                return '<a href="/front/department/details/'+full.DeptID+'">'+full.DeptName+'</a>'
            }
        },
        {data:'Location'},
        {data:'created_at'},
        {data:'updated_at'},
        {
            data: 'Action',
            "defaultContent": "<i class=\"far fa-edit\" style=\"cursor: pointer;\"></i>",
            "targets": -1
        }
    ],
})

$("#student_listing").on('click', 'i.fa-edit', function(){
    var data = table.row( $(this).parents('tr') ).data()
    var DeptID = data['DeptID']
    window.location = '/front/department/edit/'+DeptID
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