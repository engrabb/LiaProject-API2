
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
    const promptI = document.getElementById('promptInput');
    const promptValue = promptI.value;
    const data = { data: promptValue };

    const response = await fetch('http://127.0.0.1:5000/api/post_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
}