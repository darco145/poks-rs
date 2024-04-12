let trenutnaStranica = 1;
const slikePoStranici = 9;

window.onload = function() {
    fetchSlike();
};

var modal = document.getElementById('myModal');
var modalImg = document.getElementById('img01');
var captionText = document.getElementById('caption');
var span = document.getElementsByClassName('close')[0];

span.onclick = function() {
    modal.style.display = "none";
}

function prikaziSlikeZaStranicu(slike) {
    const startIndex = (trenutnaStranica - 1) * slikePoStranici;
    const endIndex = startIndex + slikePoStranici;
    const slikeZaPrikaz = slike.slice(startIndex, endIndex);

    const galleryContainer = document.getElementById('photo-gallery');
    galleryContainer.innerHTML = ''; 


    slikeZaPrikaz.forEach((slika, index) => {
        const columnDiv = document.createElement('div');
        columnDiv.classList.add('col-md-4');

        const divElement = document.createElement('div');
        divElement.classList.add('photo-item');
    
        const imgElement = document.createElement('img');
        imgElement.src = slika.url;
        imgElement.alt = 'Gallery Image';
        imgElement.classList.add('img-fluid');
    
        const overlay = document.createElement('div');
        overlay.className = 'overlay';

        const enlargeButton = document.createElement('button');
        enlargeButton.id = 'enlarge-icon';
        enlargeButton.className = 'enlarge-icon text-center';
        enlargeButton.innerHTML = '<i class="fas fa-search-plus"></i>';

        const linkIcon = document.createElement('a');

        console.log(slika.id);
        linkIcon.href = `pojedinacna_vijest.html?id=${slika.id}`;
        linkIcon.target = '_blank';
        linkIcon.innerHTML = '<i class="fa fa-link" aria-hidden="true" style="text-decoration:none"></i>';

        overlay.appendChild(enlargeButton);
        overlay.appendChild(linkIcon);

        divElement.appendChild(imgElement);
        divElement.appendChild(overlay);

        galleryContainer.appendChild(divElement);

        enlargeButton.id = 'enlarge-icon-' + index;
        enlargeButton.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = slika.url; 
            captionText.innerHTML = slika.alt; 
        });
    });
}

function azurirajNavigaciju(slike) {
    const ukupnoStranica = Math.ceil(slike.length / slikePoStranici);
    const paginationContainer = document.getElementById('pagination');
    
    paginationContainer.innerHTML = '';

    const btnPrethodna = document.createElement('button');
    btnPrethodna.className = 'btn btn-primary';
    btnPrethodna.textContent = 'Претходна';
    btnPrethodna.onclick = function() {
        if (trenutnaStranica > 1) {
            trenutnaStranica--;
            prikaziSlikeZaStranicu(slike);
            skrolovatiNaVrh();
        }
    };
    paginationContainer.appendChild(btnPrethodna);

    for (let i = 1; i <= ukupnoStranica; i++) {
        const btnStranica = document.createElement('button');
        btnStranica.className = `btn btn-primary ${trenutnaStranica === i ? 'active' : ''}`;
        btnStranica.textContent = i;
        btnStranica.onclick = function() {
            trenutnaStranica = i;
            prikaziSlikeZaStranicu(slike);
            skrolovatiNaVrh();
        };
        paginationContainer.appendChild(btnStranica);
    }

    const btnSledeca = document.createElement('button');
    btnSledeca.className = 'btn btn-primary';
    btnSledeca.textContent = 'Сљедећа';
    btnSledeca.onclick = function() {
        if (trenutnaStranica < ukupnoStranica) {
            trenutnaStranica++;
            prikaziSlikeZaStranicu(slike);
        }
    };
    paginationContainer.appendChild(btnSledeca);
}

function fetchSlike() {
    fetch('conf/vesti_read.php')
        .then(response => response.json())
        .then(data => {
            const slike = data.map(vest => ({
                url: vest.slika,
                id: vest.id,
                alt: vest.naslov 
            }));
            azurirajNavigaciju(slike); 
            prikaziSlikeZaStranicu(slike);
        })
        .catch(error => {
            console.error('Error fetching images:', error);
        });
}