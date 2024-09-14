document.getElementById('aiForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const inputText = document.getElementById('inputText').value;
  
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: inputText })
    });
  
    const data = await response.json();
    document.getElementById('response').innerText = data.message;
  });
  