let quoteContainerElement = document.getElementById('quote-container');
let quoteTextElement = document.getElementById('quote');
let authorTextElement = document.getElementById('author');
let twitterBtn = document.getElementById('twitter');
let newQuoteBtn = document.getElementById('new-quote');
let loader = document.getElementById('loader');

// global variable
let apiQuotes = [];

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainerElement.hidden = true;
}

// Hide loading
function complete() {
    quoteContainerElement.hidden = false;
    loader.hidden = true;
}

// Randomly pick a quote
function newQuote() {
    loading();
    const numOfQuotes = apiQuotes.length;
    let quote = apiQuotes[Math.floor(Math.random() * numOfQuotes)];
    authorTextElement.textContent = quote.author || 'Unknown';
    if(quote.text.length > 120) {
        quoteTextElement.classList.add('long-quote');
    } else {
        quoteTextElement.classList.remove('long-quote');
    }
    quoteTextElement.textContent = quote.text;
    complete();
}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } 
    catch(error) {
        // Error goes here.
    } 
}

// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteTextElement.textContent}-${authorTextElement.textContent}`;
    window.open(twitterUrl, '_blank');
}
twitterBtn.addEventListener('click', tweetQuote);

// Load new quote
newQuoteBtn.addEventListener('click', newQuote);

getQuotes();