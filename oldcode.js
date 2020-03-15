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

const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search for a Movie</b></label>
    <input class="input"/>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

//DOM ELEMENTS
const input = document.querySelector('.input');
//hide and show the dropdown widegt
const dropdown= document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');



const onInput = async (event) => {
    //i made this functgion a async function because it takes time to actually get the data out from the api , so if i make it a async function i wait until i get the data.
    const movies = await fetchData(event.target.value);
    if(!movies.length) {
//        dropdown.style.visibility = 'hidden';
        dropdown.classList.remove('is-active')
        return;
    }
    console.log(movies);
    resultsWrapper.innerHTML = '';
    //show the dropdown after we fetch the data
    dropdown.classList.add('is-active');
    for(let movie of movies) {
        const option = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        option.classList.add('dropdown-item');
        option.innerHTML = `
            <img src="${imgSrc}"/>
            ${movie.Title} (${movie.Year})`;
        
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
            onMovieSelect(movie)
        });
        
        resultsWrapper.appendChild(option);
    }   
};

input.addEventListener('input', debounce(onInput,1000));


document.addEventListener('click', event => {
    //if the user clicks on something that isn't include in our root element, we hide the dropdown.
    if(!root.contains(event.target)) {
        dropdown.classList.remove('is-active');
        
    } 
});


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
