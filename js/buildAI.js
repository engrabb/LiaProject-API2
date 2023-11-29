
async function postData() {
    const style = document.getElementById('styleSelect').value;
    const textValue = document.getElementById('editor');
    const prompt = textValue.value +", "+ style;


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
            const background = document.querySelector('.current-page');
            const imgElement = document.createElement('img');
            const textArray = textValue.value.split('---').at(-1);
            imgElement.src = data.image_url;
            localStorage.setItem(textArray, imgElement.src);
            const pic = localStorage.getItem(textArray);
            background.style.background = `url(${pic})`;

            // const newText = `![](${promptI})`;
            // textValue.value += newText;
            updatePreview();

        }
    } else {
        console.error('Preflight request failed');
    }
}

function showPic(){
    const input = document.getElementById('editor');
    const background = document.querySelector('.current-page');
    const pic = localStorage.getItem(input.value);

    const textArray = input.value.split('---').at(-1);

    // console.log(input);
    console.log(background);
    // console.log(pic);
    console.log(textArray);

    // background.style.background = `url(${pic})`;

}