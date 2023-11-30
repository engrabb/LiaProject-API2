
async function postData() {
    const style = document.getElementById('styleSelect').value;
    const textValue = document.getElementById('editor');
    const prompt = textValue.value +", "+ style;
    const size = pageSize();


    const optionsResponse = await fetch('http://127.0.0.1:5000/api/post_data', {
        method: 'OPTIONS',
    });


    if (optionsResponse.ok) {
        const response = await fetch('http://127.0.0.1:5000/api/post_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: prompt, pageSize: size}),
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
    const newPic = reSizePic(pic);

    // const textArray = input.value.split('---').at(-1);

    // console.log(input);
    // console.log(background);
    // console.log(pic);
    // console.log(textArray);

    background.style.background = `url(${newPic})`;

}

function pageSize(){
    const size = document.getElementById('nav-btn').textContent;
    let pageS;
    console.log();
    if (size==="Go to standing"){
        pageS = "1792x1024";

        return pageS
    }
    else{
        pageS = "1024x1792";

        return pageS
    }
}

function reSizePic(picUrl){
    var img = new Image();

    img.src = picUrl
    img.crossOrigin = 'Anonymous';
    var targetWidth = 1024;
    var targetHeight = 512;

    img.onload = function() {
    
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        
        
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    
        const dataURI = canvas.toDataURL();


        console.log(dataURI);


        picUrl.src = dataURI;
    };
}
