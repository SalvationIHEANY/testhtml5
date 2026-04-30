const contenedor = document.getElementById("contenedor-noticias");
const boton = document.getElementById("btnDestacar");

let noticiasGlobal = [];

// Cargar noticias
async function cargarNoticias() {
  try {
    const respuesta = await fetch("noticias.json");
    const datos = await respuesta.json();

    noticiasGlobal = datos;

    mostrarNoticias(datos);
  } catch (error) {
    console.error("Error al cargar noticias:", error);
  }
}

function mostrarNoticias(noticias) {
  contenedor.innerHTML = "";

  noticias.forEach(noticia => {
    const article = document.createElement("article");

    article.innerHTML = `
      <header>
        <h3>${noticia.titulo}</h3>
        <p>${noticia.fecha}</p>
      </header>
      <p>${noticia.contenido}</p>
      <footer>${noticia.categoria}</footer>
    `;

    if (noticia.importante) {
      article.classList.add("importante");
    }

    contenedor.appendChild(article);
  });
}
cargarNoticias();
// Eventos destacados
boton.addEventListener("click", () => {
  const articulos = document.querySelectorAll("article");

  articulos.forEach((articulo, index) => {
    if (noticiasGlobal[index].importante) {
      articulo.classList.toggle("noticia-destacada");
    }
  });
});
cargarNoticias();