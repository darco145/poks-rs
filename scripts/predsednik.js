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
