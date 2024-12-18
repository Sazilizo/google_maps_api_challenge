const apiKey = process.env.GOOGLE_API_KEY;

console.log("API Key:", apiKey); 


document.getElementById('api-key').innerText = `API Key: ${apiKey}`;