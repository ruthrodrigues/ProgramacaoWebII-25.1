const heroi = document.querySelector('.mario');
const cano = document.querySelector('.cano');

const pulo = (event) =>{
    if (event.key == "ArrowUp"){
        heroi.classList.add('pulo1');
    }
    setTimeout(()=>{
        heroi.classList.remove('pulo1');
    },500)
}

const loop = setInterval(()=>{
    const canoPosicao = cano.offsetLeft;
    const marioPosicao = +window.getComputedStyle(heroi).bottom.replace('px','');

    if (canoPosicao <= 120 && canoPosicao > 0 && marioPosicao < 80){
        cano.style.animation = 'none'
        heroi.style.animation = 'none'
        heroi.src = 'imagens/game-over.png'
    }
},20);

document.addEventListener('keydown', pulo);