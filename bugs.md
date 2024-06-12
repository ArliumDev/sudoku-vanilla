**BUG** 

Está habiendo conflicto con el array del tablero y el array de notas. Entiendo que es por la lógica actual que escribir normal no tiene un toggle booleano y hace conflicto entre ambos. Habría que hacerle un toogle booleano a la escritura normal a ver si con eso se resuelve el problema,y además habría que hacer que eraser detecte a qué array pertenece cada valor escrito en el tablero para que lo borre del tablero correspondiente.

He percibido un bug al cambiar de eraser a escritura de nuevo en el que me escribe un valor como nota aunque 'Notes' no esté activo.

(Legacy) Al parece hay un bug al usar el eraser y luego querer usar el undo. Una vez usas el eraser, el undo deja de funcionar. Probablemente por mutación del array original. Plantear hacer un map por cada movimiento (adición o sustracción) y devolver ese array siempre para que esté disponible para las demás funciones. 