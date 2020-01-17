$(document).ready(function()
	{
      //make a ajax request to the api
      var api_key='77fcc3b8e0e44caa9df1f04080fb1fdf';


function get_News(key)
{



	var sources = ['abc-news','google-news-in']

   	var totalsource = sources.length;

   	var randomNoForSource = Math.floor(Math.random()*(0,totalsource));

   	console.log([sources[randomNoForSource]]);


  $.ajax({url:'https://newsapi.org/v2/top-headlines?sources='+[sources[randomNoForSource]]+'&apiKey='+key,
   type:'GET',
   success:function(data)
   {
    console.log(data);

    var totalArticles = data['articles'].length;
    console.log(totalArticles);

    var randomNo = Math.floor(Math.random()*(0,totalArticles));
    console.log(randomNo);

    var title = data['articles'][randomNo]['title'];
    var content = data['articles'][randomNo]['description'];
    var thumb_url=data['articles'][randomNo]['urlToImage'];


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

    var visit_url = data['articles'][randomNo]['url'];
    $('#thumb').css('background-image','url('+thumb_url+')');
   if(thumb_url!=null)
   {
    $('.mdl-card__title').css('background-image','url('+thumb_url+')');
   }
   else{
    $('.mdl-card__title').css('background-image','url(welcome_card.jpg)');
   }
    $('#title').html(title);
    $('#content').html(content);
    $('#site').on('click',function()
    {
      window.open(visit_url,'_blank');
    });

    $('#share').on('click',function()
    {
      window.open('https://api.whatsapp.com/send?text='+visit_url,'_blank');
    });
    
   
   },error:function(e)
   {
    console.log(e.status);
    if (e.status==0) 
    {
      console.log('No Internet Connection!');
      $('.main').html('<center><h5>No Internet Connection</h5></center>');
    }
    else
    {
      consol.log(e);
    }
   }
  })
}

get_News(api_key);


$(document).keydown(function(){

  window.top.location.reload(false);
});
	});