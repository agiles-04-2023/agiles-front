//! Esto es un test unitario

import { expect, test } from 'vitest'
import { Ahorcado } from '../t_ahorcado'


test('Verificar si una letra esta en la palabra', () => {
    const juegoFacil = new Ahorcado('facil')
    expect(juegoFacil.verificarLetra('a')).toBeTruthy();
});
test('Verificar si una letra no esta en la palabra', () => {
    const juegoFacil = new Ahorcado('facil')
    expect(juegoFacil.verificarLetra('x')).toBeFalsy();
});

test('Verificar letra repetida en la palabra ', () => {
    const juegoFacil = new Ahorcado('facil')
    // eslint-disable-next-line no-sparse-arrays
    expect(juegoFacil.completarPalabra('a')).toStrictEqual([, 'a', , 'a'])
});