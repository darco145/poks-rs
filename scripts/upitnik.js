

console.log('aaaa');

/*
fetch('/ipinfo_proxy.php')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error('Error fetching IP info', error));
*/

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("formular").addEventListener("submit", function(event) {

        var element = document.getElementById("skrol");
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        event.preventDefault(); 

        var ime_prezime = document.getElementById("ime").value;
        var ime;
        var prezime;
        
        if (ime_prezime.trim() !== "") {
            var delovi = ime_prezime.split(" ");
        
            ime = delovi[0];
            prezime = delovi.slice(1).join(" "); 
        } else {
            ime = "";
            prezime = "";
        }
       
        var email = document.getElementById("email").value;
        var naslov = document.getElementById("naslov").value;
        var pitanje = document.getElementById("pitanje").value;
 

        console.log("ime: " + ime);
        console.log("prezime: " + prezime);
        console.log("email: " + email);
        console.log("naslov: " + naslov);
        console.log("pitaje: " + pitanje);

        var data = {
            ime: ime,
            prezime: prezime,
            email: email,
            naslov: naslov,
            pitanje: pitanje
        };

        var formular = document.getElementById('formularKontejner');

        fetch('../conf/pitanja.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if(data.status === 'success') {
                porukaStatusa.textContent = 'Питање је успешно послато';
                porukaStatusa.style.color = 'green';
            } else {
                formular.classList.add('form-error-animation');
                porukaStatusa.textContent = 'Дошло је до грешке, молимо покушајте касније';
                porukaStatusa.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Greška prilikom slanja zahteva na server:', error);
            porukaStatusa.textContent = 'Дошло је до грешке, молимо покушајте касније';
            porukaStatusa.style.color = 'red';
            formular.classList.add('form-error-animation');
        });
    });
});
