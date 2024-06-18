**BUGS** 

La gestión del undo funciona, pero si un valor era anotación y luego pasa a valor normal, no vuelve a anotación, se queda como valor normal y tras otro undo, desaparece o cambia al valor anterior a la anotación.

(Legacy) Al parece hay un bug al usar el eraser y luego querer usar el undo. Una vez usas el eraser, el undo deja de funcionar. Probablemente por mutación del array original. Plantear hacer un map por cada movimiento (adición o sustracción) y devolver ese array siempre para que esté disponible para las demás funciones. 