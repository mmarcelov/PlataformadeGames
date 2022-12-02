const id = location.href.split("?")[1];
console.log(id);

onload = () => {
    detalhes();
}

async function detalhes() {

    let response = await fetch(`https://api.rawg.io/api/games/${id}?page_size=3&key=e04d3b0f6ada41e48634b5538430bf33`);

    let data = await response.json();
    let stores = data.stores;
    var str = "";

    let tags = "";

    data.tags.forEach(element => {
        if (tags == "") {
            tags += element.name;
        } else {
            tags += ", " + element.name;
        }
    });

    let platforms = "";

    data.platforms.forEach(element => {
        if (platforms == "") {
            platforms += element.platform.name;
        } else {
            platforms += ", " + element.platform.name;
        }
    });


    let developers = "";

    data.developers.forEach(element => {
        if (developers == "") {
            developers += element.name;
        } else {
            developers += ", " + element.name;
        }
    });

    let genres = "";

    data.genres.forEach(element => {
        if (genres == "") {
            genres += element.name;
        } else {
            genres += ", " + element.name;
        }
    });


    str += `<section>
        <section class="container-fluid">
            <div class="d-flex justify-content-start">
                <div>
                    <h1 class="justify-content-lg-between" id="destaque">${data.name}</h1>
                </div>
            </div>
            <div>
                <span class="dta-lan">${data.released}</span>
            </div>
        </section>
        <div class="container-fluid" style="padding: 10px 50px;">
            <div id="resumo">
                <p id="resum">
                    <strong>Em primeiro lugar o Resumo:</strong>
                    <br>
                    ${data.description}
                </p>
                <p id="informe">
                    <br>
                    Devenvolverdora: ${developers}
                    <br>
                    Plataformas: ${platforms}
                    <br>
                    Gêneros: ${genres}
                    <br>
                    Metacritic: <strong class="text-danger">${data.metacritic}</strong>
                    <br>
                    Rating: <strong class="text-danger">${data.rating}</strong>
                </p>
                <p id="tags">
                    <br>
                    <strong>Tags:</strong>
                    <br>
                    ${tags}
                </p>
            </div>
        </div>
    </section>
    <section class="container-fluid" style="padding: 10px 50px;">
        <div class="row">
            <div class="col-sm-6">
                <div class="card border border-0">
                    <img src="${data.background_image}" style="width: 75%;" class="img-fluid">
                </div>
            </div>
        </div>
    </section>
    <section class="container text-center" style="padding: 10px 50px;">
        <br>
        <h3 class="loja"><strong>Lojas:</strong></h3>
        <ul style="list-style: none;">`;
    for (let i = 0; i < stores.length; i++) {
        let sto = stores[i].store;
        str += `<li><a href="https://${sto.domain}"><button type="button" class="btn btn-outline-dark w-100">${sto.name}</a></li>`
    }
    str += `</ul>
    </section>`
    console.log(stores);

    document.querySelector("#detalhes").innerHTML = str
}