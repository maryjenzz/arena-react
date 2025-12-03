import '../styles/style.css';

function WhatsAppButton() {
    const whatsappLink = "https://wa.me/5547999808398?text=Ol%C3%A1%21+Gostaria+de+fazer+uma+reserva.";

    return (
        <a href={whatsappLink} className="whatsapp-float-btn" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-whatsapp"></i>
        </a>
    );
}

export default WhatsAppButton;