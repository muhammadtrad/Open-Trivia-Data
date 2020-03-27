//Most asynchronous operations are network related ie making requests 
// Server and Client 

// When a client talks to the server, that's called an http REQUEST.
// When a server talks to the client, that's called an http REPONSE.

// types of requests you can make
// Create Read Update Delete C-R-U-D
// POST GET UPDATE DELETE

// http status codes 
// 100 - informational
// 200 - success 
// 300 - redirection
// 400 - client error 
// 500 - sever error

// For humans, we get in HTML format but other means of carrying data 
//are through XML and JSON.

const getCategoryIds = _ => {

let categoryEndPoint = `https://opentdb.com/api_category.php`;
    return fetch (categoryEndPoint)
    .then(res => res.json())
    .then(data => {
        let categories = data.trivia_categories;
        return categories.map(elem => {
            return elem.id;
        })
    })
}

//get random id extractor function
const getRandomId = ids => {
        return ids[Math.floor(Math.random()*ids.length)];
    }

const getTriviaData = categoryId => {
    const dataEndPoint = `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=hard&type=multiple`;
    return fetch(dataEndPoint)
        .then(res => res.json())
}

//With the functions above, we can run them

getCategoryIds() // get the category Ids
    .then(resultIds => {
        //resultIds is the result we get from running get Category Ids
        return getRandomId(resultIds); // then we run getRandomId with resultIds to
        //get a random ID from the array of IDs
    })
    .then(id => {
        //using the random category id, id
        return getTriviaData(id); //we use the random id to get the trivia data
    })
    .then(data =>{
        //we finally have the data
        console.log(data);
        //rendering the data to the DOM

    data.results.forEach(elem =>{
        document.write(`${elem.question}<br>`)
        document.write(`--> ${elem.correct_answer} <br>`)
        document.write(`--> ${elem.incorrect_answers} <br>`)
        document.write(`<br><br>`);
    })
  })
  .catch(err =>{
      //catch all errors 
      alert(err);
  })


