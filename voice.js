
const changes = document.querySelector( 'body>#app>.home>div>div>div>header>.featured-message' );
const config = { attributes: true };
const synth = window.speechSynthesis;
const voices = synth.getVoices();
var called = false

const langs = {
    "pt_BR": 16,
    "en_US": 1,
};

const msg = {
    "ticket": {
        "16": "Senha,",
        "1": "Ticket,",
    },
    "go": {
        "16": ", por favor dirija-se ao:",
        "1": ", please go to:",
    }

}

const lang = langs[ JSON.parse( localStorage.getItem( 'triagem-touch.v2.config' ) ).locale ];

const callback = ( m, o ) => if ( changes.children[1].innerText != '' && !called ) { changes.click() };
const observer = new MutationObserver(callback);
observer.observe( changes, config );

changes.addEventListener( 'click', () => {
    if ( !called ) {
        called = true;
    }
    setTimeout( () => {
        let utterThis = new SpeechSynthesisUtterance( `${msg['ticket'][lang]} ${changes.children[1].innerText} ${msg['go'][lang]} ${changes.children[2].innerText}` );
        utterThis.voice = voices[ lang ];        
        synth.speak( utterThis );
        called = false;
    }, 1000);
} );
