Tener en cuenta que hay que usar un array para guardar los números que se van poniendo en el tablero, tanto para el localStorage como para borrar, deshacer y el modo anotaciones

Para no mutar el estado inicial del sudoku, necesito guardar el estado post-generación del mismo en un array y trabajar con copias del mismo con la feature de borrar, de deshacer y de reiniciar. 