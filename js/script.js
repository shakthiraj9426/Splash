/*var elem = document.documentElement;

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  }*/
$(document).ready(function () {


  /*var el = document.documentElement,
        rfs = el.requestFullScreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen;
    rfs.call(el);*/
  




  /* Fallback if internet is slow or 
  image not loaded
  */
  $('.main').css('background-image', 'gradient.png');



  //getting username & theme from the localstorage

  var name = localStorage.getItem('username');
  var theme = localStorage.getItem('theme');

  //if username not present or it has nothing then do this
  if (name == null || name == "") {
    name = "User";
    $('#name').val("");
    document.title = "New Tab";
    $('#message').text("Hi, " + name);


  }
  //else do this
  else {
    $('#name').val(name);
    document.title = 'Hey, ' + name;
    $('#message').text("Hi, " + name);
  }

  //check theme status from local storage

  if (theme == null || theme == 'default') {
    $('#theme').attr('href', 'https://code.getmdl.io/1.3.0/material.teal-green.min.css');
    $('.themes option[value=default]').attr('selected', 'selected');
    $('#heading').css("color", "#80cbc4");
    //$('#search').css('border-color','#80cbc4');
    //$('#key').css('color','#80cbc4');
  } else if (theme == 'purple') {
    $('#theme').attr('href', 'https://code.getmdl.io/1.3.0/material.purple-deep_purple.min.css');
    $('.themes option[value=purple]').attr('selected', 'selected');
    $('#heading').css("color", "#7c4dff");
    //$('#search').css('border-color','#7c4dff');
    //$('#key').css('color','#7c4dff');

  } else if (theme == 'indigo') {
    $('#theme').attr('href', 'https://code.getmdl.io/1.3.0/material.indigo-blue.min.css');
    $('.themes option[value=indigo]').attr('selected', 'selected');
    $('#heading').css("color", "#42a5f5");
    //$('#search').css('border-color','#42a5f5');
    //$('#key').css('color','#42a5f5');
  } else if (theme == 'amber') {

    $('#theme').attr('href', 'https://code.getmdl.io/1.3.0/material.yellow-amber.min.css');
    $('.themes option[value=amber]').attr('selected', 'selected');
    $('#heading').css("color", "#FBC02D");
    //$('#search').css('border-color','#FBC02D');
    //$('#key').css('color','#FBC02D');
  }




  // Function to get quotes from the api using ajax get request


  function getQuote() {
    $.ajax({
      url: 'https://api.quotable.io/random',
      type: 'GET',
      success: function (data) {
        console.log(data);
        $('#quote').html('"' + data['content'] + '-by ' + data['author'] + '"');
        $('#quote').attr('data-clipboard-text', '"' + data['content'] + '-by ' + data['author'] + '"');
      },
      error: function (e) {
        console.log(e);
      }
    })
  }




  /*Function to change Random Background Image*/
  /* This function takes weather description*/
  function getNewBackground(status) {

     //click event ends here

    //change backgroundImage start from here

    $('.main').css('background-image', 'url(https://source.unsplash.com/1920x1366/?' + status + ')');
    //backgroundImage ends from here
    $('#user').html(" Github");


    Mousetrap.bind('ctrl+b', function (e) {
      window.top.location.reload(true);
    });
  }



  //Call the function getQuote() to generate a single quote on every page load
  getQuote();




  //This function makes a clock
  function get_current_time() {
    //Dates
    var day = new Date();
    var hour = "";


    // function to preserve the search engine state using localstorage
    function preserve_engine() {
      var engine = localStorage.getItem('engine');
      if (engine == 'Google' || engine == null) {
        $('.eng option[value=Google]').attr('selected', 'selected');
        $('#key').attr('placeholder', 'Google Search');
        $('#icons').css('color', '#42a5f5');


      } else if (engine == 'stack') {
        $('.eng option[value=stack]').attr('selected', 'selected');
        $('#key').attr('placeholder', 'Stack Search');
        $('#icons').css('color', '#FBC02D');


      } else {
        $('.eng option[value=yt]').attr('selected', 'selected');
        $('#search_icon').text('file_download');
        $('#key').attr('placeholder', 'Youtube video Link:');
        $('#icons').css('color', 'red');

      }



    }

    preserve_engine(); //call this function to preserve engine state



    // This is used to preserve the time format selection using localstorage

    var time_format = localStorage.getItem('time');
    if (time_format == '12' || time_format == null) {
      hour = day.getHours() % 12;
      $('.time option[value=12]').attr('selected', 'selected');
    } else {
      hour = day.getHours();
      $('.time option[value=24]').attr('selected', 'selected');
    }
    console.log(hour); //only for debugging or used for developer


    var minutes = day.getMinutes(); //getting minutes & seconds from day object
    var seconds = day.getSeconds();
    $('#time').html(hour + ":" + minutes + ":" + seconds); // display this in element has id time
  }


  //function to check is this is evening|night|afternoon|morning
  function check_status() {
    var a = new Date();
    var h = a.getHours();
    var status = "";
    var username = localStorage.getItem('username');
    if (username == null) {
      username = "";
    }
    if (h <= 11) {
      status = "Morning " + username;
      $('#greets').html("Good," + status);
      $('#bar').css('background-color','#ffffff');
      $('img').css('border-color','#000000');
      $('a').css('color','#1d1d1d');
    } else if (h >= 12 && h <= 16) {
      status = "Afternoon " + username;
      $('#greets').html('Good,' + status);
    } else if (h >= 16 && h <= 19) {
      status = "Evening " + username;
      $('#greets').html('Good,' + status);

    } else if (h >= 20 && h <= 23) {
      status = "Night " + username;
      $('#greets').html('Good,' + status);
      $('#bar').css('background-color','#1d1d1d');
    }


  }

  check_status(); //call the function check_status to check is morning|afternoon|evening|night
  //Below two function is used to detect a change in system time




  window.setInterval(check_status, 1000);

  //This are function used to detect time change from system

  //start from here
  function getTime() {
    var d = new Date();
    return d.getTime();
  }

  function checkTime() {
    if (Math.abs(getTime() - oldtime) > 2000) { // Here we compare difference b/w oldtime and latest time stamp if we detect the difference of 2 sec mean the system time changes so call all the above function?
      check_status();
      getQuote();
      location.reload(true);
    }
    oldtime = getTime();
  }
  var oldtime = getTime(); //This variable hold the last timestamp before callin the function
  setInterval(checkTime, 1000); //call the function checkTime after a second
  window.setInterval(function () {
      get_current_time();
    },
    1000);

  //Ends Here


  // fUNCTION TO GET CURRENT CITY FROM INTERNET API
  /*function getCity() {
    $.ajax({
      url: 'https://ipinfo.io/json',
      'type': 'GET',
      success: function (data) {
        console.log(data);
        var userinfo = data;
        var city = userinfo.city;
        var country = userinfo.country;
        console.log(city + "(" + country + ")");
        //$("#city").text(city);
        //$("#nav_city").text(city);
        //$("#inner_city").text(city+"("+country+")");

        getWeather(city);
      },
      error: function (e) {
        var x = document.getElementById("myAudio");
        console.log(e);
        $('#temprature').css('display', 'none');
        $('.main').html('<h1 style="position:absolute;top:45%;left:50%;transform:translate(-50%,-50%);font-size:85px;font-family:arial;color:#ffffff;font-weight:50px;text-align:center;width:100%;">No Internet Connection</h1>');
        $('.main').css('background-image', 'url(error.png)');
        $('.main').css('background-repeat', 'none');
        $('.main').css('background-size', 'cover');
        x.play();
      }
    });
  }*/



  function getCity()
{
  $.ajax({
url:'https://ipinfo.io/json',
'type':'GET',
success:function(data)
{
console.log(data);
var userinfo = data;
var city = userinfo.city;
var country = userinfo.country;
console.log(city+"("+country+")");
//$("#city").text(city);
//$("#nav_city").text(city);
//$("#inner_city").text(city+"("+country+")");

getWeather(city);
},error:function(e)
{
  var x = document.getElementById("myAudio"); 
console.log(e);
$('#temprature').css('display','none');
$('.main').html('<h1 style="position:absolute;top:45%;left:50%;transform:translate(-50%,-50%);font-size:85px;font-family:arial;color:#ffffff;font-weight:50px;text-align:center;width:100%;">No Internet Connection</h1>');
$('.main').css('background-image','url(error.png)');
$('.main').css('background-repeat','none');
$('.main').css('background-size','cover');
x.play();
}
});
}

  //call the above function to get City
  getCity();

  //City detection Ends Here




  /*Weather Funtion start from here*/
  function getWeather(city) {
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=16020d8d307b65395a579b8cdb9b33dd&units=metric";


    $.ajax({
      url: url,
      type: 'GET',
      success: function (data) {
        console.log(data)
        var weatherData = data;
        var desc = weatherData.weather[0].main;
        var upperDesc = desc.toUpperCase();
        var temp = Math.floor(parseFloat(weatherData.main.temp));
        var temp_min = parseInt(weatherData.main.temp_min);
        var temp_max = parseInt(weatherData.main.temp_max);
        var country = weatherData.sys.country;
        var sunrise = weatherData.sys.sunrise;
        var sunset = weatherData.sys.sunset;
        console.log(country); //console only for debugging
        console.log(temp);




        console.log(desc);
        $('#temp').html(temp);
        $('#city').html(city);
        $('#temp_info').html(desc + '<br>Minimum:' + temp_min + '<br>Maximum:' + temp_max);
        var myList = ['taj mahal', 'google', 'apple', 'girls', 'mountains', 'mercedes benz', 'rivers', 'water', 'boys', 'dark', 'cars', 'fish', 'delhi', 'new york', 'black', 'cat', 'baby', 'dogs', 'roses',
          'flowers', 'blossoms', 'usa', 'india', 'bangalore', 'night', 'morning', 'noon', 'evening', 'rainy', 'snow', 'thunderstorm', 'beach', 'flight'
        ];
        var randomNo = Math.floor(Math.random() * (0, myList.length - 1));

        /** statements for adding an keypress event based on selected search engine by user */
        // start from here
        var engine = localStorage.getItem('engine');

        if (engine == null || engine == 'Google') {
          $('#icons').attr('class', 'fab fa-google');
          $('#key').keypress(function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);


            if (keycode == '13') {

              if ($('#key').val() == null || $('#key').val().length == 0) {
                $('#key').attr('placeholder', 'key Required');
              } else {
                window.location = "https://www.google.com/search?q=" + $('#key').val();
              }
            }
          });


        } else if (engine == 'stack') {
          $('#icons').attr('class', 'fab fa-stack-overflow');

          $('#key').keypress(function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
              if ($('#key').val() == null || $('#key').val().length == 0) {
                $('#key').attr('placeholder', 'key Required');
              } else {
                window.location = "https://stackoverflow.com/search?q=" + $('#key').val();
              }
            }
          });
        } else {
          $('#icons').attr('class', 'fab fa-youtube');

          $('#key').keypress(function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            var __id = "";
            if (keycode == '13') {
              if ($('#key').val() == null || $('#key').val().length == 0) {
                $('#key').attr('placeholder', 'key Required');
              } else {
                if ($('#key').val().length == 43) {
                  device = "desktop";
                  __id = $('#key').val().substr($('#key').val().indexOf('v=') + 2, $('#key').val().length - 1);


                } else if ($('#key').val().length == 41) {
                  device = "web_mobile";
                  __id = $('#key').val().substr($('#key').val().indexOf('v=') + 2, $('#key').val().length - 1);
                } else if ($('#key').val().length == 28) {
                  device = "mobile";
                  __id = $('#key').val().substr($('#key').val().indexOf('be/') + 3, $('#key').val().length - 1);
                  //console.log(url.indexOf("be/"));
                } else {
                  device = "unknown";
                  alert(device + " device");
                  $('#key').val() = "";
                }
                window.location = "https://www.y2mate.com/download-youtube/" + __id;
              }
            }
          });
        }

        //Engine Work Ends here



        //Change Background
        switch (localStorage.getItem('background')) {
          case '1':
            getNewBackground(desc);
           
            $('.backgrounds option[value=1]').attr('selected', 'selected');
            break;
          case '2':
            getNewBackground('Dark');
            $('.backgrounds option[value=2]').attr('selected', 'selected');
            break;
          case '3':
            getNewBackground(myList[randomNo]);
            $('.backgrounds option[value=3]').attr('selected', 'selected');
            break;
          case '4':
            getNewBackground('Girls');
            
            $('.backgrounds option[value=4]').attr('selected', 'selected');
            break;
          case '5':
            getNewBackground('Boys');
            $('.backgrounds option[value=5]').attr('selected', 'selected');
            break;
          case '6':
            getNewBackground('Animals');
            $('.backgrounds option[value=6]').attr('selected', 'selected');
            break;

          case '7':
            getNewBackground('Mounatins');
            $('.backgrounds option[value=7]').attr('selected', 'selected');
            break;
          case '8':
            getNewBackground('Beach');
            $('.backgrounds option[value=8]').attr('selected', 'selected');
            break;
          case '9':
            getNewBackground('Rainy');
            $('.backgrounds option[value=9]').attr('selected', 'selected');
            break;

            case '10':
            getNewBackground('rose');
            $('.backgrounds option[value=10]').attr('selected', 'selected');
            break;
          default:
            getNewBackground(desc);
            $('.backgrounds option[value=1]').attr('selected', 'selected');
            break;


        }

        //**Update Ends Here */

      }, // fallback incase of api error
      error: function (e) {
        console.log(e)
        var statuscode = e.status; //or whatever
        if (statuscode == 400) {
          console.log('There is an error city not found!');
        }
        if (statuscode == 404) {
          console.log('Bad Request!');
        }
      }
    });

    // all this are done in weather function
  }



  $('#file').on('input',function()
  {

    var input = document.getElementById("file");
var fReader = new FileReader();
fReader.readAsDataURL(input.files[0]);
fReader.onloadend = function(event){
    
    localStorage.setItem('user-pic',event.target.result);
}


  });




  // Update on 14-1-20 for settings
  $('#save').on('click', function () {

   





    const backs = $('.backgrounds').children("option:selected").val();
    const theme_value = $('.themes').children("option:selected").val();
    const time_value = $('.time').children("option:selected").val();
    const name = $('#name').val();
    const engine = $('.eng').children("option:selected").val();
    const bar_dir = $('.bar').children("option:selected").val();
    const avatar= $()
    localStorage.setItem('background', backs);
    localStorage.setItem('username', name);
    localStorage.setItem('theme', theme_value);
    localStorage.setItem('time', time_value);
    localStorage.setItem('engine', engine);
    localStorage.setItem('dir',bar_dir);



    window.top.location.reload(false);

  });

  //setting saving ends here

  //statment used to hide or show data delete button in settings

  if (localStorage.length == 0) {
    $('#delete').css('visibility', 'hidden');
  } else {
    $('#delete').css('visibility', 'visible');
  }

  //delete button show/hide ends here


  //This below function to add a click event on delete button to delete app data


  $('#delete').on('click', function () {
    var is_delete = confirm("Are you sure to delete App Data!");
    //if user click on yes do this
    if (is_delete) {
      localStorage.clear();
      alert("Application Data Cleared!");
      window.top.location.reload(false);
    }
  });

  //this function work like hover to change delete buton icon

  $('#delete').on('mousemove', function () {
    $('#bin').text('delete_forever');
  });
  $('#delete').on('mouseout', function () {
    $('#bin').text('delete');
  });

  //ends here^



  //Add or remove setting button class on mousein or out

  $('#setting').on('mousemove', function () {
    $('#setting').addClass('mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored');
  });


  $('#setting').on('mouseout', function () {
    $('#setting').removeClass('mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored');
  });




  // update ends here



  


  

  // function to preserve the search engine state using localstorage
  function preserve_bar() {
    var show_hide = localStorage.getItem('dir');
    if (show_hide == 'Show' || show_hide == null) {
      
      $('#bar').css('left', '-2%');
      $('#bar').css('visibility', 'visible');
      $('.bar option[value=Show]').attr('selected', 'selected');

      $('#bar').on('mousemove',function()
      {
        $('#bar').css('left', '4%');
      });

      $('#bar').on('mouseleave',function()
      {
        $('#bar').css('left', '-2%');
      });


    


    } 
    else if (show_hide == 'Hide') {
     
      $('#bar').css('visibility', 'hidden');
      $('.bar option[value=Hide]').attr('selected', 'selected');
}



  }

  preserve_bar();

  



  //Hide File Input incase of picture is found in localstorage

  



  

  
});
var bookmarkTreeNodes = chrome.bookmarks.getTree(
  function(bookmarkTreeNodes) {
   console.log(bookmarkTreeNodes[0].children);
  });



//This prevent to view source code or disable right click on the webpage


$(document).bind("contextmenu", function (e) {
  e.preventDefault();
});
