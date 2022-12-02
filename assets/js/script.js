onload = () => {
    destaques();
    lancamentos();
    plataformas();
    desenvolvedoras();

    document.querySelector("#btn0").onclick = () => lancamentos();
    document.querySelector("#btn1").onclick = () => plataformas();
    document.querySelector("#btn2").onclick = () => desenvolvedoras();
}

const dbMock = {
    destaques: [
        { nome: 'Deathloop', desenvolvedora: 'Bethesda Softworks', lancamento: '14/09/2021', plataformas: 'Playstation 5', genero: 'Ação e Aventura', avaliacao: '88' },
    ],

    lancamentos: [
        { nome: 'Fifa 23', nota: '80' },
        { nome: 'Soulstice', nota: '74' },
        { nome: 'Tunic', nota: '90' },
        { nome: 'Moonscars', nota: '75' },
        { nome: 'Grounded', nota: '92' },
        { nome: 'Metal:Hellsiner', nota: '79' }
    ],

    plataformas: [
        { plataforma: 'Xbox', mais: 'Mais detalhes' },
        { plataforma: 'Playstation', mais: 'Mais detalhes' },
        { plataforma: 'Nintendo', mais: 'Mais detalhes' },
    ],

    desenvolvedoras: [
        { nome: 'Rockstar Games', jogos: 'GTA V' },
        { nome: 'Riot Games', jogos: 'Valorant' },
        { nome: 'EA Sports', jogos: 'FIFA' }
    ]
}


async function destaques() {

    let response = await fetch("https://api.rawg.io/api/games?page_size=3&key=e04d3b0f6ada41e48634b5538430bf33");

    let data = await response.json();

    var str = "";
    for (let i = 0; i < data.results.length; i++) {

        const element = data.results[i];

        let response = await fetch(`https://api.rawg.io/api/games/${element.id}?page_size=3&key=e04d3b0f6ada41e48634b5538430bf33`);

        let sobre = await response.json();

        let descricao = sobre.description;

        let tags = "";

        element.tags.forEach(element => {
            if (tags == "") {
                tags += element.name;
            } else {
                tags += ", " + element.name;
            }
        });

        let platforms = "";

        element.platforms.forEach(element => {
            if (platforms == "") {
                platforms += element.platform.name;
            } else {
                platforms += ", " + element.platform.name;
            }
        });

        let developers = "";

        sobre.developers.forEach(element => {
            if (developers == "") {
                developers += element.name;
            } else {
                developers += ", " + element.name;
            }
        });

        str += `<div class="carousel-item" data-bs-interval="10000">
        <div class="col-12 col-lg-6 col-md-6 col-sm-6 float-start">
            <div class="ratio ratio-16x9" id="video">
                <img src="${element.background_image}" alt="" class="img-fluid">
            </div>
        </div>
        <div class="col-12 col-lg-6 col-md-8 col-sm-6 float-end ps-4 formatacao" id="nopadding">
            <h4>${element.name}</h4>
            <span id="descri"> <b>Sobre:</b>${descricao}</span>
            <p> <b>Desenvolvedora:</b>${developers}<b class="ps-3">Lançamento:</b>${element.released}</p>
            <p> <b>Plataformas:</b>${platforms}</p>
            <p> <b>Gêneros:</b>${tags}</p>
            <p> <b>Avaliação:</b> <b class="text-danger">${element.metacritic}</b></p>
        </div>
    </div>`
    }
    document.querySelector("#teladestaque").innerHTML = str
    document.getElementById("teladestaque").firstChild.classList.toggle("active");
}

var url0 = "https://api.rawg.io/api/games?key=e04d3b0f6ada41e48634b5538430bf33&page_size=4&page=1"
async function lancamentos() {

    let response = await fetch(url0);

    let data = await response.json();

    var str = "";
    for (let i = 0; i < data.results.length; i++) {
        const element = data.results[i];

        str += `
        <div class="col-12 col-sm-3 col-md-4 col-lg-3">
            <div class="card border border-0">
                <h6 class="card-title">${element.name}<span class="float-end">${element.metacritic}</span></h6>
                <img src="${element.background_image}" style="width: 250px; height: 150px;" class="img-fluid">
                    <div class="card-body">
                    <p class="card-text text-start">Lançamento: ${element.released}</p>
                    <p class="card-text text-start">Rating: ${element.rating}</p>
                    <a href="detalhes.html?${element.id}"><button type="button" class="btn btn-outline-dark">Mais detalhes...</button></a>
                    </div>
                </div>
            </div>
        </div>`
    }

    url0 = data.next;
    document.querySelector("#lancamentos").insertAdjacentHTML("beforeend", str)
}

var url1 = "https://api.rawg.io/api/platforms?key=e04d3b0f6ada41e48634b5538430bf33&page_size=3&page=1";
async function plataformas() {

    let response = await fetch(url1);

    let data = await response.json();

    var str = "";
    for (let i = 0; i < data.results.length; i++) {
        const element = data.results[i];

        str += `
        <div class="col-12 m-0">
            <div class="card border border-0 p-1 m-1" style="width: 18rem;">
                <h4 class="card-title">${element.name}</h4>
                    <div class="p-2 m-2">
                        <img src="${element.image_background}" style="width: 100%;" alt="XBOX">
                    </div>
                <div class="card-body p-0">
                    <h6 class="card-text mb-1">Principais jogos:</h6>
                    <ul class="lista">`;
        for (let i = 0; i < 3; i++) {
            str += `<li>${element.games[i].name}</li>`
        }
        str += `</ul>
        <button type="button" class="btn btn-outline-dark">Mais detalhes...</button>
                </div>
            </div>
        </div>`
    }

    url1 = data.next;
    document.querySelector("#plat").insertAdjacentHTML("beforeend", str)
}

var url2 = "https://api.rawg.io/api/publishers?key=e04d3b0f6ada41e48634b5538430bf33&page_size=3&page=1";
async function desenvolvedoras() {

    let response = await fetch(url2);

    let data = await response.json();

    var str = "";
    for (let i = 0; i < data.results.length; i++) {
        const element = data.results[i];

        str += `
        <div class="col-12 m-0">
            <div class="card border border-0 p-1 m-1" style="width: 18rem;">
                <h4 class="card-title">${element.name}</h4>
                    <div class="p-2 m-2">
                        <img src="${element.image_background}" style="width: 100%;" alt="imag">
                    </div>
                <div class="card-body p-0">
                    <h6 class="card-text mb-1">Principais jogos:</h6>
                    <ul class="lista">`;
        for (let i = 0; i < 3; i++) {
            str += `<li>${element.games[i].name}</li>`
        }
        str += `</ul>
        <button type="button" class="btn btn-outline-dark">Mais detalhes...</button>
                </div>
            </div>
        </div>`
    }

    url2 = data.next;
    document.querySelector("#desenvol").insertAdjacentHTML("beforeend", str)
}
