const debounce = ((func,dealy = 1000) => {
    let timeoutID;
    return  (...args) => {
        if(timeoutID) {
            clearTimeout(timeoutID);
        }
        timeoutID = setTimeout(() => {
            //apply calls the fucntion as we normally would and the taker all the arguments and pass them to the original function
            func.apply(null,args)
        },dealy);
    }  
});





//without refacctor
//let timeoutID;
//const onInput = event => {
//    if(timeoutID) {
//        console.log('timer interval cleaned')
//        clearTimeout(timeoutID);
//    }
//    //if the user stop typing for 1 sec we run the request
//    timeoutID = setTimeout(() => {
//        console.log('timeout id is exists',timeoutID);
//        fetchData(event.target.value);     
//    },1000);
//};
//
//input.addEventListener('input', onInput);

