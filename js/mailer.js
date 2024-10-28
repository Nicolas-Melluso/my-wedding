// Inicializa EmailJS con tu User ID
(function() {
    emailjs.init('ZLkzaUfMS7xs2hGzR');
})();

$(document).ready(function() {
    // Inicializa el carrusel de testimonios
    var owl = $("#carrousel").owlCarousel({
        items: 2,
        loop: true,
        margin: 0,
        responsiveClass: true,
        nav: true,
        dots: true,
        autoHeight: true,
        smartSpeed: 500,
        autoplay: true,
        autoplayTimeout: 5000
    });
    
    $('#contact-form').on('click', function(event) {
        event.preventDefault();
        
        var name = $('#name').val();
        var message = $('#message').val();
    
        if (name === "") {
            name = "Anónimo";
        }
    
        if (message === "") {
            message = "Les deseo a los novios la mejor vida!";        
        }
    
        addTestimonial(name, message, owl);
        
        // Envía el correo electrónico usando EmailJS
        emailjs.send('service_5u1pmgm', 'template_iyir80d', {
            from_name: name,
            message: message
        }).then(function(response) {
            console.log('Correo enviado con éxito', response.status, response.text);
        }, function(error) {
            console.log('Error al enviar el correo', error);
            alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
        });
        
        // Limpia los campos de entrada
        $('#name').val('');
        $('#message').val('');
    });
});

function addTestimonial(name, message, owl) {
    
    var newTestimonialHtml = `
        <div class="item">
            <div class="testimony-slide active text-center">
                <figure>
                    <img src="images/icon-annie-recorted.png" alt="user">
                </figure>
                <span>Anabella Comba</span>
                <blockquote>
                    <p>"Yo no lo obligué"</p>
                </blockquote>
            </div>
        </div>
        <div class="item">
            <div class="testimony-slide active text-center">
                <figure>
                    <img src="images/icon-default.png" alt="user">
                </figure>
                <span>${name}</span>
                <blockquote>
                    <p>"${message}"</p>
                </blockquote>
            </div>
        </div>
    `;

    // Añade el nuevo testimonio al carrusel
    owl.trigger('add.owl.carousel', [$(newTestimonialHtml)]);

    owl.trigger('destroy.owl.carousel');

    // Añade el nuevo testimonio directamente al HTML
    $('#carrousel').append(newTestimonialHtml);

    // Reinicializa el carrusel
    owl.owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        responsiveClass: true,
        dots: true,
        autoHeight: true,
        smartSpeed: 500,
        autoplay: true,
        autoplayTimeout: 5000
    });

    // Mueve al nuevo testimonio
    owl.trigger('to.owl.carousel', [$('#carrousel .item').length - 1, 300]);
}