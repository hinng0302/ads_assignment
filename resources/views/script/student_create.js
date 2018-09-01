$(document).ready(function(){
    $("#createButton").on('click',function(){
        var StudentId = $("#StudentId").val()
        var StudentName = $("#StudentName").val()
        var DOB = $("#DOB").val()
        if(StudentId == ''){
            alert('StudentID Cannot Empty')
        }else if(StudentName == ''){
            alert('Student Name Cannot Empty')
        } else if(DOB == ''){
            alert('Date of Birth Cannot Empty')
        }else {
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
                    if(data.success == true){
                        window.location = "/front/student/listing"
                    }
                }
            })
        }
    })
})
