class Movie {
    constructor(leftSearchInput,btnFight) {
        this.apiKey = 'cce5a34d';
        this.leftSearchInput = leftSearchInput;
        this.btnFight = btnFight;
        
        this.btnFight.addEventListener('click',this.fetchMovieData);
    }
    fetchMovieData = async () => {
        try {
            console.log(this);
            const response = await axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${this.apiKey}&s=${this.leftInputSearch}`);
            console.log(response);
//            const {Ratings} = response.data;
//            console.log(Ratings[0]);
        } catch(err) {
            console.log('Error!:',err);    
        }
    }
    
    get leftInputSearch() {
        return this.leftSearchInput.value;
    }
}


const leftSearchInput = document.querySelector('#left-search');
const btnFight = document.querySelector('#fightButton');
//const apiKey = 'cce5a34d';
const movie = new Movie(leftSearchInput,btnFight);
