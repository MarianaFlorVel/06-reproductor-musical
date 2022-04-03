//Aquí va la información de cada canción.
//Objetos y Array []
const songA = [{
    title: "Mirai, Future",
    NombreAlbum: "ONE / 00",
    Artist: "ONE, ATOLS",
    duration: "3:22",
    image: "ONE-00.png",
    file: "Mirai,Future.wav"
   //Url de la imagen de la portada del disco

},

{
    title: "Ai Dee",
    NombreAlbum: "Realistic Virtual Singing",
    Artist: "Hatsune Miku, Megurine Luka, Mitchie M",
    duration: "4:47",
    image: "RVS.jpg",
    file: "AiDee.wav"
    //Url de la imagen de la portada del disco
 
},

{
    title: "FREELY TOMORROW",
    NombreAlbum: "Realistic Virtual Singing",
    Artist: "Hatsune Miku, Mitchie M",
    duration: "4:00",
    image: "RVS.jpg",
    file: "FT.wav"
    //Url de la imagen de la portada del disco
 
},

{
    title: "Birthday song for ミク",
    NombreAlbum: "Realistic Virtual Singing",
    Artist: "Kagamine Rin y Len, Megurine Luka, KAITO, MEIKO, Mitchie M",
    duration: "2:59",
    image: "RVS.jpg",
    file: "BSFM.wav"
    //Url de la imagen de la portada del disco
 
},

{
    title: "Snowman",
    NombreAlbum: "Everyday Is Christmas",
    Artist: "Sia",
    duration: "2:45",
    image: "SIA.png",
    file: "Snowman.wav"
    //Url de la imagen de la portada del disco
 
},

{
    title: "Chandelier",
    NombreAlbum: "1000 Forms of Fear",
    Artist: "Sia",
    duration: "3:36",
    image: "Chandelier.jpg",
    file: ""
    //Url de la imagen de la portada del disco
 
},
 
{
    title: "Alive",
    NombreAlbum: "This Is Acting",
    Artist: "Sia",
    duration: "4:26",
    image: "ThisIsActing.jpg",
    file: ""
     //Url de la imagen de la portada del disco
    },
    
{
    title: "Thunderclouds",
    NombreAlbum: "LSD",
    Artist: "Sia, Diplo, Labrinth",
    duration: "3:10",
    image: "LSD.jpg",
    file: ""
     //Url de la imagen de la portada del disco
    },
 
{
    title: "IWDwithS(WLM)",
    NombreAlbum: "Whitney",
    Artist: "Whitney Houston",
    duration: "4:52",
    image: "IWDWS.jpg",
    file: ""
     //Url de la imagen de la portada del disco
  
    },
 
{
    title: "Déjame Vivir",
    NombreAlbum: "Rocío Dúrcal canta a dúo con Juan Gabriel",
    Artist: "Juan Gabriel, Rocío Dúrcal",
    duration: "3:42",
    image: "DV.jpg",
    file: ""
     //Url de la imagen de la portada del disco
  
    },

{
    title: "Come and Get Your Love",
    NombreAlbum: "Wovoka",
    Artist: "Redbone",
    duration: "5:01",
    image: "Rb.png",
    file: ""
    //Url de la imagen de la portada del disco
 
},
{
    title: "September",
    NombreAlbum: "September",
    Artist: "Earth, Wind & Fire",
    duration: "3:36",
    image: "Sep.jpg",
    file: ""
     //Url de la imagen de la portada del disco
  
    },
 
{
    title: "I Will Survive",
    NombreAlbum: "Love Tracks",
    Artist: "Gloria Gaynor",
    duration: "3:18",
    image: "IWS.jpg",
    file: ""
     //Url de la imagen de la portada del disco
  
  },
 
{
    title: "Mr Blue Sky",
    NombreAlbum: "Out of the Blue",
    Artist: "Electric Light Orchestra",
    duration: "5:02",
    image: "MRBS.jpg",
    file: ""
     //Url de la imagen de la portada del disco
  
 },
 
{
    title: "Move Your Feet",
    NombreAlbum: "D-D-Don't Don't Stop the Beat",
    Artist: "Junior Senior",
    duration: "3:02",
    image: "MYF.jpg",
    file: ""
     //Url de la imagen de la portada del disco
  
  }];
// Canción en reproducción
let enReproduccion = null

// Capturar elementos del DOM para trabajar con JS
const songlist = document.getElementById("songlist")
const audio = document.getElementById("audio")
const image = document.getElementById("image")
const title = document.getElementById("title")
const NombreAlbum = document.getElementById("NombreAlbum")
const Artist = document.getElementById("Artist")
const play = document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const progreso = document.getElementById("progreso")
const container = document.getElementById("container")
container.addEventListener("click", setProgreso)

// Escuchar el elemento AUDIO
audio.addEventListener("timeupdate", updateProgreso)


// Escuchar clicks en los controles
play.addEventListener("click", () => {
    if (audio.paused) {
        playSong()  
        alert('Ahora suena') 
    } else {
        pauseSong()
        alert('Haz pausado la reproducción' ) 
    }
})

next.addEventListener("click", () => nextSong())
prev.addEventListener("click", () => prevSong())

// Cargar canciones y mostrar el listado

