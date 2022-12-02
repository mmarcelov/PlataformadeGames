const API_BASE_URL = 'https://api.rawg.io/api';
const CHAVE_API = 'e04d3b0f6ada41e48634b5538430bf33';
alert("A página de pesquisa infelizmente não está operante! Pedimos desculpa pelo incoveniente. Estamos trabalhando...")
$("#btn-pesquisa").click(() => {
    console.log("clicou")
    const pesquisa = $("#input")[0].value;
    console.log("pesquisa " + pesquisa)
    fetch(API_BASE_URL + `/games?&search=${pesquisa}&key=${CHAVE_API}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            data.results.forEach((item) => {
                let generos = item.genres.map(g => g.name).join("; ");
                let plataformas = item.parent_platforms.map(p => p.platform.name).join("; ");
                let plataforma = `
                <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                    <a href="detalhes.html?id=${item.id}">
                        <img src=${item.background_image} widht="100%" height="200px" />
                    </a>
                    <span><strong>${item.name}</strong></span><br />
                    <span><b>Lançamento: </b> ${item.released}</span><br />
                    <span><b>Plataformas: </b> ${plataformas}</span><br />
                    <span><b>Gênero: </b> ${generos}</span>
                </div>`
                $("#resultados").append(plataforma);
            })
        })
})