const glavnaSlika = document.getElementById('glavnaSlika');
const naslovVesti = document.getElementById('naslovVesti');
const tekstVesti = document.getElementById('tekstVesti');
const prethodnaVestBtn = document.getElementById('prethodnaVestBtn');
const sledecaVestBtn = document.getElementById('sledecaVestBtn');
let trenutnaVestIndex = 0; 
let autoSlideInterval;

function postaviVrednosti(vest) {
    glavnaSlika.src = vest.slika; 
    naslovVesti.textContent = vest.naslov; 
    tekstVesti.textContent = vest.tekst; 

    var linkSlike = document.getElementById('slikaLink');
    var linkNaslova = document.getElementById('naslovLink');
    var linkOpširnije = document.getElementById('opsirnijeLink');
    var baseUrl = "http://localhost/poks/pojedinacna_vijest.html?id=";

    linkSlike.href = baseUrl + vest.id;
    linkNaslova.href = baseUrl + vest.id;
    linkOpširnije.href = baseUrl + vest.id;
}

function cleanText(text) {
    text = String(text);
    return text.replace(/\|\|/g, '').replace(/\|/g, '');
}

function prikaziPojedinacnuVest(pojedinacneVesti) {
    const vest = pojedinacneVesti[0];
    var link1 = document.getElementById(`vestCarouselLink1`);
    const imgElement = document.getElementById(`pojedinacnaSlika1`);
    const naslovElement = document.getElementById(`naslovPojedinacnihVesti1`);
    const tekstElement = document.getElementById(`tekstPojedinacnihVesti1`);
    var baseUrl = "http://localhost/poks/pojedinacna_vijest.html?id=";

    if (imgElement && naslovElement && tekstElement) {
        imgElement.src = vest.slika;
        naslovElement.textContent = vest.naslov;
        link1.href = baseUrl + vest.id;
        
        const reci = vest.tekst.split(' ');
        if (reci.length > 20) {
            tekstElement.textContent = cleanText(reci.slice(0, 20).join(' ') + '...');
        } else {
            tekstElement.textContent = cleanText(vest.tekst);
        }
    }

    const vest2 = pojedinacneVesti[1];
    var link2 = document.getElementById(`vestCarouselLink2`);
    const imgElement2 = document.getElementById(`pojedinacnaSlika2`);
    const naslovElement2 = document.getElementById(`naslovPojedinacnihVesti2`);
    const tekstElement2 = document.getElementById(`tekstPojedinacnihVesti2`);

    if (imgElement2 && naslovElement2 && tekstElement2) {
        imgElement2.src = vest2.slika;
        naslovElement2.textContent = vest2.naslov;
        link2.href = baseUrl + vest2.id;


        const reci2 = vest2.tekst.split(' ');
        if (reci2.length > 20) {
            tekstElement2.textContent = cleanText(reci2.slice(0, 20).join(' ') + '...');
        } else {
            tekstElement2.textContent = cleanText(vest2.tekst);
        }
    }

    const vest3 = pojedinacneVesti[2];
    var link3 = document.getElementById(`vestCarouselLink3`);
    const imgElement3 = document.getElementById(`pojedinacnaSlika3`);
    const naslovElement3 = document.getElementById(`naslovPojedinacnihVesti3`);
    const tekstElement3 = document.getElementById(`tekstPojedinacnihVesti3`);

    if (imgElement3 && naslovElement3 && tekstElement3) {
        imgElement3.src = vest3.slika;
        naslovElement3.textContent = vest3.naslov;
        link3.href = baseUrl + vest3.id;

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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}


fetch('conf/vesti_read.php')
    .then(response => response.json())
    .then(data => {
        const sortiraneVesti = data.sort((a, b) => b.id - a.id);

        const najnovijaVest = sortiraneVesti[0];
        postaviVrednosti(najnovijaVest);

        const remainingNews = sortiraneVesti.slice(1);

        shuffleArray(remainingNews);

        const randomNewsArticles = remainingNews.slice(0, 3);

        prikaziSveVesti(randomNewsArticles);
        prikaziPojedinacnuVest(randomNewsArticles);

    })
    .catch(error => {
        console.error('Greška prilikom dohvatanja podataka:', error);
    });

