/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext, useEffect, useCallback } from 'react'
import { Ahorcado, NIVEL } from '../ahorcado'
import http from '../api/axios'
import { AuthContext } from '../context/authContext';
import Box from '../components/Box';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const Game = () => {

    const { authState } = useContext(AuthContext);
    const [game, setGame] = useState<Ahorcado>()
    const [endGame, setEndGame] = useState('')
    const [timer, setTimer] = useState<NodeJS.Timer>()
    const [timeLeft, setTimeLeft] = useState<number>(0)
    const [playing, setPlaying] = useState(false)
    const [level, setLevel] = useState('facil')
    const [withTimer, setWithTimer] = useState<'Yes' | 'No'>('No')
    const [loadingStartingGame, setLoadingStartingGame] = useState(false)
    const letters = Array.from(Array(26)).map((_, i) => String.fromCharCode(i + 65))

    const updateGame = async (letter: string) => {
        if (!game) return
        const newGame = game.verificarLetra(letter)
        setGame({ ...newGame })
        const isDone = newGame.finJuego()
        for (let j = 1; j <= newGame.letrasErradas.length; j++) {
            const el = document.getElementById(j.toString())
            el?.classList.remove('hidden', 'bg-red-300')
            el?.classList.add('block', 'animate-pulse', 'border-blue-400', 'border-2', 'border-dashed')
        }
        if (isDone !== 'Continua' || (withTimer === 'Yes' && timeLeft === 0)) return handleEndGame(game, isDone)
    }

    const updateGameOnKeyPress = useCallback((letter: string) => {
        if (!game) return
        updateGame(letter)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!e.key.toLocaleLowerCase().match(/[a-z]/i)) return
            e.preventDefault()
            updateGameOnKeyPress(e.key.toUpperCase())
        }
        document.addEventListener('keypress', handleKeyDown)
        return () => {
            document.removeEventListener('keypress', handleKeyDown)
        }
    }, [updateGameOnKeyPress, game])

    const clearPerson = (l: number) => {
        for (let j = 1; j <= l; j++) {
            const el = document.getElementById(j.toString())
            el?.classList.remove('block')
            el?.classList.add('hidden')
        }
    }

    const handleEndGame = async (game: Ahorcado, isDone: string) => {
        setEndGame(isDone)
        clearInterval(timer)
        setTimer(undefined)
        setPlaying(false)

        if (!authState.token) return game.reiniciarJuego()

        try {
            const res = await http.post('/games', {
                ...game,
                UserId: authState.user?.id,
                finalState: isDone,
                time: game.TIMER - timeLeft,
                withTimer: withTimer === 'Yes' ? true : false,
                date: new Date()
            })
            if (res.data.ok) {
                if (authState.token) {
                    toast('La puntuación se guardó con éxito!', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        icon: true,
                        bodyClassName: 'text-green-400'
                    });
                }
            }
        } catch (error: any) {
            if (!authState.token) return
            toast(error?.response.data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                icon: true,
                bodyClassName: 'text-red-600'
            });
        } finally { game.reiniciarJuego() }
    }

    const handleNewGame = () => {
        handleCloseModal()
        handleStartGame()
    }

    const handleCloseModal = () => {
        setGame(undefined)
        setEndGame('')
        clearPerson(8)
        setTimeLeft(0)
    }

    const handleStartGame = () => {
        setLoadingStartingGame(true)
        const lev: NIVEL = level === 'facil' ? 'facil' : level === 'medio' ? 'medio' : 'dificil'
        const g = new Ahorcado(lev)
        setGame(g)
        if (withTimer === 'Yes') {
            setTimeLeft(g.TIMER)
            const intervalId = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev === 0) {
                        clearInterval(intervalId)
                        setEndGame('Perdiste')
                        setPlaying(false)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
            setTimer(intervalId)
        }
        setPlaying(true)
        setLoadingStartingGame(false)
    }


    return (
        <div className='flex min-h-screen justify-between flex-col bg-[#492d49] font-sans'>
            <Navbar />
            {
                (playing || game !== undefined) ? (
                    <>
                        {
                            endGame !== '' && (
                                <div className="modal absolute w-screen h-screen  flex items-center justify-center bg-black/40 text-white z-30">
                                    <div className="modal-content w-[90%] mx-8 sm:mx-0 sm:w-[350px] bg-[#5a5c75] p-4 shadow rounded">
                                        <div className="modal-header mb-4 border-b border-slate-600 pb-2">
                                            <h2 className='text-2xl font-meduim font-semibold'>FIN DEL JUEGO</h2>
                                        </div>
                                        <div className="modal-body">
                                            {/* <p>Some text in the Modal Body</p> */}
                                            <p className={`${endGame === 'Ganaste' ? 'text-green-400 font-medium' : 'text-red-400 font-medium'}`}>
                                                {
                                                    endGame === 'Ganaste' ? `FELICIDADES ${authState.user?.fullName || ''}, GANASTE! ` : `PERDISTE${authState.user?.fullName || ''}, VUELVE A INTENTARLO.`
                                                }
                                            </p>
                                        </div>
                                        <div className="actions flex items-center justify-between mt-6  border-t border-slate-600 pt-2">
                                            <button className="px-3 py-1 bg-[#ffb13d] rounded-full font-semibold"
                                                onClick={() => handleNewGame()}
                                            >
                                                Jugar de nuevo
                                            </button>
                                            <button className="px-3 py-1 border bg-transparent rounded-full border-slate-800 hover:bg-slate-800 duration-500"
                                                onClick={() => handleCloseModal()}
                                            >
                                                Cerrar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <div className="container mx-auto my-6 flex flex-col sm:flex-row gap-y-4">
                            <div className="content mx-2 sm:w-[50%] flex items-center flex-col bg-[#5a5c75]   gap-4">
                                <div className='text-slate-400 w-full  font-semibold p-2 bg-slate-800 bg-gradient from-slate-700 to-slate-900 text-center text-lg '>
                                    FALLOS {game?.letrasErradas?.length}/{game?.MAX_INTENTOS}
                                </div>
                                <div className="person my-4 w-full min-h-[300px] relative">

                                    <div className="base absolute bottom-0  w-[70px] h-[6px] z-10 bg-blue-300  shadow  border-slate-900 "></div>
                                    <div className="left-side absolute left-0 sm:left-[20px] bottom-0 w-2 h-[325px] z-10 bg-blue-300  shadow  border-slate-900 "></div>
                                    <div className=" top-side absolute -top-[25px] left-0 sm:left-[20px]  w-[50%] sm:w-[130px] h-[6px] z-10 bg-blue-300  shadow  border-slate-900 "></div>
                                    <div className="top-pick  absolute -top-[25px] left-[50%] sm:left-[150px]  w-2 h-[50px] z-10 bg-blue-300 shadow  border-slate-900 "></div>

                                    <div className="person relative w-full sm:w-[300px] h-fit  pb-20 grid  place-items-center ">
                                        <div id='1' className="header  w-[80px] h-[80px] z-10 bg-red-300 rounded-full shadow   relative hidden">
                                            <div id='2' className="eye-left w-4 h-4 rounded-full border bg-slate-600  shadow absolute top-[28px] left-[20px] hidden"></div>
                                            <div id='3' className="eye-right w-4 h-4 rounded-full border bg-slate-600   shadow absolute top-[28px] right-[20px] hidden"></div>
                                        </div>
                                        <div className="body-person   relative">
                                            <div id='4' className="tronc h-[132px] w-8 shadow relative -top-[10px] hidden "></div>
                                            <div id='5' className="arm-left w-[20px] bg-red-300  absolute -rotate-45 !top-0 -right-[30px] h-[120px] hidden"></div>
                                            <div id='6' className="arm-right w-[20px] bg-red-300  absolute rotate-45 top-[0px] -left-[30px] h-[120px] hidden"></div>
                                            <div id='7' className="leg-left arm-left w-[20px] bg-red-300  absolute -rotate-45 top-[70px] -right-[30px] h-[120px] hidden"></div>
                                            <div id='8' className="leg-right arm-left w-[20px] bg-red-300  absolute rotate-45 top-[70px] -left-[30px] h-[120px] hidden"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="theword mx-2 flex items-center justify-center gap-4 my-6 flex-wrap">
                                    {
                                        game?.palabraAdivinar?.split('').map((letter: string, i: number) => (
                                            <div key={i} className='flex uppercase items-center w-8 h-8 border border-slate-500 justify-center text-slate-300 text-lg font-semibold'>
                                                {game.palabraUsuario[i] === game.palabraAdivinar[i] ? letter : '_'}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="right mx-2  bg-[#5a5c75] flex-1  sm:w-[50%] flex flex-col ">
                                <div className='text-slate-400 w-full font-semibold p-2 bg-slate-800 bg-gradient from-slate-700 to-slate-900 text-center text-lg '>
                                    LETRAS
                                </div>
                                <div className="letters flex items-center gap-4 flex-wrap p-4">
                                    {
                                        letters.map((letter, i) => (
                                            <button key={i}
                                                disabled={game?.letrasErradas?.includes(letter.toLowerCase()) || game?.palabraUsuario?.includes(letter.toLowerCase())}
                                                className={`w-12 h-12 rounded-full shadow flex items-center justify-center text-white font-semibold border border-slate-700 hover:bg-gray-700 ${game?.letrasErradas?.includes(letter.toLowerCase()) && 'bg-red-400 disabled:hover:bg-red-400 '}  ${game?.palabraUsuario?.includes(letter.toLowerCase()) && 'bg-green-400 disabled:hover:bg-green-400  text-slate-800'} `}
                                                onClick={() => updateGame(letter.toLowerCase())}
                                            >
                                                {letter}
                                            </button>
                                        ))
                                    }
                                </div>
                                <button
                                    onClick={() => {
                                        if (game) { handleEndGame(game, 'Perdiste') }
                                    }}
                                    className='hover:bg-[#ffb13d] hover:text-white font-semibold duration-150 self-center px-3  py-1 rounded-full shadow-md text-slate-300 border border-[#d1b68d]'>FINALIZAR</button>
                            </div>
                        </div>
                        {
                            (playing && withTimer === 'Yes') && (
                                <div className="timer text-slate-400 text-center my-6 flex items-center justify-center ">
                                    {/* <span>Te queda : </span> */}
                                    <div className={`flex bg-slate-800 items-center justify-center text-3xl animate-ping duration-500 font-bold text-slate-400 text-center w-20 h-20 rounded-full shadow ${timeLeft <= 5 ? 'text-red-300' : '!text-green-400'} `}>
                                        {timeLeft}
                                    </div>
                                </div>
                            )
                        }
                    </>

                ) : (
                    <div className="flex flex-col items-center justify-center h-full mx-2 sm:mx-0 my-8">
                        <Box className="levels w-full sm:w-[450px]">
                            {
                                !authState.token && (
                                    <div className='mb-6 text-sm text-red-300 border shadow border-dashed border-red-100 p-4 w-full'>
                                        No estás logueado, el resultado de este juego se perderá. Si deseas guardar tus puntuaciones, por favor <br />  <br />
                                        <Link to="/sign-in" className='text-[#ffb13d] hover:text-[#ffcc80] font-bold text-lg flex items-center justify-center  animate-bounce'>Inicia Sesión</Link>
                                    </div>
                                )
                            }
                            <div className='mb-6 text-sm  border shadow  border-green-100 p-4 w-full  border-dashed'>
                                <div className='mb-4 text-lg font-bold flex items-center justify-center text-[#ffd596]'>
                                    !!! IMPORTANTE !!! <br />
                                </div>
                                <ul className='flex flex-col gap-2 list-decimal pl-6  text-yellow-300'>
                                    <li>
                                        Para jugar con el teclado, debes hacer click en el botón de la letra que deseas ingresar.
                                    </li>
                                    <li>
                                        No hay diferencia entre mayúsculas y minúsculas. Osea que si la palabra es "HOLA", puedes ingresar "hola".
                                    </li>
                                    <li>
                                        No hay diferencia de acentos. Osea que si la palabra es "árbol", puedes ingresar "arbol".
                                    </li>
                                </ul>

                            </div>
                            <h1 className='title-form text-2xl sm:text-3xl'>Configurar jugada</h1>
                            <fieldset>
                                <label htmlFor="Nivel" className='text-[#d1b68d] font-bold tracking-widest'>NIVEL</label>
                                <select
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLevel(e.target.value)}
                                    name="levels" id="levels"
                                    className='bg-[#d1b68d] text-[#492d49] font-bold tracking-wider'
                                >
                                    <option value="facil" className='font-semibold text-white'>Fácil</option>
                                    <option value="medio"  className='font-semibold text-white'>Medio</option>
                                    <option value="dificil"  className='font-semibold text-white'>Difícil</option>
                                </select>
                            </fieldset>
                            <fieldset>
                                <label htmlFor="Nivel" className='text-[#d1b68d] font-bold tracking-wider'>JUGAR CON TIEMPO</label>
                                <div className="flex items-center w-full justify-between px-3 py-1 rounded bg-[#d1b68d] text-[#492d49]">
                                    <span className='flex items-center gap-1 font-semibold'>
                                        <label htmlFor='timer'>SI</label>
                                        <input type='radio' onChange={() => setWithTimer('Yes')} className='w-5 h-5' name='timer' value="yes" />
                                    </span>
                                    <span className='flex items-center gap-1 font-semibold'>
                                        <label htmlFor='timer'>NO</label>
                                        <input type='radio' onChange={() => setWithTimer('No')} className='w-5 h-5' name='timer' value="No" />
                                    </span>
                                </div>
                            </fieldset>

                            <fieldset>
                                <button disabled={false}
                                    className='btn gradient'
                                    type='submit'
                                    onClick={() => handleStartGame()}
                                >
                                    {loadingStartingGame ? ('Iniciando juego...') : 'Iniciar juego'}
                                </button>
                            </fieldset>

                        </Box>
                    </div >
                )
            }
            <Footer />
        </div >
    )
}

export default Game