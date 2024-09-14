document.getElementById('imageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const prompt = document.getElementById('promptInput').value;
    fetch('/generate-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt })
    })
    .then(response => response.json())
    .then(data => {
        if (data.image_url) {
            const imageDiv = document.getElementById('imageResult');
            imageDiv.innerHTML = `<img src="${data.image_url}" alt="Image générée">`;
        } else {
            alert('Erreur lors de la génération de limage : ' + data.error);
        }
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi de la demande:', error);
        alert('Erreur lors de la génération de l\'image.');
    });
});
