Tener en cuenta que hay que usar un array para guardar los números que se van poniendo en el tablero, tanto para el localStorage como para borrar, deshacer y el modo anotaciones

Para no mutar el estado inicial del sudoku, necesito guardar el estado post-generación del mismo en un array y trabajar con copias del mismo con la feature de borrar, de deshacer y de reiniciar. 

**IMPORTANTE**

Tengo que hacer que las casillas se conecten con el array de historial para que al hacer el check de si ya había un número antes en fila y/o columna, resalte de rojo el último añadido.

Recordar que hay que checkear si el número que queremos escribir ya está en la casilla, además de bloquear la casilla si ya hay un número escrito. Y más adelante, junto con el algoritmo de creación de juego aleatorio, ir bloqueando a medida que se pongan los números en las celdas correctas.


Se hizo una feature de que cuando un número ya existe en fila y columna, no puedes escribir el mismo en dicha fila y columna; esta feature no es necesaria por la propia naturaleza de un sudoku, pero ya que costó sacarlo, voy a pasarlo a una función que gestione el 'Modo Asistido' que se puede activar al comienzo de cada partida, y hará que no puedas cometer el fallo de repetir un número ya existente en fila y/o columna

Esta feature que comento arriba puede ser reciclada para el algoritmo de creación de tablero, de manera que antes de escribir un número generado para el tablero, compruebe si ese número ya existe en fila y columna, y que le busque otra celda o genere otro número (lo que resulte más fácil o más resultón según el mood)