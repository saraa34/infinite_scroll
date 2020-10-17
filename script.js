const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

let initialCount = 5;
const apiKey = 'Xfd2qW27hTL9bJY0-7jsKS-emUMvDDPhHcL9D-lxNDE';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateAPIURLWithNewCount(picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

//helper function
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {                         //per ogni foto
        const item = document.createElement('a');            // crea un anchor element <a>
        //item.setAttribute('href', photo.links.html);         // con link alla pagina di Unsplash
        //item.setAttribute('target', '_blank');               //che si aprirà in un'altra finestra
        setAttributes(item, {                            //DRY version of the above
            href: photo.links.html,
            target: '_blank'
        });
        const img = document.createElement('img');           //crea un'immagine
        //img.setAttribute('src', photo.urls.regular);         //con i dati ricevuti dall'API
        //img.setAttribute('alt', photo.alt_description);       
        //img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        img.addEventListener('load', imageLoaded);

        item.appendChild(img);                               //aggiunge l'immagine dentro l'anchor
        imageContainer.appendChild(item);                    //aggiunge l'anchor dentro il container
    });
}



async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad) {
            updateAPIURLWithNewCount(30);
            isInitialLoad = false;
        }
    } catch (err) {
        console.log(err);
    }
}


window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    };
});


getPhotos();