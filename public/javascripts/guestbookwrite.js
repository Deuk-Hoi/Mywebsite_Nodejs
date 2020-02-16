$(function(){
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth()+1;
    var day = today.getDate();
    
    today = year + "년" + month + "월" + day + "일";
    console.log(today);
    $("#date").text(today);   
})


function a()
{
    $('#form_submit').submit();
    
}