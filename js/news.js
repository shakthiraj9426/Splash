$(document).ready(function()
	{
      //make a ajax request to the api
      var api_key='77fcc3b8e0e44caa9df1f04080fb1fdf';

      var visit_url="";


function get_News(key)
{

  var sourceNo=localStorage.getItem('news_source');

  var sources = ['abc-news','google-news-in',
  'bbc-news','bbc-sport','buzzfeed','cbc-news',
  'cnn','espn','fox-news','google-news','hacker-news'
  ,'national-geographic','techcrunch','techradar','the-times-of-india',
  'time','usa-today','wired'];
  var totalsource = sources.length;
  console.log(totalsource);

   	var randomNoForSource = Math.floor(Math.random()*(0,totalsource));
$.ajax({url:'https://newsapi.org/v2/top-headlines?sources='+[sources[sourceNo]]+'&apiKey='+key,
   type:'GET',
   success:function(data)
   {
    console.log(data);

    var totalArticles = data['articles'].length;
    console.log(totalArticles);

    var randomNo = Math.floor(Math.random()*(0,totalArticles));
    //console.log(randomNo);

    var title = data['articles'][randomNo]['title'];
    var content = data['articles'][randomNo]['description'];
    var thumb_url=data['articles'][randomNo]['urlToImage'];
    var author=data['articles'][randomNo]['author'];


    /*text_truncate = function(str, length, ending) {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  };*/


  //var new_title = text_truncate(title,40);

    visit_url = data['articles'][randomNo]['url'];
    
   if(thumb_url!=null)
   {
    $('#thumb').attr('src',thumb_url);
   }
   else{
    $('#thumb').attr('src','./logo.png');
   }

   if(content!=null)
   {
    $('#title').html(title);
    $('#content').html(content);
    $('#sourceId').html('Provider: '+author);
   }
   else
   {
    $('#title').html(title);
   }

    

    
    
   
   },error:function(e)
   {
    //console.log(e.status);
    if (e.status==0) 
    {
      console.log('No Internet Connection!');
      $('.main').html('<center><h5>No Internet Connection</h5></center>');
    }
    else
    {
      console.log(e);
    }
   }
  })
}

get_News(api_key);
$('#visit').on('click',function()
    {
      window.open(visit_url,'_blank');
    });




function run_api()
{
  $('#news').fadeOut(800);
  $('#news').fadeIn(800);
  get_News(api_key);
}

setInterval(run_api,10000);
	});