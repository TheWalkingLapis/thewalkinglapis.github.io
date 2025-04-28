function add_interaction_to_image_gallery() {
    const projects = document.querySelectorAll('.project-card');

    projects.forEach(project => {
    const images = project.querySelectorAll('img');
    let current = 0;
    
    const showImage = (index) => {
        images.forEach(img => {
            img.classList.remove('active')
            img.style.zIndex = 1;
        });
        images[index].classList.add('active');
        images[index].style.zIndex = 10;
    };
    
    project.querySelector('.prev').addEventListener('click', () => {
        current = (current === 0) ? images.length - 1 : current - 1;
        showImage(current);
    });

    project.querySelector('.next').addEventListener('click', () => {
        current = (current === images.length - 1) ? 0 : current + 1;
        showImage(current);
    });

    showImage(current);
    });
}

function add_fullscreen_listener() {
    const images = document.querySelectorAll('[type=gallery');
    const div = document.getElementById('fullscreenDiv');
    const divImage = document.getElementById('fullscreenImage');
    const closeBtn = document.getElementById('closeBtn');

    // Function to open the image in full screen
    images.forEach(image => {
        image.addEventListener('click', function() {
            const src = this.getAttribute('src');
            console.log(src)
            divImage.setAttribute('src', src);
            div.style.display = 'flex';
        });
    });

    // Close the modal if you click anywhere 
    div.addEventListener('click', function(e) {
        div.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', add_interaction_to_image_gallery)
document.addEventListener('DOMContentLoaded', add_fullscreen_listener)