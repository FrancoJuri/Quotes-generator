const content = document.getElementById('content');
const randomButton = document.getElementById('random-button');
const authorTitle = document.getElementById('author-title');
const title = document.querySelector('.title');
authorTitle.textContent = authorName;
title.textContent += ` ${authorName} Quotes`;

document.addEventListener('DOMContentLoaded', () => {
    consultarAPI(authorName, 3)
})


randomButton.addEventListener('click', () => {
    consultarAPI('', 2);
})



async function consultarAPI(author, limit){
    try {
        let url;
        if(author === ''){
            url = `https://quote-garden.herokuapp.com/api/v3/quotes/random?author=${authorName}`;
        } else{
            url = `https://quote-garden.herokuapp.com/api/v3/quotes?author=${author}&limit=${limit}`;
        }

        const response = await fetch(url);
        const result = await response.json();
        showHTML(result);
    } catch (error) {
        content.innerHTML = `<div class='alert alert-danger rounded p-3'>An error has ocurred</div>`
    }
    
}


function showHTML(elements){
    clearHTML();
    const { data } = elements;
    data.forEach(el => {
        const { quoteText } = el;
        content.innerHTML += `

            <div class='frase-div mt-5'>
                <blockquote class='ms-3'> "${quoteText}" </blockqoute>
            </div>

        `
    })

}

function clearHTML(){
    while(content.firstChild){
        content.removeChild(content.firstChild);
    }
}