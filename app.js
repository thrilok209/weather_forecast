$(document).ready(function () {
  $('#disname').hide();
  $('#weatable').hide();
  $('#foretable').hide();
  $('tbody>tr').remove();
  var i = 0;
      $('#weathersub').click(function(){
        var cityName = $('#Cityname').val();
        $('tbody#weatherdel>tr').remove();
          if(cityName==''){
            $('#disname').show();
            document.getElementById("disname").innerHTML="Please enter the city name";
          }

          var urlReq = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=2fefb549a19a1115cae6f75ba75d652e'
          $.ajax({
            url: urlReq,

              error: function() {
                // document.getElementById("disname").innerHTML="error";
              },

              success: function(data) {

                var date=new Date(data.dt*1000);
                var dateStr=date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
                var Temp = Math.round((data.main.temp-273.5)*100)/100 + ' &#x2103';
                var humidity = data.main.humidity;
                var description = data.weather[0].description;
                var innerHtml = '<tr><td>'+dateStr+'</td><td>'+Temp+'</td><td>'+humidity+'</td><td>'+description+'</td></tr>';
                $('tbody#weatherdel').append(innerHtml)
                document.getElementById("disname").innerHTML="Weather details from "+cityName+","+data.sys.country;
                $('#disname').show();
                $('#weatable').show();
              },
            });
          });

        $('#forecastsub').click(function(){
          console.log("1");
          var dayS=  $('#foredays').val();

          console.log(i);
          var cityName = $('#Cityname').val();
            if(cityName==''){
              document.getElementById("disname").innerHTML="Please enter the city name";
                 $('#disname').show();
            }
            if(dayS==''){
              document.getElementById("disname").innerHTML="Please select number of days to forecast";
                 $('#disname').show();
            }
             $('tbody#forecastdel>tr').remove();
            var urlReq = 'https://api.openweathermap.org/data/2.5/forecast/daily?q='+cityName+'&appid=2fefb549a19a1115cae6f75ba75d652e&cnt='+dayS
            $.ajax({
              url: urlReq,

                error: function() {
                  // document.getElementById("disname").innerHTML="error";
                },

                success: function(data) {
                  forecast();
                  function forecast() {

                    for(i=0;i<dayS;i++){

                      var date=new Date(data.list[i].dt*1000);
                      var dateStr=date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
                      var maTemp = Math.round((data.list[i].temp.max-273.5)*100)/100 + ' &#x2103';
                      var miTemp = Math.round((data.list[i].temp.min-273.5)*100)/100 + ' &#x2103';
                      var humidity = data.list[i].humidity;
                      var description = data.list[i].weather[0].description;
                      var innerHtml = '<tr><td>'+dateStr+'</td><td>'+maTemp+'</td><td>'+miTemp+'</td><td>'+humidity+'</td><td>'+description+'</td></tr>';
                      $('tbody#forecastdel').append(innerHtml);
                      document.getElementById("nodays").innerHTML="Weather Forecasted for "+dayS+" days"
                      document.getElementById("disname").innerHTML="Weather details from "+cityName+","+data.city.country;
                      $('#disname').show();
                      $('#foretable').show();


                    }

                    return;
                    }


                },
              });

        });




});
