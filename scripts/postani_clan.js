document.addEventListener('DOMContentLoaded', function() {
    flatpickr("#datum", {
        dateFormat: "d.m.Y", 
    });
});

var input = document.querySelector("#broj_telefona");
var iti = window.intlTelInput(input, {
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", 
    preferredCountries: ["ba", "rs", "me"],
    initialCountry: "auto",
    geoIpLookup: function(success, failure) {
        fetch('/poks/conf/ipinfo_proxy.php') 
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Failed to fetch user location');
        })
        .then(ipinfo => {
            success(ipinfo.country);
        }).catch(e => {
            failure(e);
        });
    }
});

async function checkEmailStatus() {
    try {
        const response = await fetch('conf/clanovi_read.php');
        const data = await response.json();
        const emails = data.map(clan => clan.email);
        return emails;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}


document.getElementById('ime').addEventListener('input', function() {
    this.setCustomValidity(''); 
    this.checkValidity(); 
});

document.getElementById('email').addEventListener('input', function() {
    this.setCustomValidity(''); 
    this.checkValidity(); 
});

$(document).ready(function(){
    $('input[name="trenutni-radni-status"]').click(function(){
        if ($('#student').is(':checked')) {
            $('#student-details').show();
        } else {
            $('#student-details').hide();
            $('#student-details input').val('');
        }
    });
});

$(document).ready(function(){
    $('input[name="trenutni-radni-status-tel"]').click(function(){
        if ($('#student-tel').is(':checked')) {
            $('#student-details').show();
        } else {
            $('#student-details').hide();
            $('#student-details input').val('');
        }
    });
});

/*
fetch('/ipinfo_proxy.php')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error('Error fetching IP info', error));
*/

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("formular").addEventListener("submit", async function(event) {
        var form = event.target;
        var formular = document.getElementById('formularKontejner');

        if (!form.checkValidity()) {
            form.reportValidity(); 
            return; 
        }
 
        var element = document.getElementById("skrol");

        event.preventDefault(); 

        var ime_prezime = document.getElementById("ime").value;
        var ime;
        var prezime;
        var radni_status;
        var strucna_sprema;
        var fakultet = "-";
        var fullPhoneNumber = iti.getNumber();

        var ime_prezime_polje = document.getElementById("ime");

        ime_prezime_polje.addEventListener('input', function() {
            var unos = ime_prezime_polje.value;
            var delovi = unos.split(" ");
        
            if (delovi.length > 1) {
                ime_prezime_polje.style.border = '';
                var greska = document.getElementById("ime_greska");
                greska.textContent = '';
                formular.classList.remove('form-error-animation');
                porukaStatusa.textContent = '';
            }
        });
        
        if (ime_prezime.trim() !== "") {
            var delovi = ime_prezime.split(" ");
            
            if (delovi.length > 1) {
                ime = delovi[0];
                prezime = delovi.slice(1).join(" ");
            } else {
                formular.classList.add('form-error-animation');
                var ime_prezime = document.getElementById("ime");
                ime_prezime.style.border = '1px solid red';
                var greska = document.getElementById("ime_greska");
                greska.textContent = 'Морате унети име и презиме!'
                greska.style.color = 'red';
                ime = "";
                prezime = "";
                porukaStatusa.textContent = 'Дошло је до грешке, неисправни подаци!';
                porukaStatusa.style.color = 'red';
                return;
            }
        } else {
            alert("Polje ne sme biti prazno.");
            ime = "";
            prezime = "";
            return;
        }


        if ($('#student').is(':checked')) {
            radni_status = "student";
        } else if ($('#student-tel').is(':checked')) {
            radni_status = "student";
        } 
        else if ($('#nezaposlen').is(':checked')) {
            radni_status = "nezaposlen";
        } 
        else if ($('#umetnik').is(':checked')) {
            radni_status = "umetnik";
        }
        else if ($('#zaposlen').is(':checked')){
            radni_status = "zaposlen";
        }
        else if ($('#domacica').is(':checked')) {
            radni_status = "domacica";
        }
        else if ($('#penzioner').is(':checked')) {
            radni_status = "penzioner";
        }
        else if($('#poljoprivrednik').is(':checked')) {
            radni_status = "poljoprivrednik";
        }
        else if ($('#drugo').is(':checked')) {
            radni_status = "drugo";
        }else{
            radni_status = "-";
        }

        if ($('#osnovna').is(':checked')) {
            strucna_sprema = "osnovna";
        }else if ($('#kv').is(':checked')) {
            strucna_sprema = "kv";
        }
        else if ($('#vkv').is(':checked')) {
            strucna_sprema = "vkv";
        }
        else if ($('#srednja').is(':checked')) {
            strucna_sprema = "srednja";
        }
        else if ($('#visa').is(':checked')){
            strucna_sprema = "visa";
        }
        else if ($('#visoka').is(':checked')) {
            strucna_sprema = "visoka";
        }
        else if ($('#magistrerijum').is(':checked')) {
            strucna_sprema = "magistrerijum";
        }
        else if($('#doktorat').is(':checked')) {
            strucna_sprema = "doktorat";
        }else {
            strucna_sprema = "-"
        }

        
        var mesto_rodj = document.getElementById("mesto").value;
        var datum_rodjenja = document.getElementById("datum").value;
        var drzava_rodj = document.getElementById("drzava_rodjenja").value;
        var mesto_stan = document.getElementById("mesto_prebivalista").value;
        var postanski_broj = document.getElementById("postanski_broj").value;
        var drzava_stan = document.getElementById("drzava_prebivalista").value;
        var email = document.getElementById("email").value;
        var naziv_skole = document.getElementById("naziv-skole").value;
        var zvanje = document.getElementById("zvanje").value;
        var specijalizacija = document.getElementById("specijalizacija").value;
        var komentar = document.getElementById("komentar").value;

        if (mesto_rodj == null || mesto_rodj == undefined || mesto_rodj == "") {
            mesto_rodj = "-";
        }
        if (drzava_rodj == null || drzava_rodj == undefined || drzava_rodj == "") {
            drzava_rodj = "-";
        }
        if (mesto_stan == null || mesto_stan == undefined || mesto_stan == "") {
            mesto_stan = "-";
        }
        if (drzava_stan == null || drzava_stan == undefined || drzava_stan == "") {
            drzava_stan = "-";
        }
        if (postanski_broj == null || postanski_broj == undefined || postanski_broj == "") {
            postanski_broj = "-";
        }

        if (naziv_skole == null || naziv_skole == undefined || naziv_skole == "") {
            naziv_skole = "-";
        }
        if (zvanje == null || zvanje == undefined || zvanje == "") {
            zvanje = "-";
        }
        if (specijalizacija == null || specijalizacija == undefined || specijalizacija == "") {
            specijalizacija = "-";
        }
        if (komentar == null || komentar == undefined || komentar == "") {
            komentar = "-";
        }

        var unetiDatum = parseDate(datum_rodjenja);
        var trenutniDatum = new Date();
        var razlikaUGodinama = trenutniDatum.getFullYear() - unetiDatum.getFullYear();
        var m = trenutniDatum.getMonth() - unetiDatum.getMonth();

        if (m < 0 || (m === 0 && trenutniDatum.getDate() < unetiDatum.getDate())) {
            razlikaUGodinama--;
        }

        var datum_greska = document.getElementById("datum_greska");
        var datum_polje = document.getElementById("datum");
        datum_greska.textContent = '';
        datum_polje.style.border = '';

        if (razlikaUGodinama < 16) {
            formular.classList.add('form-error-animation');
            datum_polje.style.border = '1px solid red';
            datum_greska.textContent = 'Чланство је омогућено само старијима од 16 година!';
            datum_greska.style.color = 'red';
            porukaStatusa.textContent = 'Дошло је до грешке, неисправни подаци!';
            porukaStatusa.style.color = 'red';
            return;
        }

        var broj_polje = document.getElementById("broj_telefona");
        var broj_telefona_greska = document.getElementById("broj_telefona_greska");
        broj_telefona_greska.textContent = '';
        broj_polje.style.border = '';

        if (fullPhoneNumber.length < 10 || fullPhoneNumber.length > 15) {
            formular.classList.add('form-error-animation');

            broj_polje.style.border = "1px solid red";
            broj_telefona_greska.textContent = 'Број телефона није исправан!'
            broj_telefona_greska.style.color = 'red';
            porukaStatusa.textContent = 'Дошло је до грешке, неисправни подаци!';
            porukaStatusa.style.color = 'red';

            broj.addEventListener('input', function() {
                broj.style.border = ""; 
            });

            return;
        }

        var email_polje = document.getElementById("email");
        var email_greska = document.getElementById("email_greska");
        email_greska.textContent = '';
        email_polje.style.border = '';
        formular.classList.remove('form-error-animation', 'form-success-animation');

        const emails = await checkEmailStatus(); 

        if (emails.includes(email)) {
            
            formular.classList.add('form-error-animation');
            email_polje.style.border = '1px solid red';
            email_greska.textContent = 'Емаил адреса већ постоји!';
            email_greska.style.color = 'red';
            porukaStatusa.textContent = 'Дошло је до грешке, неисправни подаци!';
            porukaStatusa.style.color = 'red';
            return; 
        }


        var data = {
            ime: ime,
            prezime: prezime,
            datum_rodjenja: datum_rodjenja,
            mesto_rodj: mesto_rodj,
            drzava_rodj: drzava_rodj,
            mesto_stan: mesto_stan,
            postanski_broj: postanski_broj,
            drzava_stan: drzava_stan,
            broj: fullPhoneNumber,
            email: email,
            strucna_sprema: strucna_sprema,
            naziv_skole: naziv_skole,
            zvanje: zvanje,
            specijalizacija: specijalizacija,
            radni_status: radni_status,
            fakultet: fakultet,
            komentar: komentar
        };


        fetch('conf/clanovi.php', {
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
            if(data.status === 'success') {
                formular.classList.add('form-success-animation');
                porukaStatusa.textContent = 'Подаци су успешно послати';
                porukaStatusa.style.color = 'green';
            } else {
                formular.classList.add('form-error-animation');
                porukaStatusa.textContent = 'Дошло је до грешке, молимо покушајте касније';
                porukaStatusa.style.color = 'red';
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        })
        .catch(error => {
            console.error('Greška prilikom slanja zahteva na server:', error);
            formular.classList.add('form-error-animation');
        });
    });
});


function parseDate(input) {
    var parts = input.split('.');
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

