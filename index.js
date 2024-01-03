document.addEventListener('DOMContentLoaded', function () {
    loadContactActions();
    loadNavBarStyle();
    loadYear();

    function loadContactActions() {
        const btnOpen = document.querySelector('#contact__btnOpen');
        const btnClose = document.querySelector('#contact__btnClose');
        const btnSubmit = document.querySelector('#btnSubmit__contact');

        btnOpen.addEventListener('click', openContactForm);
        btnClose.addEventListener('click', closeContactForm);
        btnSubmit.addEventListener('click', SendMessageForm);
    }

    function loadNavBarStyle() {
        const navDesktop = document.querySelector('.nav__desktop');
        const homeSection = document.querySelector('.home__section');
        const nextSection = homeSection.nextElementSibling;
        const nextSectionPosY = nextSection.offsetTop;

        window.addEventListener('scroll', function () {
            if ((window.scrollY + 100) > nextSectionPosY) {
                navDesktop.style.backgroundColor = '#1f45548f';
                
            } else {
                navDesktop.style.backgroundColor = 'transparent';
            }
        });
    }

    function loadYear() {
        const spanYear = document.getElementById('contact__year');
        const date = new Date();
        spanYear.innerHTML = date.getFullYear();
    }

    function openContactForm() {
        const frmContact = document.querySelector('.contact__form-container');
        const { body, documentElement }= document;
        const scrollHeight = Math.max(body.scrollHeight, documentElement.scrollHeight);
            window.scrollTo({ top: scrollHeight });
            frmContact.style.left = 0;
            body.style.overflowY = 'hidden';
    }

    function closeContactForm() {
        const frmContact = document.querySelector('.contact__form-container');
        frmContact.style.left = '-2000px';
        document.body.style.overflowY = 'scroll';
    }

    function cleanContactForm() {
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    }

    async function SendMessageForm() {
        const inputName = document.getElementById('name').value;
        const inputEmail = document.getElementById('email').value;
        const inputMessage = document.getElementById('message').value;
            
        await sendEmail(inputName, inputEmail, inputMessage);
        cleanContactForm();
        closeContactForm();
        window.location.hash = '#';
        window.location.reload();
    }

    async function sendEmail(name, email, message) {
        const url = 'https://mailapi-production.up.railway.app/sendmail';
        try {
            const payload = {
                name,
                email,
                message
            };

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            if (!response.ok) {
                throw new Error('Hubo un error al enviar la petición.');
            }

            const data = await response.json();
            const { status, error } = data;

            if (status === 'fail') {
                throw new Error(`Error: ${error}`);
            }

            console.log('El mensaje ha sido enviado correctamente, gracias por su interés.');
        } catch (err) {
            console.error('Error en la petición:', err)
        }
    }
});

