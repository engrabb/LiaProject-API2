
async function postData() {
    const style = document.getElementById('styleSelect').value;
    const promptI = document.getElementById('promptInput').value;
    const prompt = promptI +", "+ style;
    const textValue = document.getElementById('editor');


    const optionsResponse = await fetch('http://127.0.0.1:5000/api/post_data', {
        method: 'OPTIONS',
    });


    if (optionsResponse.ok) {
        const response = await fetch('http://127.0.0.1:5000/api/post_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: prompt }),
        });

        const data = await response.json();

        if (data.error) {
            console.error(data.error);
        } else {
            const imgElement = document.createElement('img');
            imgElement.src = data.image_url;
            localStorage.setItem(promptI, imgElement.src);
            const newText = `![](${promptI})`;
            textValue.value += newText;
            updatePreview();

        }
    } else {
        console.error('Preflight request failed');
    }
}