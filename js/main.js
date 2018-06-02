//Listening for the submit Submit event
var submit = document.getElementById('submit');
submit.addEventListener('click' , saveURL);

//function to save the submitted url     E -> event parameter
function saveURL(E) {
    var siteName = document.getElementById('websiteName').value;
    var siteUrl  = document.getElementById('websiteURL').value;
    
    if(!validateForm(siteName , siteUrl)){
        return false;
    }
    
    function validateForm(name , url) {
        if (!name || !url ) {
            alert("Fill the required fields");
            return false;
        }
        
        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        var t = url;

        if (!t.match(regex)) {
            alert("Fill the valid URL");
            return false;
        } 
        
        if(!url.startsWith('http')){
            alert("URL starts with http://");
            return false;
        }
        
        return true;
    } 

    //creating object for storing the name and value
    var savedUrl = {
        name : siteName ,
        url : siteUrl
    }
    console.log(savedUrl);


    if(localStorage.getItem('URLs') === null) {
        //Initialising array
        var URLs = [];
        //pushing the object to the array.
        URLs.push(savedUrl);
        //Storing into the local stotage
        localStorage.setItem('URLs' , JSON.stringify(URLs));
    }

    else {
        var URLs = JSON.parse(localStorage.getItem('URLs'));
        //pushing the object to the array.
        URLs.push(savedUrl);
        //Storing into the local stotage
        localStorage.setItem('URLs' , JSON.stringify(URLs));
    }

    document.getElementById('form').reset();

    getValues();

    E.preventDefault();
}

// Delete bookmark
function deleteURL(url){
  // Get bookmarks from localStorage
  var URLs = JSON.parse(localStorage.getItem('URLs'));
  // Loop through the bookmarks
  for(var i = 0;i < URLs.length;i++){
    if(URLs[i].url == url){
      // Remove from array
      URLs.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('URLs', JSON.stringify(URLs));

  // Re-fetch bookmarks
  getValues();
}

function getValues() {

    var URL = JSON.parse(localStorage.getItem('URLs'));

    var results = document.getElementById('results');

    results.innerHTML = '';

    for(var i = 0 ; i < URL.length ; i++) {
        var siteName = URL[i].name;
        var siteUrl = URL[i].url;

        results.innerHTML += '<div class="good">' +
                             '<p id="text"> <span id="nametext">' + siteName +
                             '</span><span id="btns"><a class="btn btn-success" href="' + siteUrl +  '" target="_blank">Go there</a>' +
                             ' <a class="btn btn-danger" href="#" onclick="deleteURL(\'' + siteUrl + '\')">Delete</a></span>' +
                             '</p>' +
                             '</div>'
    }
}
