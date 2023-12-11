import { expect, test } from 'vitest'
import { Ahorcado, palabrasFaciles, palabrasMedios, palabrasDificiles } from '../t_ahorcado'

test('Verificar si una letra esta en la palabra', () => {
    const juegoFacil = new Ahorcado('facil', 'java')

    expect(juegoFacil.verificarLetra('a')).toBeTruthy();
});
test('Verificar si una letra no esta en la palabra', () => {
    const juegoFacil = new Ahorcado('facil', 'java')
    
    expect(juegoFacil.verificarLetra('x')).toBeFalsy();
});

test('Verificar si pasa una sola letra', () => {
    const juegoFacil = new Ahorcado('facil', 'java')

    expect(juegoFacil.verificarLetra('xs')).toBeFalsy()
});

test('Verificar los intentos', () => {
    const juegoFacil = new Ahorcado('facil', 'java')

    expect(juegoFacil.actualizarIntentos()).toBe(juegoFacil.intentos)
});
test('Verificar los intentos en cero', () => {
    const juegoFacil = new Ahorcado('facil', 'java')

    expect(juegoFacil.actualizarIntentos()).toBe(juegoFacil.intentos)
});
test('Completar una letra ', () => {
    const juegoFacil = new Ahorcado('facil', 'java')

    expect(juegoFacil.completarPalabra('j')).toStrictEqual(['j'])
});
test('Completar varias letras ', () => {
    const juegoFacil = new Ahorcado('facil', 'java')
    // eslint-disable-next-line no-sparse-arrays
    expect(juegoFacil.completarPalabra('a')).toStrictEqual([, 'a', , 'a'])
});
test('No completar letra', () => {
    const juegoFacil = new Ahorcado('facil', 'java')

    expect(juegoFacil.completarPalabra('q')).toStrictEqual([])
});

test('Validar si la letra erronea se agrego ', () => {
    const juegoFacil = new Ahorcado('facil', 'java')

    expect(juegoFacil.agregarLetrasErradas('q')).toStrictEqual(['q'])
});

test('Validar si la letra correcta no se agrega ', () => {
    const juegoFacil = new Ahorcado('facil', 'java')

    expect(juegoFacil.agregarLetrasErradas('v')).toBeFalsy()
});

test('Validar si la letra erronea se agrego a la lista previa ', () => {
    const juegoFacil = new Ahorcado('facil', 'java')
    juegoFacil.letrasErradas = ['o']
    expect(juegoFacil.agregarLetrasErradas('q')).toStrictEqual(['o', 'q'])
});

test('Fin de juego con ganador', () => {
    const juegoFacil = new Ahorcado('facil', 'java')
    juegoFacil.palabraUsuario = ['j', 'a', 'v', 'a']
    juegoFacil.intentos = 4
    expect(juegoFacil.verificarFinJuego()).toStrictEqual('Ganaste')
});
test('Fin de juego sin ganador', () => {
    const juegoFacil = new Ahorcado('facil', 'java')
    juegoFacil.palabraUsuario = ['j', 'a']
    juegoFacil.intentos = 0
    expect(juegoFacil.verificarFinJuego()).toStrictEqual('Perdiste')
});
test('Reiniciar juego ', () => {
    const juegoFacil = new Ahorcado('facil', 'java')
    juegoFacil.palabraUsuario = ['j', 'a']
    juegoFacil.intentos = 2
    juegoFacil.completarPalabra('j')
    juegoFacil.reiniciarJuego()
    expect(juegoFacil.intentos).toBe(6)
    expect(juegoFacil.palabraUsuario).toStrictEqual([])
});


// Tests de otra dificultad

test('Validar juego medio', () => {
    const juegofacil = new Ahorcado('facil', 'java')
    expect(juegofacil.palabraAdivinar).toStrictEqual('java')
});
test('Validar juego medio', () => {
    const juegoMedio = new Ahorcado('medio', 'guitarra')
    expect(juegoMedio.palabraAdivinar).toStrictEqual('guitarra')
});
test('Validar juego dificil', () => {
    const juegodificil = new Ahorcado('dificil', 'Extravagante')
    expect(juegodificil.palabraAdivinar).toStrictEqual('Extravagante')
});

// Tests con palabras al azar 

test('Validar si la palabra elegida esta en la lista de las palabras faciles', () => {
    const juegofacil = new Ahorcado('facil')

    expect(palabrasFaciles).toContain(juegofacil.palabraAdivinar)
});
test('Validar si la palabra elegida esta en la lista de las palabras medios', () => {
    const juegoMedio = new Ahorcado('medio')

    expect(palabrasMedios).toContain(juegoMedio.palabraAdivinar)
});
test('Validar si la palabra elegida esta en la lista de las palabras dificiles', () => {
    const juegodificil = new Ahorcado('dificil')
    expect(palabrasDificiles).toContain(juegodificil.palabraAdivinar)
});
