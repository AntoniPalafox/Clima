const container = document.querySelector('.container')
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
})

function buscarClima(e) {
    e.preventDefault()
    //Validar formulario
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    if(!ciudad || !pais){
        mostrarError('Ambos campos son obligatorios')

        return
    }

    //consultar la API
    consultarAPI(ciudad, pais)
}

function mostrarError(mensaje) {

    const alerta = document.querySelector('.bg-red-100')
    if(!alerta){
        const alerta = document.createElement('DIV')

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center')

        alerta.innerHTML = `
        <strong class="font-bold">Error</strong>
        <span class="block">${mensaje}</span>
        `

        container.appendChild(alerta)

        setTimeout(() => {
            alerta.remove()
        }, 3000);
    }

}



function consultarAPI( ciudad, pais){
    

    

    const appId = 'ded56d3de8cef1cd607e2f78bac32ed6';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    spinner()

    fetch(url)
    .then( respuesta => respuesta.json())
    .then( datos => {

        limpiarHtml()  //Quitar resultado anterior
        if(datos.cod === "404"){
            mostrarError('Ciudad no encontrada')
            return
        }
        mostrarClima(datos)
    })
    .catch(error => console.log(error))

}

function mostrarClima(datos){
    
    const { name, main: { temp, temp_max, temp_min} } = datos

    centigrados = KelvinaCel(temp)
    max = KelvinaCel(temp_max)
    min = KelvinaCel(temp_min)

    const nombreCiudad = document.createElement('P')
    nombreCiudad.textContent = `Clima de ${name}`
    nombreCiudad.classList.add('font-bold', 'text-2xl')

    const actual = document.createElement('P')
    actual.innerHTML = `${centigrados} &#8451;`
    actual.classList.add('font-bold', 'text-6xl')

    const maxima = document.createElement('P')
    maxima.innerHTML = `Max: ${max} &#8451;`
    maxima.classList.add('text-xl')

    const minima = document.createElement('P')
    minima.innerHTML = `Min: ${min} &#8451;`
    minima.classList.add('text-xl')

    const resultadoDiv = document.createElement('DIV')
    resultadoDiv.classList.add('text-center', 'text-white')
    resultadoDiv.appendChild(nombreCiudad)
    resultadoDiv.appendChild(actual)
    resultadoDiv.appendChild(maxima)
    resultadoDiv.appendChild(minima)

    resultado.appendChild(resultadoDiv)

}

const KelvinaCel = grados => parseInt(grados - 273.15)


function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function spinner(){

    limpiarHtml()
    const spinnerDiv = document.createElement('DIV')
    spinnerDiv.classList.add('sk-circle')

    spinnerDiv.innerHTML = `
    <div class="sk-circle1 sk-child"></div>
    <div class="sk-circle2 sk-child"></div>
    <div class="sk-circle3 sk-child"></div>
    <div class="sk-circle4 sk-child"></div>
    <div class="sk-circle5 sk-child"></div>
    <div class="sk-circle6 sk-child"></div>
    <div class="sk-circle7 sk-child"></div>
    <div class="sk-circle8 sk-child"></div>
    <div class="sk-circle9 sk-child"></div>
    <div class="sk-circle10 sk-child"></div>
    <div class="sk-circle11 sk-child"></div>
    <div class="sk-circle12 sk-child"></div>
    `

    resultado.appendChild(spinnerDiv)
}