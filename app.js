/*Operacion auxiliar*/

function $(elem) {
	return document.querySelector(elem);
}
function $$(elem) {
	return document.querySelectorAll(elem);
}





/*Input de búsqueda*/
const ingresarBusqueda = $("ingresar-busqueda")


/*Botones de filtro atrapados */
const tipoBusque = $("tipo-busqueda")
const ordenAlfabético = $("#orden-busqueda")
const botonBuscar= $("#boton-buscar")

/*Divs de elementos de la búsqueda*/
const divResultado = $$("personajes")

/*Botones cambiar de páginas*/
const primeraPagina = $(".pagina-primera")
const anteriorPagina= $(".pagina-anterior")
const siguientePagina = $(".pagina-siguiente")
const ultimaPagina = $(".pagina-ultima")

/*Filtrados posible*/
const filtrado ={
    "orden-alfabetico": (filtro) => ordenarAlfabeticamente(filtro, 'DESC'),
	"orden-alfabetico-invertido": (filtro) => ordenarAlfabeticamente(filtro, 'ASC'),

}


/*Modo Oscuro*/
const botonModoOscuro= $("#dark")
const main = document.querySelector("main")
const intercambiarColor = () =>{
main.classList.toggle("modo-oscuro")
}
botonModoOscuro.onclick = intercambiarColor


/*Cambio del botón de modo oscuro*/
const botonSwitch = $(".switch")
botonSwitch.addEventListener("click", () =>{
botonSwitch.classList.toggle('active')
})

/**/


window.onload = () => {
    fetchPersonajes({}).then((data) => {
        actualizarResultados(data.results);
    });

    $(".pagina-siguiente").addEventListener("click", (event) => {
        next().then((data) => {
            actualizarResultados(data.results);
        })
    });

    $(".pagina-ultima").addEventListener("click", (event) => {
        const name = $("#ingresar-busqueda").value;
        const status = $("#status-busqueda").value;
        const gender = $("#genero-busqueda").value;
        const type = $("#type-busqueda").value;
        const species = $("#species-busqueda").value;
        const orden = $("#orden-busqueda").value;

        last({name, gender, status, type, species}).then((data) => {
            let resultadosOrdenados;
            if (orden === "a-z") {
                resultadosOrdenados = data.results.sort((personajeA, personajeB) => personajeA.name.localeCompare(personajeB.name))
            } else {
                resultadosOrdenados = data.results.sort((personajeA, personajeB) => personajeB.name.localeCompare(personajeA.name))
            }

            actualizarResultados(resultadosOrdenados);
        })
    });

    $(".pagina-primera").addEventListener("click", (event) => {
        const name = $("#ingresar-busqueda").value;
        const status = $("#status-busqueda").value;
        const gender = $("#genero-busqueda").value;
        const type = $("#type-busqueda").value;
        const species = $("#species-busqueda").value;
        const orden = $("#orden-busqueda").value;

        first({name, gender, status, type, species}).then((data) => {
            let resultadosOrdenados;
            if (orden === "a-z") {
                resultadosOrdenados = data.results.sort((personajeA, personajeB) => personajeA.name.localeCompare(personajeB.name))
            } else {
                resultadosOrdenados = data.results.sort((personajeA, personajeB) => personajeB.name.localeCompare(personajeA.name))
            }

            actualizarResultados(resultadosOrdenados);
        })
    });

    $(".pagina-anterior").addEventListener("click", (event) => {
        prev().then((data) => {
            actualizarResultados(data.results);
        })
    });

    $("#boton-buscar").addEventListener("click", (event) => {
        const name = $("#ingresar-busqueda").value;
        const status = $("#status-busqueda").value;
        const gender = $("#genero-busqueda").value;
        const type = $("#type-busqueda").value;
        const species = $("#species-busqueda").value;
        const orden = $("#orden-busqueda").value;

        fetchPersonajes({name, gender, status, type, species}).then((data) => {
            let resultadosOrdenados;
            if (orden === "a-z") {
                resultadosOrdenados = data.results.sort((personajeA, personajeB) => personajeA.name.localeCompare(personajeB.name))
            } else {
                resultadosOrdenados = data.results.sort((personajeA, personajeB) => personajeB.name.localeCompare(personajeA.name))
            }

            actualizarResultados(resultadosOrdenados);
        });
    })
    
}

const actualizarResultados = (results) => {
    const contenedorResultados = $(".resultados-imagenes");
    contenedorResultados.textContent = "";
    const cards = results.map((result) => construirCardDePersonaje(result));
    contenedorResultados.append(...cards);
    actualizarBotonesDePaginado();
}

const actualizarBotonesDePaginado = () => {
    actualizarBotonDePaginado($(".pagina-anterior"), !metadata.prev);
    actualizarBotonDePaginado($(".pagina-siguiente"), !metadata.next);
    actualizarBotonDePaginado($(".pagina-primera"), currentPage === 1);
    actualizarBotonDePaginado($(".pagina-ultima"), currentPage === metadata.pages);
    $("#pagina-actual").textContent = currentPage;
    $("#ultima-pagina").textContent = metadata.pages;
}

const actualizarBotonDePaginado = (element, disabled) => {
    if (disabled) {
        element.disabled = true;
        element.classList.add("disabled");
    } else {
        element.disabled = false;
        element.classList.remove("disabled");
    }
}

const construirCardDePersonaje = ({id, name, gender, image, species, status}) => {
    const card = document.createElement('div');
    card.classList.add('card');

    if (image) {
        const cardImage = document.createElement('div');
        cardImage.classList.add('card-image');

        const figureImage = document.createElement('figure');
        figureImage.classList.add('image');

        const imageElement = document.createElement('img');
        imageElement.src = image;
        imageElement.alt = name;

        figureImage.append(imageElement);
        cardImage.append(figureImage);
        card.append(cardImage);
    }

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    const nameElement = document.createElement('div');
    nameElement.textContent = name;
    const speciesElement = document.createElement('div');
    speciesElement.textContent = `- ${species}`;
    const genderElement = document.createElement('div');
    genderElement.textContent = `- ${gender}`;
    
    const statusElement = document.createElement('div');
    statusElement.textContent = `- ${status}`;

    cardContent.append(nameElement);
    cardContent.append(speciesElement);
    cardContent.append(genderElement);
    cardContent.append(statusElement);

    card.append(cardContent);
		
	return card;
}