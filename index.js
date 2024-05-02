const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#responseField');

/* .then() version
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
*/

//ES8
const getDefinition = async () => {
    const inputWord = inputField.value;
    const endpoint = url + inputWord;
    try {
        const response = await fetch(endpoint);
        if(response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            renderResponse(jsonResponse);
        }
    } catch(error) {
        console.log('Fetch Error: ' + error);
    }
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
        let word = res[i].word;
        let partOfSpeech = res[i].meanings[0].partOfSpeech;
        let definitions = res[i].meanings[0].definitions;
        let listA = [];
    
        for(let j = 0; j < definitions.length; j++){
            listA.push(`<ul>${definitions[j].definition}</ul>`);
        }
        listA = listA.join("");
        
        allText.push(`<h3>${word}<sup>${i+1}</sup></h3><i>${partOfSpeech}:</i> ${listA}</br></br>`)
    }

    allText = allText.join("");
    responseField.innerHTML = allText;
    
    return
  }

submit.addEventListener('click', displaySuggestions);