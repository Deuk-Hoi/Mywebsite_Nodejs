var linenum;
    servicekey = "4bppUTzZtqi1tLwhMbLNz36lDIGL%2FETSLGd1dwvigsRy3WZk4ALOuGJZqcyH7ERTJnouGKHO1R8jMpTTQ1VwVA%3D%3D";
    citycode = "34040";
    upname = "";
    uprouteid ="";
    downname = "";
    downrouteid ="";

    function area()
    {
        var area = $("#area").val();
        if(area == 'Cheonan')
        {
            citycode = 34010;
            $('#service').text('천안시 버스 노선 검색 서비스');
        }
        else if(area == 'Asan')
        {
            citycode = 34040;
            $('#service').text('아산시 버스 노선 검색 서비스');
        }
        console.log(area);
    }
    
    function search()
    {
        linenum = $("#inputnum").val();
        count = 0;
        console.log(linenum);

        $.ajax({
            url: "/other/line",
            data: {citycode: citycode, linenum: linenum},
            success: (data) =>{
                var resultObj = JSON.parse(data);
                console.log(resultObj);
                console.log(resultObj.response.body.items.item);
                var Item = resultObj.response.body.items.item;
                if(Item == undefined)
                {
                    alert("요청하신 노선은 없네요 ㅠ");
                    return;
                }
                if(Item.length == undefined)
                {
                    console.log("a");
                    upname = Item.startnodenm;
                    uprouteid = Item.routeid;
                    console.log(upname);
                    $("#up").css("visibility", "visible").val(upname);
                    $("#down").css("visibility", "hidden");
                }
                for(let i = 0; i<Item.length;i++)
                {
                    if(Item[i].routeno == linenum)
                    {
                        console.log(Item[i]);
                        if(count == 0)
                        {
                            console.log("1");
                            uprouteid = Item[i].routeid;
                            upname = Item[i].endnodenm;
                            $("#up").css("visibility", "visible").val(upname+" 방면");
                            count++;
                        }
                        else
                        {
                            console.log("2");
                            downrouteid = Item[i].routeid;
                            downname = Item[i].endnodenm;
                            $("#down").css("visibility", "visible").val(downname+" 방면");
                            count++;
                        }
                        if(count == 2)
                        {
                            return;
                        }
                    }
                    else if((Item[i].routeno != linenum) && (i ==  Item.length-1))
                    {
                        $("#up").css("visibility", "hidden");
                        $("#down").css("visibility", "hidden");
                        alert("요청하신 노선은 없네요 ㅠ");
                        return;
                    }             
                    
                }
            }
        })
    }
    function uproute()
    {
        $.ajax({
            url: "/other/routeid",
            data: {citycode: citycode, routeid: uprouteid},
            success: (data) => {
                var resultObj = JSON.parse(data);
                var Item = resultObj.response.body.items.item;
                var table="<tr><th>No</th><th>Bus Stop Num</th><th>Bus Stop Name</th></tr>";
                for(let i = 0; i<Item.length;i++)
                {
                    
                     table += "<tr><td>"+Item[i].nodeord+"</td><td>"+
                        Item[i].nodeno+"</td><td>"+
                        Item[i].nodenm+"</td></tr>";
                        $("#route")[0].innerHTML = table;
                }

            }
        })
    }
    function downroute()
    {
        $.ajax({
            url: "/other/routeid",
            data: {citycode: citycode, routeid: downrouteid},
            success: (data) => {
                var resultObj = JSON.parse(data);
                var Item = resultObj.response.body.items.item;
                var table="<tr><th>No</th><th>Bus Stop Num</th><th>Bus Stop Name</th></tr>";
                for(let i = 0; i<Item.length;i++)
                {
                    
                     table += "<tr><td>"+Item[i].nodeord+"</td><td>"+
                        Item[i].nodeno+"</td><td>"+
                        Item[i].nodenm+"</td></tr>";
                        $("#route")[0].innerHTML = table;
                }

            }
        })  
    }

    function loadDoc() {
        /*var xhttp = new XMLHttpRequest();
        country = $("#country").val();
        building = $("#building").val();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
          }
        };
        xhttp.open("GET", "http://openapi.epost.go.kr/postal/retrieveLotNumberAdressAreaCdService/retrieveLotNumberAdressAreaCdService/getComplexListAreaCd?ServiceKey=4bppUTzZtqi1tLwhMbLNz36lDIGL%2FETSLGd1dwvigsRy3WZk4ALOuGJZqcyH7ERTJnouGKHO1R8jMpTTQ1VwVA%3D%3D&areaNm="+country+"&searchSe=and&srchwrd="+building, true);
        xhttp.send();*/
        country = $("#country").val();
        building = $("#building").val();
        $.ajax({
            url: "/other/address",
            data: {country: country, building: building},
            success: (data) =>{
                /*var resultObj = JSON.parse(data);
                console.log(resultObj);*/
                console.log(data);
                var resultObj = JSON.parse(data);
                var Item = resultObj.ComplexListResponse.complexListAreaCd;
                //console.log(Item.zipNo._text);
                var table="<tr><th>No</th><th>Post</th><th>Address</th></tr>";
                if(Item.length == undefined)
                {
                    table += "<tr><td>"+Item.no._text+"</td><td>"+
                    Item.zipNo._text+"</td><td>"+
                    Item.adres._text+"</td></tr>";
                    $("#demo")[0].innerHTML = table;    
                }
                else{
                    for(let i = 0; i<Item.length;i++)
                    {
                        table += "<tr><td>"+Item[i].no._text+"</td><td>"+
                        Item[i].zipNo._text+"</td><td>"+
                        Item[i].adres._text+"</td></tr>";
                        $("#demo")[0].innerHTML = table;                        
                    }
                }
               
                /*for(let i = 0; i<Item.length;i++)
                {
                    table += "<tr><td>"+Item.no+"</td><td>"+
                    Item.zipNo._text+"</td><td>"+
                    Item.adres+"</td></tr>";
                    $("#demo")[0].innerHTML = table;                        
                }*/
                
            }
        })
      }
      
      function myFunction(xml) {
        var i;
        var xmlDoc = xml.responseXML;
        var table="<tr><th>No</th><th>Post</th><th>Address</th></tr>";
        var x = xmlDoc.getElementsByTagName("complexListAreaCd");
        for (i = 0; i <x.length; i++) { 
          table += "<tr><td>" +
          x[i].getElementsByTagName("no")[0].childNodes[0].nodeValue +
          "</td><td>" +
          x[i].getElementsByTagName("zipNo")[0].childNodes[0].nodeValue +
          "</td><td>"+
          x[i].getElementsByTagName("adres")[0].childNodes[0].nodeValue +
          "</td></tr>";
        }
        document.getElementById("demo").innerHTML = table;
      }