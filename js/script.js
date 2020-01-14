$(document).ready(function()
{
//https://code.getmdl.io/1.3.0/material.purple-deep_purple.min.css
//https://code.getmdl.io/1.3.0/material.indigo-blue.min.css
  var name=localStorage.getItem('username');
  var theme=localStorage.getItem('theme');
  if(name==null || name=="")
  {
    name="User";
    $('#name').val("");
    document.title="New Tab";
    
   
  }
  else{
  $('#name').val(name);
  document.title='Hey, '+name;
  }

  //check theme status from local storage

  if(theme==null || theme=='default')
  {
    $('#theme').attr('href','https://code.getmdl.io/1.3.0/material.teal-green.min.css');
    $('.themes option[value=default]').attr('selected','selected');
  }
  else if(theme=='purple')
  {
    $('#theme').attr('href','https://code.getmdl.io/1.3.0/material.purple-deep_purple.min.css');
    $('.themes option[value=purple]').attr('selected','selected');
  }
  else if(theme=='indigo')
  {
    $('#theme').attr('href','https://code.getmdl.io/1.3.0/material.indigo-blue.min.css');
    $('.themes option[value=indigo]').attr('selected','selected');
  }


function getQuote()
{
$.ajax({
url:'https://api.quotable.io/random',
type:'GET',
success:function(data)
{
console.log(data);
$('#quote').html('"'+data['content']+'-by '+data['author']+'"');
$('#quote').attr('data-clipboard-text','"'+data['content']+'-by '+data['author']+'"');
},error:function(e)
{
console.log(e);
}
})
}
/*Function to change Random Background Image*/
/* This function takes weather description*/
function getNewBackground(status)
{

  //Add a click event on instagram link by unsplah
$('#user-info').on('click',function()
{
window.open('https://www.instagram.com/unsplash','_blank');
});//click event ends here

//change backgroundImage start from here

$('.main').css('background-image','url(https://source.unsplash.com/random/?'+status+')');
//backgroundImage ends from here
$('#user').html(" Photo by unsplash");


//add a double click event on screen to change new background
/*$(document).keydown(function(){

  window.top.location.reload(false);
});*/

Mousetrap.bind('ctrl+b', function(e) {
  window.top.location.reload(false);
});
}
//Call the function getQuote() to generate a single quote on every page load
getQuote();
//This function makes a clock
function get_current_time()
{
//Dates
var day = new Date();
var hour = day.getHours()%24;
console.log(hour);
var minutes = day.getMinutes();
var seconds = day.getSeconds();
$('#time').html(hour+":"+minutes+":"+seconds);
}
//function to check is this is evening|night|afternoon|morning
function check_status()
{
var a = new Date();
var h = a.getHours();
var status = "";
var username=localStorage.getItem('username');
if(username==null)
{
  username="";
}
if (h<=12)
{
status = "Morning "+username;
$('#greets').html("Good,"+status);
}
else if (h<=16)
{
status = "Afternoon "+username;
$('#greets').html('Good,'+status);
}
else if (h>=17 && h<=20)
{
status = "Evening";
$('#greets').html('Good,'+status);
}
else if (h>=21)
{
status = "Night";
$('#greets').html('Good,'+status);
}


}
check_status();//call the function check_status to check is morning|afternoon|evening|night
//Below two function is used to detect a change in system time
function getTime()  {
var d = new Date();
return d.getTime();
}
function checkTime()  {
if (Math.abs(getTime() - oldtime) > 2000)  {  // Here we compare difference b/w oldtime and latest time stamp if we detect the difference of 2 sec mean the system time changes so call all the above function?
check_status();
getQuote();
location.reload(true);
}
oldtime = getTime();
}
var oldtime = getTime();//This variable hold the last timestamp before callin the function
setInterval(checkTime, 1000);//call the function checkTime after a second
window.setInterval(function(){
get_current_time();
}, 1000);
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
$('.main').html('');
$('.main').css('background-image','url(error.jpg)');
x.play();
}
});
}

//call the above function to get City
getCity();


/*Function to get current city*/

/*Weather Funtion start from here*/
function getWeather(city)
{
var url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=16020d8d307b65395a579b8cdb9b33dd&units=metric";
$.ajax({
url: url,
type: 'GET',
success: function(data){
console.log(data)
var weatherData = data;
var desc= weatherData.weather[0].main;
var upperDesc= desc.toUpperCase();
var temp = Math.floor(parseFloat(weatherData.main.temp));
var temp_min = parseInt(weatherData.main.temp_min);
var temp_max = parseInt(weatherData.main.temp_max);
var country = weatherData.sys.country;
var sunrise = weatherData.sys.sunrise;
var sunset = weatherData.sys.sunset;
console.log(country);
console.log(temp);


console.log(desc);
$('#temp').html(temp);
$('#city').html(city);
$('#temp_info').html(desc+'<br>Minimum:'+temp_min+'<br>Maximum:'+temp_max);
//call the function getNewBackground(desc)
var myList = ['taj mahal','google','apple','girls','mountains','mercedes benz','rivers','water','boys','dark','cars','fish','delhi','new york','black','cat','baby','dogs','roses',
'flowers','blossoms','usa','india','bangalore','night','morning','noon','evening','rainy','snow','thunderstorm','beach','flight'];
var randomNo = Math.floor(Math.random()*(0,myList.length-1));
//getNewBackground(myList[randomNo]);
//getNewBackground(city);
//getNewBackground(desc);
//getNewBackground("Dark");



/** Update on 14-1-20 for background setting */
if(localStorage.getItem('background')=='2')
  {
    getNewBackground('Dark');
    $('.backgrounds option[value=2]').attr('selected','selected');
    //$("input[name=options]:last").attr('checked',true);
    
   

    
    
  }
  else if(localStorage.getItem('background')=='1')
  {
    getNewBackground(desc);
    $('.backgrounds option[value=1]').attr('selected','selected');
    
  }
  else
  {
    getNewBackground(myList[randomNo]);
    $('.backgrounds option[value=3]').attr('selected','selected');
  }

  //**Update Ends Here */



},
error: function(e) {
console.log(e)
var statuscode = e.status; //or whatever
if (statuscode==400)
{
console.log('There is an error city not found!');
}
if (statuscode == 404)
{
console.log('Bad Request!');
}
}
});
}





//get_News();



// Update on 14-1-20 for background setting
$('#save').on('click',function()
{

  
  
  var snackbarContainer = document.querySelector('#backs');

  const backs=$('.backgrounds').children("option:selected").val();
  const theme_value=$('.themes').children("option:selected").val();
  const name=$('#name').val();
  localStorage.setItem('background',backs);
  localStorage.setItem('username',name);
  localStorage.setItem('theme',theme_value);
  

  snackbarContainer.MaterialSnackbar.showSnackbar({message:"Settings Saved!"});
  window.top.location.reload(false);

});

// update ends here
});