// Inicializa EmailJS con tu User ID
(function() {
    emailjs.init('ZLkzaUfMS7xs2hGzR');
})();

$(document).ready(function() {
    $('#foto-1').on('click', function(event) {
        event.preventDefault();
        
        var name = $('#name').val();
        var message = $('#message').val();
    
        if (!name || !message) {
            alert("Es necesario escribir nombre y mensaje por favor");
        } else { 
            var newCommentHtml = `
                <p><strong>${name}:</strong> ${message}</p>
            `;

            // Añade el nuevo testimonio directamente al HTML
            $('#mensajes').append(newCommentHtml);
            
            // Envía el correo electrónico usando EmailJS
            mailer(name, message);
            
                // Limpia los campos de entrada
            $('#name').val('');
            $('#message').val('');
        }
    });

    $('#foto-2').on('click', function(event) {
        event.preventDefault();
        
        var name = $('#name2').val();
        var message = $('#message2').val();
    
        if (!name || !message) {
            alert("Es necesario escribir nombre y mensaje por favor");
        } else { 
            var newCommentHtml = `
                <p><strong>${name}:</strong> ${message}</p>
            `;

            // Añade el nuevo testimonio directamente al HTML
            $('#mensajes2').append(newCommentHtml);
            
            // Envía el correo electrónico usando EmailJS
            mailer(name, message);

            // Limpia los campos de entrada
            $('#name2').val('');
            $('#message2').val('');
        }
    });
});


function mailer(name, message) {
// Envía el correo electrónico usando EmailJS
    emailjs.send('service_5u1pmgm', 'template_5fuk1nq', {
        from_name: name,
        message: message
    }).then(function(response) {
        console.log('Correo enviado con éxito', response.status, response.text);
    }, function(error) {
        console.log('Error al enviar el correo', error);
    alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
});
}