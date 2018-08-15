$(document).ready(function(){
    $("#createButton").on('click',function(){
        var DeptID = $("#DeptID").val()
        var DeptName = $("#DeptName").val()
        var location = $("#Location").val()
        $.ajax({
            url: '/department',
            type: 'PUT',
            data: JSON.stringify({
                "DeptID": DeptID,
                "DeptName": DeptName,
                "Location": location
            }),
            headers: {
                "Content-Type": "application/json",
                "accept": 'application/json'
            },
            success: function(data){
                if(data.success == true){
                    window.location = '/front/department/listing'
                }
            }
        })
    })
})
