
    // Your code here
function myPrompt(){
    const promptI = document.getElementById('promptInput');
    const inputValue = promptI.value;
    console.log(inputValue);
}
    

async function getData() {
    const response = await fetch('http://127.0.0.1:5000/api/data');
    const data = await response.json();
    console.log(data);
}

async function postData() {

    const prompt = document.getElementById('promptInput').value;

    const response = await fetch('/generate_image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
    });

    const data = await response.json();

    if (data.error) {
        console.error(data.error);
    } else {
        const imgElement = document.createElement('img');
        imgElement.src = data.image_url;

        document.getElementById('imageContainer').innerHTML = '';
        document.getElementById('imageContainer').appendChild(imgElement);
    }
}