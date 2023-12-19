let movimientos, totalMovimientos;
let contador = 0;
function ilumninar(posicion, tiempo) {  
    setTimeout(()=>{
        document.querySelector('.celda[pos="' + posicion + '"]').classList.add("active");
        setTimeout(() => {
            document.querySelector('.celda[pos="' + posicion + '"]').classList.remove("active");
        }, 300);
    },tiempo)
}

function setMovimiento(actual) {
    movimientos.push(Math.floor(Math.random()*4)+1);
    if(actual<totalMovimientos){
        setMovimiento(++actual);
    }
}

function empezarJuego() {
    quitarMarcador();
    contador = 0;
    movimientos = [];
    totalMovimientos = 1;
    document.querySelector(('#empezar')).style.display = 'none';
    document.querySelector(('#mensaje')).style.display = 'block';
    sequencia();
}
function sequencia(){
    movimientos = [];
    setMovimiento(1);
    document.querySelector(('#mensaje')).innerHTML= 'El Psicopato dice: ';
    
    for (let i = 0; i < movimientos.length; i++) {
        ilumninar(movimientos[i], i * 600);
    }
    setTimeout(() => {
        document.querySelector(('#mensaje')).innerHTML = 'Tu turno';
    }, 600 * movimientos.length);
}

function clickCelda(e) {
    let posicion = e.target.getAttribute('pos');
    ilumninar(posicion,0);
    if(movimientos && movimientos.length){
        if(movimientos[0] == posicion){
            contador++;
            movimientos.shift();
            if(!movimientos.length){
                totalMovimientos++;
                setTimeout(()=>{
                    sequencia();
                }, 1000);
            }
        }else{
            document.querySelector("#mensaje").innerHTML = "Has perdido, ¡¡quak quak quak quak!!";
            setTimeout(() => {
                document.querySelector("#empezar").style.display = "block";
                document.querySelector("#mensaje").style.display = "none";
            }, 10000);
            pintarMarcador();
        }
    }
}
function pintarMarcador() {
    document.getElementById("puntuacion").innerHTML = "Tu puntuacion es " + contador;
    document.getElementById("pato").innerHTML = "<img src='https://ih1.redbubble.net/image.1884121621.7681/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg' width= 50px; alt='pato'>";

}
function quitarMarcador() {
    document.getElementById("puntuacion").innerHTML = "";
    document.getElementById("pato").innerHTML = "";
}
document.querySelector("#empezar").addEventListener("click",empezarJuego);
let celdas = Array.from(document.getElementsByClassName("celda"));
celdas.forEach(celda =>{
    celda.addEventListener("click",clickCelda);
})
