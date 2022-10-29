import {validURL} from "./functions.js"
import {appearText} from "./functions.js"

let input = document.getElementById("input")
let btn = document.getElementById("btn")
let btnDownload = document.getElementById("btn-download")
let textError = document.getElementById("text-error")

setInterval(()=>{
    if(document.title === "R4MA MP3 🎵"){
        document.title = "R4MA MP3 😎"
    }else{
        document.title = "R4MA MP3 🎵"
    }

}, 3000)

if(window.visualViewport.width <= 900){
    mp3Converter(17, 28)
}else{
    mp3Converter(32, 43)
}

function mp3Converter(numS1, numS2){
    btn.addEventListener("click", async ()=>{
        btnDownload.style.display = "none"

        if(input.value === ""){
            appearText("red", "Introduce una URL")
        }else{
        validURL(input.value)
        if(validURL(input.value) === false){
                appearText("red", "URL Invalida")
        }else{
                textError.style.display = "none"

                let url = input.value
                let urlToString = url.toString()
                let urlID = urlToString.slice(numS1, numS2)


                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'Consigue tu API-Key registrandote en RapidAPI',
                        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
                    }
                };
                
                try{
                    const response = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${urlID}`, options)
                    const data = await response.json()
            
                    if(data.link === '' || data.link === undefined){
                        appearText("red", "No se creo un link. Recargando...")
                        setTimeout(()=>{
                            location.reload()
                        }, 3000)
                    }else{
                        appearText("rgb(55, 233, 10)", "Se creo el link exitosamente!")
                        btnDownload.style.display = "block"
                        btnDownload.setAttribute("href", data.link)
                    }
                }catch(e){
                    appearText("red", "Ha ocurrido un error. Recargando...")
                    setTimeout(()=>{
                        location.reload()
                    }, 3000)
                }
            }
        }


    });
}

btnDownload.addEventListener("click", ()=>{
    btnDownload.style.display = "none"
    appearText("aqua", "¡Gracias por su descarga!")
    setTimeout(()=>{
        location.reload()
    },5000)
})
