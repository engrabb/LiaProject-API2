async function getData() {
    const response = await fetch('http://127.0.0.1:5000/api/data');
    const data = await response.json();
    console.log(data);
}

async function postData() {
    const data = { data: 'Some data to send to the backend' };

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