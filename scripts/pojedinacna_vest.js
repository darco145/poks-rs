window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const vestId = urlParams.get('id');
    fetchVest(vestId);
    fetchOstaleVesti();
};

function cleanText(text) {
    text = String(text);
    return text.replace(/\|\|/g, '').replace(/\|/g, '');
}

function fetchVest(id) {
    fetch(`http://localhost/poks/conf/vesti_read.php?id=${id}`)
        .then(response => response.json())
        .then(vest => {
            document.getElementById('vest-naslov').textContent = vest.naslov;
            document.getElementById('vest-slika').src = vest.slika;
            document.getElementById('vest-autor').textContent = 'Аутор текста: ' + vest.autor;

            const datumObj = new Date(vest.datum);
            const dan = datumObj.toLocaleDateString('sr-RS', { day: 'numeric' });
            const mesec = datumObj.toLocaleDateString('sr-RS', { month: 'long' });
            const godina = datumObj.toLocaleDateString('sr-RS', { year: 'numeric' });

            const datumHTML = `
            <div class="datum-krug">${dan}</div>
            <div class="datum-mesec">${mesec}</div>
            <div class="datum-godina">${godina}</div>
            `;
            document.getElementById('vest-datum').innerHTML = datumHTML;

            const datumResponsiveHTML = `
            <div class="datum-mali-ekran">Датум: ${dan}. ${mesec} ${godina}</div>
            `;
            document.getElementById('vest-datum-mali-ekran').innerHTML = datumResponsiveHTML;

            const tekst = vest.tekst;
            const regex = /\|\|([^||]+)\|\|/g;
            const match = regex.exec(tekst);
            
            let tekstBezBolda = tekst.replace(regex, '');
            tekstBezBolda = tekstBezBolda.replace(/(?:\r\n|\r|\n)/g, '<br>'); 

            const boldovanTekstHTML = tekst.match(regex)?.map(match =>
                `<p class="boldovan-tekst"><strong>${match.replace(/\|\|/g, '')}</strong></p>`
            ).join('') || '';
            document.getElementById('vest-tekst').innerHTML = tekstBezBolda + boldovanTekstHTML;
        })
        .catch(error => console.error('Error:', error));
}

function prikaziPojedinacnuVest(pojedinacneVesti) {
    const vest = pojedinacneVesti[0];
    const imgElement = document.getElementById(`pojedinacnaSlika1`);
    const naslovElement = document.getElementById(`naslovPojedinacnihVesti1`);
    const tekstElement = document.getElementById(`tekstPojedinacnihVesti1`);

    if (imgElement && naslovElement && tekstElement) {
        imgElement.src = vest.slika;
        naslovElement.textContent = vest.naslov;
        
        const reci = vest.tekst.split(' ');
        if (reci.length > 20) {
            tekstElement.textContent = cleanText(reci.slice(0, 20).join(' ') + '...');
        } else {
            tekstElement.textContent = cleanText(vest.tekst);
        }
    }

    const vest2 = pojedinacneVesti[1];
    const imgElement2 = document.getElementById(`pojedinacnaSlika2`);
    const naslovElement2 = document.getElementById(`naslovPojedinacnihVesti2`);
    const tekstElement2 = document.getElementById(`tekstPojedinacnihVesti2`);

    if (imgElement2 && naslovElement2 && tekstElement2) {
        imgElement2.src = vest2.slika;
        naslovElement2.textContent = vest2.naslov;
        const reci2 = vest2.tekst.split(' ');
        if (reci2.length > 20) {
            tekstElement2.textContent = cleanText(reci2.slice(0, 20).join(' ') + '...');
        } else {
            tekstElement2.textContent = cleanText(vest2.tekst);
        }
    }

    const vest3 = pojedinacneVesti[2];
    const imgElement3 = document.getElementById(`pojedinacnaSlika3`);
    const naslovElement3 = document.getElementById(`naslovPojedinacnihVesti3`);
    const tekstElement3 = document.getElementById(`tekstPojedinacnihVesti3`);

    if (imgElement3 && naslovElement3 && tekstElement3) {
        imgElement3.src = vest3.slika;
        naslovElement3.textContent = vest3.naslov;
        const reci3 = vest3.tekst.split(' ');
        if (reci3.length > 20) {
            tekstElement3.textContent = cleanText(reci3.slice(0, 20).join(' ') + '...');
        } else {
            tekstElement3.textContent = cleanText(vest3.tekst);
        }
    }

}

function prikaziSveVesti(pojedinacneVesti) {
    console.log('Prikazujem sve vesti', pojedinacneVesti);

    for (let i = 0; i < pojedinacneVesti.length; i++) {
        const vest = pojedinacneVesti[i];
        const imgElement = document.getElementById(`gridSlika${i + 1}`);
        const naslovElement = document.getElementById(`gridNaslov${i + 1}`);
        const tekstElement = document.getElementById(`gridTekst${i + 1}`);

        if (imgElement && naslovElement && tekstElement) {
            imgElement.src = vest.slika;
            naslovElement.textContent = vest.naslov;

            const reci = vest.tekst.split(' ');
            if (reci.length > 20) {
                tekstElement.textContent = cleanText(reci.slice(0, 20).join(' ') + '...');
            } else {
                tekstElement.textContent = cleanText(vest.tekst);
            }
        }
    }
}

function fetchOstaleVesti(){
    fetch('http://localhost/poks/conf/vesti_read.php')
        .then(response => response.json())
        .then(data => {
            const sortiraneVesti = data.sort((a, b) => b.id - a.id);

            const remainingNews = sortiraneVesti.slice(1);

            shuffleArray(remainingNews);
    
            const randomNewsArticles = remainingNews.slice(0, 3);
    
            prikaziSveVesti(randomNewsArticles);
            prikaziPojedinacnuVest(randomNewsArticles);
        })
        .catch(error => {
            console.error('Greška prilikom dohvatanja podataka:', error);
        });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}

var modal = document.getElementById('myModal');

var img = document.getElementById('vest-slika');
var modalImg = document.getElementById('img01');
var captionText = document.getElementById('caption');

document.getElementById('enlarge-icon').addEventListener('click', function() {
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;
});

var span = document.getElementsByClassName('close')[0];

span.onclick = function() {
    modal.style.display = "none";
}