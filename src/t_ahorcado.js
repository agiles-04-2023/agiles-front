// create a list of easy work between 5 and 10 letters 
export const palabrasFaciles = ['cara', 'leo', 'mama', 'papa', 'casa', 'perro', 'gato', 'pato', 'facil', 'juanignacio']
// create a list of medium work between 10 and 15 letters
export const palabrasMedios = ["fantasma", "sandía", "escuela", "montaña", "guitarra", "dormir", "perfume", "ballena", "teléfono", "velocidad"];
// create a list of hard work between 15 and 20 letters
export const palabrasDificiles = ['Extravagante', 'Inconformes', 'Desconcertado', 'Contradicción', 'Perseverante', 'Establecimiento', 'Espléndidamente', 'Anticonstitucional', 'Desesperadamente', 'Incomunicación'];

export class Ahorcado {
    MAX_INTENTOS = 6
    // TODO :: implemenmtar timer para que se termine el juego
    TIMER = 60

    constructor(difucultad, palabraAdivinar = null) {
        // Si no se pasa palabra a adivinar se elige una aleatoria dependiendo la dificultad
        if (palabraAdivinar) {
            this.palabraAdivinar = palabraAdivinar
        } else {
            if (difucultad === 'facil') this.palabraAdivinar = palabrasFaciles[Math.floor(Math.random() * palabrasFaciles.length)]
            if (difucultad === 'medio') this.palabraAdivinar = palabrasMedios[Math.floor(Math.random() * palabrasMedios.length)]
            else if (difucultad === 'dificil') this.palabraAdivinar = palabrasDificiles[Math.floor(Math.random() * palabrasDificiles.length)]
        }
        this.difucultad = difucultad
        this.intentos = this.MAX_INTENTOS
        this.palabraUsuario = []
        this.letrasErradas = []
    }

    verificarLetra = (letra) => {
        if (letra.length !== 1) return false
        this.palabraAdivinar = this.palabraAdivinar.toLowerCase()
        return this.palabraAdivinar.includes(letra.toLowerCase())
    }

    actualizarIntentos = () => this.intentos === 0 ? 0 : --this.intentos

    completarPalabra = (letra) => {
        this.palabraAdivinar.split('').map((l, index) => {
            if (l == letra) this.palabraUsuario[index] = letra
        })
        return this.palabraUsuario
    }

    verificarFinJuego = () => {
        if (this.palabraUsuario.join('') === this.palabraAdivinar) return 'Ganaste'
        else {
            if (this.intentos === 0) return 'Perdiste'
            else return 'Segui participando te falta ' + this.intentos + ' intentos'
        }
    }

    agregarLetrasErradas = (letra) => {
        if (this.verificarLetra(letra)) {
            return false
        } else {
            this.letrasErradas.push(letra)
            return this.letrasErradas
        }
    }
    reiniciarJuego = () => {
        this.palabraUsuario = []
        this.letrasErradas = []
        this.intentos = this.MAX_INTENTOS
    }
}
