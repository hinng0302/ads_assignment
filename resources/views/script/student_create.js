$(document).ready(function(){
    $("#createButton").on('click',function(){
        var StudentId = $("#StudentId").val()
        var StudentName = $("#StudentName").val()
        var DOB = $("#DOB").val()
        $.ajax({
            url: '/student',
            type: 'PUT',
            data: JSON.stringify({
                "studentID": StudentId,
                "student_name": StudentName,
                "DoB": DOB
            }),
            headers: {
                "Content-Type": "application/json",
                "accept": 'application/json'
            },
            success: function(data){
                // console.log(data)
                // var data = JSON.(data)
                if(data.success == true){
                    window.location = "/front/student/listing"
                }
            }
        })
    })
})