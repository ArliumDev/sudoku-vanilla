**BUGS** 

No es un bug como tal, pero hacer que si no se ha seleccionado ningún número, no se pueda poner ningún valor en las casillas, porque ahora se pone undefined y no es el funcionamiento esperado.

(Legacy) Al parece hay un bug al usar el eraser y luego querer usar el undo. Una vez usas el eraser, el undo deja de funcionar. Probablemente por mutación del array original. Plantear hacer un map por cada movimiento (adición o sustracción) y devolver ese array siempre para que esté disponible para las demás funciones. 