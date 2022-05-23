let api_access_key = require('apikeys');

// DOM elements
const imageContainerElement = document.getElementById('image-container');
const loader = document.getElementById('loader');

// global variables
const api_access_key = 'API_KEY';
const api_secret_key = 'API_SECRET';
let count = 5;
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${api_access_key}&count=${count}`;

let photosArray = [];
let imageLoads = 0;
let loadMoreImages = false;
let totalImagesLoaded = 0;

// Helper function to set attributes to elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Images loaded
function imagesLoaded() {
    imageLoads++;
    if (imageLoads === totalImagesLoaded) {
        loader.hidden = true;
        loadMoreImages = true;
        count = 10;
        apiUrl = `https://api.unsplash.com/photos/random?client_id=${api_access_key}&count=${count}`;
    }
}

// Create element for Link and Photos, add to DOM 
function displayPhotos() {
    imageLoads = 0;
    totalImagesLoaded = photosArray.length;
    console.log('totalImagesLoaded ', totalImagesLoaded);
    // Run function for each object in photosArray
    photosArray.forEach(photo => {

        // Create <a> tag to link to Unsplash
        const a = document.createElement('a');
        setAttributes(a, {
            href: 'photo.links.html',
            target: '_blank'
        });

        // Create <img> tag
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.description,
            title: photo.description
        });

        // Count number of image loads
        img.addEventListener('load', imagesLoaded);

        // Append <img> -> <a> -> image-container Element
        a.appendChild(img);
        imageContainerElement.appendChild(a);
    })
}

// Get photos from Unsplash API
async function getRandomPhotosFromAPI() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch (error) {
        console.log(`Whoops! something went wrong. Please try again!`);
    }
}

// Load more images
function loadMore() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && loadMoreImages) {
        loadMoreImages = false;
        loader.hidden = false;
        getRandomPhotosFromAPI();
    }
}
window.addEventListener('scroll', loadMore);

// invoked API function
getRandomPhotosFromAPI();