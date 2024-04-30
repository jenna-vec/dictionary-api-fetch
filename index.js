const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#responseField');

const getDefinition = () => {
    const inputWord = inputField.value;
    const endpoint = url + inputWord;

    fetch(endpoint).then(function(response){
        response.json().then(function(data) {
            console.log(data);
            renderResponse(data);
        });
    }).catch(function(error) {
        console.log('Fetch Error:', error);
    });
}

const displaySuggestions = (event) => {
    event.preventDefault();
    while(responseField.firstChild){
      responseField.removeChild(responseField.firstChild);
    }
    getDefinition();
};

const renderResponse = (res) => {
    if(!res.length){
      responseField.innerHTML = "<p>Word not found!</p>";
      return;
    }

    let allText = [];
    for(let i=0; i<res.length; i++) {
        let partOfSpeech = res[i].meanings[0].partOfSpeech;
        let definitions = res[i].meanings[0].definitions;
        let listA = [];
    
        for(let j = 0; j < definitions.length; j++){
            listA.push(`<sup>${j}. </sup><span>${definitions[j].definition}</span></br>`);
        }
        listA = listA.join("");
        
        allText.push(`<i>${partOfSpeech}:</i></br> ${listA}</br>`)
    }

    allText = allText.join("");
    responseField.innerHTML = allText;
    
    return
  }

submit.addEventListener('click', displaySuggestions);