
async function postData() {
    const style = document.getElementById('styleSelect').value;
    const textValue = document.getElementById('editor');
    const prompt = textValue.value + ", " + style;


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
            background.style.width = "100%";
            background.style.height = "100%";
            background.style.backgroundRepeat = "no-repeat";
            background.style.backgroundPosition = "center center"

            updatePreview();

        }
    } else {
        console.error('Preflight request failed');
    }
}

function testButton() {
    const input = document.getElementById('editor');
    const background = document.querySelector('.current-page');
    const textArray = input.value.split('---').at(-1);

    const pic = localStorage.getItem(textArray);

    background.style.background = `url(${pic})`;
    background.style.backgroundSize = "cover";
    background.style.width = "100%";
    background.style.height = "100%";
    background.style.backgroundRepeat = "no-repeat";
    background.style.backgroundPosition = "center center"

    // console.log(input);
    console.log(background);
    // console.log(pic);
    console.log(textArray);

    // background.style.background = `url(${pic})`;

}