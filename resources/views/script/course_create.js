$(document).ready(function(){
    $("#createButton").on('click',function(){
        var CourseID = $("#CourseID").val()
        var Title = $("#Title").val()
        var Level = $("#Level").val()
        $.ajax({
            url: '/course',
            type: 'PUT',
            data: JSON.stringify({
                "CourseID": CourseID,
                "Title": Title,
                "Level": Level
            }),
            headers: {
                "Content-Type": "application/json",
                "accept": 'application/json'
            },
            success: function(data){
                if(data.success == true){
                    window.location = '/front/course/listing'
                }
            }
        })
    })
})
