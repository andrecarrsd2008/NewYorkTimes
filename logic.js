// SET UP VARIABLES //
// ===============================================
var authKey =  "2fcaec463c144c12b7721ebed13836ff";


var queryTerm     = "";
var numResults    = 0;
var startYear     = 0;
var endYear       = 0;

// URL Base
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;


// VARIABLE TO TRACK NUMBER OF ARTICLES
var articleCounter = 0; 

// FUNCTION //
// ================================================
function runQuery(numberArticles, queryURL){

    $.ajax({url: queryURL, method: 'GET'})
        .done(function(NYTData) {
        $( "#wellSection" ).empty();
            
        for(var i=0; i<numberArticles; i++){
            console.log(NYTData.response.docs[i].headline.main);
            console.log(NYTData.response.docs[i].section_name);
            console.log(NYTData.response.docs[i].headline.main);
            console.log(NYTData.response.docs[i].pub_date);
            console.log(NYTData.response.docs[i].web_url);

            var wellSection = $('<div>');
            wellSection.addClass("well");
            wellSection.attr('id', "articleWell-" + i);
            $("#wellSection").append(wellSection);


            // logging to Console
            console.log(queryURL)
            console.log(numberArticles);
            console.log(NYTData);
           
                // // console.log(NYTData.response.docs[i].byline.original);
                
             // // Attach the content to the appropriate well
                $('#articleWell-' + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>");
                $('#articleWell-' + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");
                $('#articleWell-' + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
                // $('#articleWell-' + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>")
                $('#articleWell-' + i).append('<a href=" + NYTData.response.docs[i].web_url">' + NYTData.response.docs[i].web_url + "</h5>");
            }
               
            
        })
     
    }


// MAIN PROCESSES //
// ==================================================
$('#searchBTN').on('click', function(){

   $('#clearAll').on('click', function(){

    
});       

queryTerm = $('#search').val().trim();
console.log(queryTerm);

// Add in the Search Term 
var newURL = queryURLBase + "&q=" + queryTerm;
console.log(newURL);

 // // Get the Number of Records
 numResults = $('#numRecords').val()
   
// Get the Start Year and End Year
startYear = $('#startYear').val().trim(); 
endYear = $('#endYear').val().trim();

    
if(parseInt(startYear)){

    startYear = startYear + "0101";
    // Add the date infomration to the URL
    newURL = newURL + "&begin_date=" + startYear;
    }
    
    if(parseInt(endYear)){

    endYear = endYear + "0101";
    // Add the date information to the URL    
    newURL = newURL + "&end_date=" + endYear;

    }
    
    // Send the AJAX Call the newly assembled URL
    runQuery(numResults, newURL);

    return false;

})
    
 
