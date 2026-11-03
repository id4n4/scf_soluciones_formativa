# Mini ejercicios de JavaScript (sin servidor)

15 ejercicios muy cortos. Cada uno trata **un solo concepto**, desde las variables hasta la programación asíncrona.

- `ejercicios/` → el enunciado con huecos (`// TODO`) para completar.
- `soluciones/` → el mismo ejercicio resuelto.

Cada ejercicio es un `.html` con el JavaScript dentro. Arriba del código explica qué hay que hacer y qué tiene que salir (RESULTADO ESPERADO).

| N.º | Fichero | Concepto |
| --- | --- | --- |
| 1 | `01_variables_y_tipos.html` | `let`, `const`, `typeof` |
| 2 | `02_if_else_y_bucles.html` | `if`, `else`, `for` |
| 3 | `03_operadores_y_plantillas.html` | `===`, `&&`, `||`, `` `${}` `` |
| 4 | `04_funciones_flecha.html` | `function`, `=>`, parámetros por defecto |
| 5 | `05_ambito_scope.html` | Variable global, de función y de bloque |
| 6 | `06_map_filter_reduce.html` | Métodos modernos de los arrays |
| 7 | `07_objetos_y_destructuring.html` | Objetos, `.propiedad`, `["propiedad"]`, destructuring |
| 8 | `08_dom_seleccionar_y_modificar.html` | `querySelector`, `getElementById`, `querySelectorAll`, `textContent`, `style`, `classList` |
| 9 | `09_dom_crear_y_quitar.html` | `createElement`, `appendChild`, `remove()` |
| 10 | `10_eventos_click_e_input.html` | `addEventListener`, `click`, `input` |
| 11 | `11_formulario_submit.html` | Evento `submit` y `preventDefault()` |
| 12 | `12_settimeout_y_callbacks.html` | Código que se ejecuta más tarde; funciones como parámetro |
| 13 | `13_promesas.html` | `new Promise`, `.then()`, `.catch()`, `.finally()` |
| 14 | `14_async_await.html` | `async`, `await`, `try` / `catch` |
| 15 | `15_repaso_final.html` | Todo junto |

## Cómo abrirlos

Abre `index.html` con doble clic (o con Live Server en VS Code) y elige un ejercicio. No hace falta servidor.

- Lo que se muestra con `mostrar(...)` sale en el recuadro negro **Salida** y también en la consola (**F12 → Console**).
- `mostrar()` está en `comun.js`: es como `console.log`, pero además lo escribe en la página.
- Los ejercicios 8 a 11, 13 y 15 tienen HTML en la página para practicar con el DOM.
- Edita el fichero, guarda y recarga con **F5**.
