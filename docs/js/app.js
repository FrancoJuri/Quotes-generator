const randomButton = document.getElementById('random-button');
const authorSearchButton = document.getElementById('author-search');
const alerts = document.getElementById('alerts');
const authorSearchDiv = document.getElementById('menu-author-search');
const nav = document.querySelector('nav');
const closeButton = document.getElementById('btn-close');
const content = document.getElementById('content');
const form = document.getElementById('form');
const inputAuthor = document.getElementById('input-author');

document.addEventListener('DOMContentLoaded', consultarAPI(''));

randomButton.addEventListener('click', () => {
    consultarAPI('')
});

form.addEventListener('submit', validateForm);

authorSearchButton.addEventListener('click', showAuthorSearchDiv);
closeButton.addEventListener("click", hideAuthorSearchDiv);

function showAuthorSearchDiv(){
    authorSearchDiv.style.display = 'block';
    nav.style.display = 'none';
    setTimeout(() => {
        authorSearchDiv.style.transform = 'translateY(0px)'
    }, 0)
}

function hideAuthorSearchDiv(){
    authorSearchDiv.style.transform = 'translateY(-500px)';
    setTimeout(() => {
        authorSearchDiv.style.display = 'none';
        nav.style.display = 'block';
    }, 200)
}

function validateForm(e){
    e.preventDefault();

    if(inputAuthor.value.trim() === ''){
        alerts.innerHTML = 'You must enter an author to search';
        inputAuthor.style.borderColor = 'red';
        inputAuthor.addEventListener('input', () => {
            alerts.innerHTML = 'Type an author to search';
            inputAuthor.style.borderColor = '#ced4da';
        });
        return;
    }

    consultarAPI(inputAuthor.value.trim());
}


async function consultarAPI(author){
    try {
        let url;
        if(author === ''){
            url = 'https://quote-garden.herokuapp.com/api/v3/quotes/random';
        } else{
            url = `https://quote-garden.herokuapp.com/api/v3/quotes?author=${author}`;
        }

        const response = await fetch(url);
        const result = await response.json();
        if(!result.data.length){
            alerts.innerHTML = 'No results found';
            inputAuthor.style.borderColor = 'red';
            inputAuthor.addEventListener('input', () => {
                alerts.innerHTML = 'Type an author to search';
                inputAuthor.style.borderColor = '#ced4da';
            });
            return;
        }
        
        showHTML(result);
        hideAuthorSearchDiv();
    } catch (error) {
        content.innerHTML = `<div class='alert alert-danger rounded p-3'>An error has ocurred</div>`
    }
    
}

function showHTML(elements){

    const { data } = elements;

    data.forEach(el => {
        const { quoteAuthor, quoteGenre, quoteText } = el;
        content.innerHTML = `
            <div class='frase-div mb-2'>
                <blockquote class='ms-3'> "${quoteText}" </blockqoute>
            </div>

            <a href='author.html?author=${quoteAuthor}' class='author-link'>
            <div class='author-div mt-5 p-4 rounded'> 
                <div class='d-flex'>
                    <h3>${quoteAuthor}</h3> <img src='./img/rightarrow_derecha_5812.png' alt'right arrow icon'>
                </div>
                <span>${quoteGenre}</span>
            </div>
            </a>
        `
    })

}
