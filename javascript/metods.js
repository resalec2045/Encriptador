// La letra "e" es convertida para "enter"
// La letra "i" es convertida para "imes"
// La letra "a" es convertida para "ai"
// La letra "o" es convertida para "ober"
// La letra "u" es convertida para "ufat"
const btnEncrypt = document.querySelector('.button-encriptador');
const btnDecrypt = document.querySelector('.button-desencriptador');
const btnCopy = document.querySelector('.button-copy')
const textarea = document.querySelector('.encriptador-input');

const containerHistory = document.querySelector('.history__container-box')
const infoHistory = document.querySelector('.info__history');

const newText = document.createElement("p");
newText.setAttribute("id", "text_converted");
newText.setAttribute("class", "info_menssage")

const regex = /^[a-z-0-9]*$/; 

btnCopy.addEventListener('click', () => {
    copyToClipboard()

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Tu mensaje fue copiado con éxito',
        showConfirmButton: false,
        timer: 1500
    })
});

btnEncrypt.addEventListener('click', () => {
    const firstText = textarea.value;
    let textConverted = null;

    if ( !(regex.test(firstText)) ) {

        alert()

    } else {
        textConverted = encrypt(firstText)
    }

    if (!(textConverted === null)) {
        replaceContainer( firstText, textConverted )
    }
    
});

btnDecrypt.addEventListener('click', () => {
    const firstText = textarea.value;
    let textConverted = null;

    if ( !(regex.test(firstText)) ) {

        alert()

    } else {
        textConverted = decrypt(firstText)
    }

    if (!(textConverted === null)) {
        replaceContainer( firstText, textConverted )
    }

});

const replaceContainer = ( textoInicial, textoFinal ) => {

    if (!(textoFinal == null)) {
        newText.innerHTML = `<b>El texto inicial es:</b> ${textoInicial}<br> <b>El texto final es:</b> ${textoFinal}`;
        containerHistory.replaceChild( newText, infoHistory );
    }

}

const encrypt = (texto) => {
    const textoReemplazado = texto.replace( /[a-z]/gi, (char) => {
        switch (char) {
            case 'a':
                return "ai"
            case 'e':
                return "enter"
            case 'i':
                return "imes"
            case 'o':
                return "ober"
            case 'u':
                return "ufat"
            default:
                return char 
        }
    })
    return textoReemplazado 
}

const decrypt = (texto) => {
    
    const textoReemplazado = texto
    .replaceAll( "ai", "a" )
    .replaceAll( "enter", "e")
    .replaceAll( "imes", "i")
    .replaceAll( "ober", "o")
    .replaceAll( "ufat", "u")
    
    return textoReemplazado

}

const copyToClipboard = ( ) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(newText.textContent);

    return Promise.reject("The Clipboard API is not available.");
};

const alert = () => {

    Swal.fire({
        title: 'Error!',
        text: 'El texto solo debe contener minúsculas y no puede contener caracteres especiales',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    })

}