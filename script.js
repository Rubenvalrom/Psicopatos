
var repeticiones = 1;

function repetir(repeticiones) {
    var posiciones = Array();
    for (var i = 0; i < repeticiones; i++) {
        posiciones.push(random(1, 4));
    }
   return posiciones;
}

