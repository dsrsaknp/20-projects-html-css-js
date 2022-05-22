let quoteContainerElement = document.getElementById('quote-container');
let quoteTextElement = document.getElementById('quote');
let authorTextElement = document.getElementById('author');
let twitterBtn = document.getElementById('twitter');
let newQuoteBtn = document.getElementById('new-quote');
let loader = document.getElementById('loader');

// global variable
let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainerElement.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainerElement.hidden = false;
    loader.hidden = true;
}

// Randomly pick a quote
function pickRandomNewQuote() {
    showLoadingSpinner();
    const numOfQuotes = apiQuotes.length;
    let quote = apiQuotes[Math.floor(Math.random() * numOfQuotes)];
    authorTextElement.textContent = quote.author || 'Unknown';
    if (quote.text.length > 120) {
        quoteTextElement.classList.add('long-quote');
    } else {
        quoteTextElement.classList.remove('long-quote');
    }
    quoteTextElement.textContent = quote.text;
    removeLoadingSpinner();
}

async function getQuotesFromAPI() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        pickRandomNewQuote();
    }
    catch (error) {
        // Error goes here.
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteTextElement.textContent}-${authorTextElement.textContent}`;
    window.open(twitterUrl, '_blank');
}
twitterBtn.addEventListener('click', tweetQuote);

// Load new quote
newQuoteBtn.addEventListener('click', pickRandomNewQuote);

getQuotesFromAPI();


// // CORS scenario in an API example below

// // Get random quotes from third party url
// async function getQuote() {
//     const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
//     const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
//     try {
//         const response = await fetch(proxyUrl + apiUrl);
//         const data = await response.json();
//         console.log(data);
//     }
//     catch (error) {
//         // getQuote();
//         console.log(`woops!! no quote - ${error}`);
//     }
// }

// getQuote();