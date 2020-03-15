//in the paramas object i can define which query strings to add to the request and they will be automatically appended

//Input event -> the input event tracks changes in the input, so evreytime the input change i make a request to the api.


const fetchData = async(searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'cce5a34d',
            s: searchTerm,
        }
    });
    
    //handling error responses
    if(response.data.Error) {
        console.log('this movie doesnt exists.')
        return [];
    }   
    return response.data.Search;
};


//follow up request to the api with the specified movie we clicked on
const onMovieSelect = async movie => {
   const response = await axios.get('http://www.omdbapi.com/', {
       params: {
           apikey: 'cce5a34d',
           i: movie.imdbID
       }
   }); 
   
    console.log(response.data);
    document.querySelector('#summary').innerHTML = movieTemplate(response.data);
    
};

createAutoComplete({
    root: document.querySelector('.autocomplete'),
    renderOption(movie) {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
            <img src="${imgSrc}"/>
            ${movie.Title} (${movie.Year})`;      
    }
});



const movieTemplate = movieDetail => {
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}"/>
                </p>

            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Total earnings</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">MetaScore</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
         <article class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>`;
};
