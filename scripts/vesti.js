let trenutnaStranica = 1;
const vestiPoStranici = 5;
let ukupnoVesti = 0;

window.onload = function() {
    fetchVesti();
};

function cleanText(text) {
    text = String(text);
    return text.replace(/\|\|/g, '').replace(/\|/g, '');
}

function fetchVesti() {
    fetch('conf/vesti_read.php')
        .then(response => response.json())
        .then(vesti => {
            pojedinacneVesti = vesti; 
            ukupnoVesti = vesti.length; 
            prikaziVestiZaStranicu();
        })
        .catch(error => console.error('Error:', error));
}

function prikaziVestiZaStranicu() {
    pojedinacneVesti.sort((a, b) => b.id - a.id);

    const pocetak = (trenutnaStranica - 1) * vestiPoStranici;
    const kraj = pocetak + vestiPoStranici;
    const vestiZaPrikaz = pojedinacneVesti.slice(pocetak, kraj);

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    vestiZaPrikaz.forEach(vest => {
        const skraceniTekst = cleanText(vest.tekst.split(' ').slice(0, 40).join(' ') + '...');
        const datum = formatirajDatum(vest.datum);

        const vestDiv = document.createElement('div');
        vestDiv.classList.add('news-item', 'mb-4');
        vestDiv.innerHTML = `
            <div class="row">
                <div class="col-md-4 col-12">
                    <a href="pojedinacna_vijest.html?id=${vest.id}">
                    <div class="image-container" style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center;">
                        <img src="${vest.slika}" class="img-fluid news-image">
                    </div>
                    </a>
                </div>
                <div class="col-md-8 col-12">
                    <div class="news-content">
                        <a href="pojedinacna_vijest.html?id=${vest.id}" class="news-title-link">
                            <h5 class="news-title">${vest.naslov}</h5>
                        </a>
                        <p class="news-text">${skraceniTekst}</p>
                        <p class="news-author-date">Аутор текста: ${vest.autor}&nbsp;&nbsp;&nbsp;&middot;&nbsp;&nbsp;&nbsp; ${datum}</p>
                        <a href="pojedinacna_vijest.html?id=${vest.id}" class="btn btn-primary">Опширније <span aria-hidden="true">&rarr;</span></a>
                    </div>
                </div>
            </div>`;
        newsContainer.append(vestDiv);
    });

    azurirajNavigaciju();
}
function azurirajNavigaciju() {
    const ukupnoStranica = Math.ceil(ukupnoVesti / vestiPoStranici);
    const paginationContainer = document.getElementById('pagination');
    
    paginationContainer.innerHTML = '';

    const btnPrethodna = document.createElement('button');
    btnPrethodna.className = 'btn btn-primary';
    btnPrethodna.textContent = 'Претходна';
    btnPrethodna.onclick = function() {
        if (trenutnaStranica > 1) {
            trenutnaStranica--;
            prikaziVestiZaStranicu(pojedinacneVesti);
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
            prikaziVestiZaStranicu(pojedinacneVesti);
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
            prikaziVestiZaStranicu(pojedinacneVesti);
        }
    };
    paginationContainer.appendChild(btnSledeca);
}

function skrolovatiNaVrh() {
     window.scrollTo({ top: 0, behavior: 'smooth' });
}

function formatirajDatum(datum) {
    const meseci = ["јануара", "фебруара", "марта", "априла", "маја", "јуна", "јула", "августа", "септембра", "октобра", "новембра", "децембра"];
    const delovi = datum.split('-');

    const godina = delovi[0];
    const mesec = meseci[parseInt(delovi[1], 10) - 1]; 
    const dan = parseInt(delovi[2], 10); 

    return `${dan}. ${mesec} ${godina}. године`;
}