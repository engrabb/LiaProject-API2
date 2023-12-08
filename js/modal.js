const openModal = document.querySelector('#previewBtn');
let modalPages = modal.querySelector('.modal-pages');
const closeModal = modal.querySelector('.close-modal');
const modalPSize = document.getElementById('modalP'); 

function modalOpen() {
    modal.showModal();
    modalPages.innerHTML = document.querySelector('.output-area').innerHTML;
    const allPages = modalPages.querySelectorAll('li');
    modalPages.removeAttribute('style');
    PreviewLayout = document.getElementById('nav-btn').textContent;
    console.log(PreviewLayout);
    allPages.forEach(x => {
        if(PreviewLayout === 'Portrait'){
            x.removeAttribute('id');
            x.removeAttribute('class');
            x.classList.add('modal-page');  
        }
        else{
            x.removeAttribute('id');
            x.removeAttribute('class');
            x.classList.add('modal-pageS');
        }
    });
    allPages[0].classList.add('model-current-page');
    translateXAmount = 0;
    modalPrevButton.classList.add('is-hidden');

    if (allPages.length === 1) {
        allPages[0].style.marginRight = 0;
    }

    if (allPages.length <= 2) {
        modalNextButton.classList.add('is-hidden');
    }
    else {
        modalNextButton.classList.remove('is-hidden');
    }
}

function modalClose() {
    modal.close();
}


openModal.addEventListener('click', modalOpen);
closeModal.addEventListener('click', modalClose)
