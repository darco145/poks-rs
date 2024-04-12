document.addEventListener("DOMContentLoaded", function() {
    var allGroups = {}; 

    document.querySelectorAll('.btn input[type="radio"]').forEach(function(radio) {
        if (!allGroups[radio.name]) {
            allGroups[radio.name] = null;
        }

        radio.addEventListener('click', function(e) {
            var group = allGroups[radio.name];
            if (radio === group) {
                radio.checked = false;
                radio.parentNode.classList.remove('active');
                allGroups[radio.name] = null; 
            } else {
                allGroups[radio.name] = radio;
                document.querySelectorAll(`input[name="${radio.name}"]`).forEach(function(item) {
                    item.parentNode.classList.remove('active');
                });
                radio.parentNode.classList.add('active');
            }
        });
    });

    document.getElementById("posaljiBtn").addEventListener("click", function(e) {
        e.preventDefault(); 
        const formData = new FormData(document.getElementById("anketaForma"));
        const data = {};
        formData.forEach((value, key) => data[key] = value);

        console.log('JSON zahtev:', JSON.stringify(data));

        fetch('conf/anketa.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            if(data === 'uspesno') {
                porukaStatusa.textContent = 'Анкета је успешно попуњена';
                porukaStatusa.style.color = 'green';
            }else if(data === 'popunjena') {
                porukaStatusa.textContent = 'Нажалост, анкету сте већ попунили';
                porukaStatusa.style.color = 'red';
            }else {
                porukaStatusa.textContent = 'Дошло је до грешке, молимо покушајте касније';
                porukaStatusa.style.color = 'red';
            }

        })
        .catch((error) => {
            console.error('Greška:', error);
        });
    });

    const posaljiBtn = document.getElementById("posaljiBtn");
    const form = document.getElementById("anketaForma");

    posaljiBtn.disabled = true; 

    form.addEventListener('change', function() {
        let svePopunjeno = true;

        document.querySelectorAll('.btn.obavezno input[type="radio"]').forEach(function(radio) {
            const ime = radio.getAttribute('name');
            const izabrano = document.querySelector(`input[name="${ime}"]:checked`);

            if (!izabrano) {
                svePopunjeno = false;
            }
        });

        posaljiBtn.disabled = !svePopunjeno;
    });
});
