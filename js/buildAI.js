
async function postData() {
    const style = document.getElementById('styleSelect').value;
    const textValue = document.querySelector('.current-page').textContent.trim();
    const prompt = textValue + ", " + style;
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
            body: JSON.stringify({ data: prompt, pageSize: size }),
        });
        console.log(size);
        const data = await response.json();

        if (data.error) {
            console.error(data.error);
        } else {
            const background = document.querySelector('.current-page');
            const imgElement = document.createElement('img');
            const textArray = document.querySelector('.current-page').textContent.trim();
            imgElement.src = data.image_url;
            localStorage.setItem(textArray, imgElement.src);

            showPic();

        }
    } else {
        console.error('Preflight request failed');
    }
}

function showPic() {
    const pages = document.querySelectorAll('li[class*="page"]');
    console.log(pages);
    const activePage = document.querySelector('li.current-page');

    // Check if an active page is found
    if (activePage) {
        // Extract the numeric part from the class name
        const pageNumberMatch = activePage.className.match(/page(\d+)/);

        // Check if a match is found
        if (pageNumberMatch) {
            const textArray = document.querySelector('.current-page').textContent.trim();
            const pageNumber = parseInt(pageNumberMatch[1]);
            console.log("Active Page Number:", pageNumber);
            console.log(textArray);
            const imageData = localStorage.getItem(textArray);
            const existingImgElement = activePage.querySelector('img');

            if (imageData && !existingImgElement) {
                const imgElement = document.createElement('img');
                // Set the source of the img element to the retrieved image data
                imgElement.src = imageData;
                console.log(imgElement);

                // Append the img element to the active page
                activePage.appendChild(imgElement);
            }
            else {
                console.log("Image data not found in local storage");
            }

        } else {
            console.log("Unable to determine page number from class name");
        }
    } else {
        console.log("No active page found");
    }
}


function showURL() {
    const style = document.getElementById('styleSelect').value;
    const textValue = document.querySelector('.current-page').textContent.trim();
    const prompt = textValue + ", " + style;
    console.log(textValue);
    console.log(prompt);
}

function pageSize() {
    const size = document.getElementById('nav-btn').textContent;
    let pageS;
    console.log();
    if (size === "Portrait") {
        pageS = "1792x1024";


        return pageS	    // Append the img element to the textOutput div
    }	    // if (!background.contains(imgElement)) {
    else {	    //     background.appendChild(imgElement);
        pageS = "1024x1792";	    // }


        return pageS	    // Uncomment the following line if you want to set it as a background as well
    }	    // background.style.background = `url(${pic})`;
}