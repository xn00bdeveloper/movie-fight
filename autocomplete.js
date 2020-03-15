const createAutoComplete = ({ root,renderOption }) => {
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
const input = root.querySelector('.input');
//hide and show the dropdown widegt
const dropdown= root.querySelector('.dropdown');
const resultsWrapper = root.querySelector('.results');



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
        option.innerHTML = renderOption(movie);
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

};