
async function displayMovies(url){
    const retrieveMovie = await fetch(url);
    const response = await retrieveMovie.json();
    
    
    response.results.forEach(movie => {
        const imgPath = "https://image.tmdb.org/t/p/w1280";
        const createImg = document.createElement("img");
        createImg.src = imgPath + movie.poster_path;
        createImg.alt = movie.title;
        
        const movieContainer = document.querySelector(".movieContainer")
        createImg.classList.add("imgContainer");
        
        const createDiv = document.createElement("div");
        createDiv.classList.add("movie-info");
        
        const movieInfo = document.createElement("div");
        movieInfo.classList.add("movieText");
        movieInfo.innerHTML = `${movie.title}`;
        const movieRating = document.createElement("span");
        movieRating.innerHTML = `${movie.vote_average}`
     
        
        movieInfo.appendChild(movieRating);

        createDiv.appendChild(createImg);
        createDiv.appendChild(movieInfo)
        movieContainer.appendChild(createDiv);
      
        createDiv.addEventListener("click", showOverview)
        
        function showOverview(){
            const createImg2 = document.createElement("img");
            createImg2.setAttribute("class", "overviewImage")
            createImg2.src = imgPath + movie.poster_path;
            createImg2.alt = movie.title

            const overviewContainer = document.querySelector(".overviewContainer")
            const popup = document.querySelector(".popup")
            const displayInfo = document.createElement("div");
            displayInfo.classList.add("displayInfo");
            const closebtn = document.createElement("button");
            closebtn.setAttribute("class","closebtn")
            closebtn.innerHTML = "X"
            popup.appendChild(closebtn)
            popup.appendChild(createImg2)
            popup.appendChild(displayInfo)
            displayInfo.innerHTML = "<b> Overview</b>" + "<br>"+ `${movie.overview}`+ "<br><br>"+  
            " Release Date: "+ `${movie.release_date}`;
    

            overviewContainer.style.display = "flex"
            console.log("clicked")
            closebtn.addEventListener("click", closePopup)
         
                function closePopup(){
                    popup.innerHTML = ""
                    overviewContainer.style.display = "none"
                }
            }
    });
       
}

const apiURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
displayMovies(apiURL) //To display initial list of  popular movies

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
    const search = document.getElementById("search");
    const searchURL = searchAPI + search.value;

    const movieContainer = document.querySelector(".movieContainer");
    if (search.value) {
    movieContainer.innerHTML = "";
    displayMovies(searchURL);
    form.reset();
    }
})