function shufflesonglist() {
    songA.forEach((song, index) => {
        // Crear li
        const li = document.createElement("li")
        // Crear a
        const link = document.createElement("a")
        // Hidratar a
        link.textContent = song.title
        link.href = "#"
        // Escuchar clicks
        link.addEventListener("click", () => loadSong(index))
        // Añadir a li
        li.appendChild(link)
        // Aañadir li a ul
        songlist.appendChild(li)
    })
}


// Cargar la canción seleccionada
function loadSong(songIndex) {
    if (songIndex !== enReproduccion) {
        changeActiveClass(enReproduccion, songIndex)
        enReproduccion = songIndex
        audio.src = "./audio/" + songA[songIndex].file
        playSong()
        changeSongtitle(songIndex)
        changeimage(songIndex)
    }
}

// Actualizar la barra de progreso de la canción
function updateProgreso(event) {
    const {duration, currentTime} = event.srcElement
    const percent = (currentTime / duration) * 100
    progreso.style.width = percent + "%" 
}

// Hacer la barra de progreso pulsable
function setProgreso(event) {
    const totalWidth = this.offsetWidth
    const progresoWidth = event.offsetX
    const current = (progresoWidth / totalWidth) * audio.duration
    audio.currentTime = current
}


function updatecontroles() {// Actualiza los controles
    if (audio.paused) {
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
    } else {
        play.classList.add("fa-pause")
        play.classList.remove("fa-play")
    }
}

// Reproducir canción
function playSong() {
    if (enReproduccion !== null) {
        audio.play()
        updatecontroles()
    }
}

// Pausar canción
function pauseSong() {
    audio.pause()
    updatecontroles()
}

// Cambiar clase activa
function changeActiveClass(lastIndex, newIndex) {
    const links = document.querySelectorAll("a")
    if (lastIndex !== null) {
        links[lastIndex].classList.remove("active")
    }
    links[newIndex].classList.add("active")
}

// Cambiar la imagen de la canción
function changeimage(songIndex) {
    image.src = "./img/" + songA[songIndex].image
}

// Cambiar el título de la canción
function changeSongtitle(songIndex) {
     title.innerText = songA[songIndex].title
     NombreAlbum.innerText = songA[songIndex].NombreAlbum
     Artist.innerText = songA[songIndex].Artist
}

// Anterior canción
function prevSong() {
    if (enReproduccion > 0) {
        loadSong(enReproduccion - 1)
    } else {
        loadSong(songA.length - 1)
    }
}

// Siguiente canción
function nextSong() {
    if (enReproduccion < songA.length -1) {
        loadSong(enReproduccion + 1)
    } else {
        loadSong(0)
    }
}

// Lanzar siguiente canción cuando se acaba la actual
audio.addEventListener("ended", () => nextSong())

// Comienza
shufflesonglist()

//Créditos songs:
//Mirai, Future - ATOLS feat.ONE:  https://vocadb.net/S/104650   http://mikudb.moe/album/one00/  https://www.youtube.com/watch?v=sEPZUVgGPi0
// Mitchie M https://vocaloid.fandom.com/es/wiki/REALISTIC_VIRTUAL_SINGING https://www.youtube.com/watch?v=zkLJoFp2UAE https://www.youtube.com/watch?v=KmvydnVTriE
                //https://www.youtube.com/watch?v=rmYU2ikxjpA

//Snowman - Sia: https://es.wikipedia.org/wiki/Everyday_Is_Christmas https://www.noteflight.com/marketplace/4QBDofBZJ7mLvyp7Qm17fL/snowman https://www.youtube.com/watch?v=gset79KMmt0
// Chandelier - Sia: https://www.quedeletras.com/cd-album/sia/chandelier/17457.html https://www.amazon.es/Chandelier/dp/B00KMJONHK
//Alive - Sia: https://www.amazon.com/-/es/Sia/dp/B01B7ANPEE
//LSD - Thunderclouds (Official Audio) ft. Sia, Diplo, Labrinth https://smarturl.it/Thunderclouds  
//I wanna Dance With Comebody - Witney H.:https://www.discogs.com/es/release/245775-Whitney-Houston-I-Wanna-Dance-With-Somebody-Who-Loves-Me
//Déjame Vivir - Rocío D. y Juan Gabriel: https://www.discogs.com/es/master/1274737-Roc%C3%ADo-D%C3%BArcal-canta-a-d%C3%BAo-con-Juan-Gabriel-D%C3%A9jame-Vivir
// Come and Get your love- Redbone: https://redbone-band.com/come-and-get-your-love
//September- EWF: https://laguitarradelasmusas.com/2020/09/01/earth-wind-fire-september/
//I will Survive- Gloria Gaynor: https://www.amazon.com/Love-Tracks-Expanded-Gloria-Gaynor/dp/B00D3BCFQK
//Mr Blue sky- Electric Light Orchestra: https://www.amazon.com/-/es/ELECTRIC-LIGHT-ORCHESTRA/dp/B008OJ2994
//Move your Feet - Junior S: https://www.amazon.com/D-D-Dont-Dont-Stop-Junior-Senior/dp/B0000A4G4Y

//https://loader.to/es94/youtube-wav-converter.html