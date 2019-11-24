  $(function() {
      
    // Call to get all history search
    BindHistory();
    
    // Clear history Btn
    $('#clear').click(function (e) {
        ClearHistory();
    });
    
    // function on key input for search box
    $('#city').keydown(function (e) {
            var key = e.keyCode;
            // check if enter key is pressed, and store data if not empty
            if(key === 13 && $('#city').val().length>0)
            {
                AddHistory($( "#city" ).val());
                $( ".result ul" ).text("");
                $( "#city" ).val("");
            }
            // check which key is typed, and prevent illigal charachters
            else if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
              e.preventDefault();
            }
            else
            {
                 // search for country from from api on every key pressed, if more that 2 chars to not stress api 
               if($(this).val().length>=2)
               $.get( "//smn.ae/test/api.php?q="+$(this).val(), function(data) {
                $( ".result ul" ).text("");
                   var res = $.parseJSON(data);
                   for(var i=0;i<res.length;i++)
                   {
                        // append search result
                        $( ".result ul" ).append($("<li>"+res[i]+"</li>"));
                   }
                });
            }
    });
    
    // remove history btn click 
    $('.searchHistory').on('click', ".rm", function(){
        var ele = $(this).parent(); 
        RemoveHistory(ele.attr("data-term"),ele.attr("data-datatime"));
    });
    
     // search history btn click 
    $('.searchBtn').on('click', function(){
         AddHistory($( "#city" ).val());
        $( ".result ul" ).text("");
        $( "#city" ).val("");
    });
    
     // function for search result click to store 
    $('.result').on('click', "ul li", function(){
        $( "#city" ).val($(this).text());
         AddHistory($(this).text());
        $( ".result ul" ).text("");
    });
    
    // Store history in local storage
    function AddHistory(txt)
    {    
        var localStrArray = [];
        var timestamp = new Date().toLocaleString();
        var obj = {term:txt,date:timestamp};
        localStrArray = JSON.parse(localStorage.getItem('search'));
        localStrArray.push(obj);
        localStorage.setItem('search', JSON.stringify(localStrArray));
        BindHistory();
    }
    
    // Remove history element
    function RemoveHistory(txt,datetime)
    {
        // initialize an array to stored history
        var localStrArray = [];
        localStrArray = JSON.parse(localStorage.getItem('search'));
        
        for(var i=0;i<localStrArray.length;i++)
            if(localStrArray[i].term == txt && localStrArray[i].datetime == datetime)
                localStrArray.splice(i, 1);
        
        localStorage.setItem('search', JSON.stringify(localStrArray));
        BindHistory();
    }
    
    // Clear history Function
    function ClearHistory()
    {
        localStorage.setItem('search', "[]");
        BindHistory();
    }
    
    // Get all history search function
    function BindHistory()
    {
        if(localStorage.getItem('search') == null)
        localStorage.setItem('search', "[]");
        
        var localStrArray = [];
        localStrArray = JSON.parse(localStorage.getItem('search'));
        
        
        $( ".searchHistory ul" ).text("");
        for(var i=0;i<localStrArray.length;i++)
        $( ".searchHistory ul" ).append($("<li data-term='"+localStrArray[i].term+"' data-datetime='"+localStrArray[i].date+"'>"+localStrArray[i].term+" <span class='datetime'>"+localStrArray[i].date+"</span> <span class='rm'>&#215;</span></li>"))
    }
  });