document.addEventListener('DOMContentLoaded', function () {
    loadContactActions();
    loadNavBarStyle();

    function loadContactActions() {
        const btnOpen = document.querySelector('#contact__btnOpen');
        const btnClose = document.querySelector('#contact__btnClose');
        const frmContact = document.querySelector('.contact__form-container');
        const { body, documentElement }= document;

        btnOpen.addEventListener('click', () => {
            const scrollHeight = Math.max(body.scrollHeight, documentElement.scrollHeight);
            window.scrollTo({ top: scrollHeight });
            frmContact.style.left = 0;
            body.style.overflowY = 'hidden';
        });
        
        btnClose.addEventListener('click', () => {
            frmContact.style.left = '-2000px';
            body.style.overflowY = 'scroll';
        });
    }

    function loadNavBarStyle() {
        const navDesktop = document.querySelector('.nav__desktop');
        const homeSection = document.querySelector('.home__section');
        const nextSection = homeSection.nextElementSibling;
        const nextSectionPosY = nextSection.offsetTop;

        window.addEventListener('scroll', function () {
            console.log('here');
            if ((window.scrollY + 100) > nextSectionPosY) {
                navDesktop.style.backgroundColor = '#1f45548f';
                
            } else {
                navDesktop.style.backgroundColor = 'transparent';
            }
        });
    }    
});

