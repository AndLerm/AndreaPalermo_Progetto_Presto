let navbar = document.querySelector('.navbar');
let navLinks = document.querySelectorAll('.nav-link');
let logo = document.querySelector('#mylogo');


window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbar.style.backgroundColor = 'black';
        logo.style.color = 'white'
        navLinks.forEach(navLink => {
            navLink.style.color = 'white';
        })
    } else {
        navbar.style.backgroundColor = 'transparent';
        logo.style.color = '#e19130'
        navLinks.forEach(navLink => {
            navLink.style.color = '#e19130';
        })
    
    }
    })

  
fetch('./annunci.json')
.then((response) => response.json())
.then((data) => {


        // Creazione cards
        let card_wrap = document.querySelector('#card_wrap');
        function mostracard(array){
            card_wrap.innerHTML = "";
            array.forEach((element) =>  {
                let div = document.createElement('div');
                div.classList.add("col","mb-4" );
                
                div.innerHTML = `<div class="card p-3" style="width: 18rem;">
    
                <img class="img-cst" src="https://assets.thehansindia.com/h-upload/2022/07/18/1303611-pro.webp">
            
                    <div class="card-body">
                      
                        <h5 class="card-title">${element.name}</h5>
                        <h5 class="card-text fs-4">$ ${element.price}</h5>
                        <p class="card-text">${element.category}</p>
                        
                        <div class="d-flex justify-content-between align-items-center"><a href="#" class=" button-6">Buy Now<i class="fa-solid fa-bag-shopping ms-2"></i></a><i class="fa-regular fa-heart"></i></div>
                        
                    </div>
                </div> `
                card_wrap.appendChild(div)
            })
        }
        mostracard(data)

        
    let categoriewrap = document.querySelector('#categoriewrap')

    // Creazione delle categorie
    function filtrocategorie () {
        let categorie = data.map((categoria) =>
            categoria.category
            );

            
        let categorieUniche = [];
        categorie.forEach((categoria) =>{
            if (!categorieUniche.includes(categoria)){
                categorieUniche.push(categoria)
            }
        })

        categorieUniche.forEach((categoriaUnica) => {
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `

                <input class="form-check-input" type="radio" name="flexRadioDefault" id="${categoriaUnica}">
                <label class="form-check-label" for="${categoriaUnica}">${categoriaUnica}</label>

            `
            categoriewrap.appendChild (div)
            
        })
    }
    filtrocategorie()


    // Filtra per categorie ceccate
    let checkBoxes = document.querySelectorAll(".form-check-input");

    function filtraCheckbox(){
        let radios = Array.from(checkBoxes);
        // console.log(radios)
        let trova = radios.find((element)=> element.checked)
        let filtered = data.filter((element) => element.category == trova.id)
        console.log(trova.id)
        if(trova.id != "All"){
            mostracard(filtered)
        }else{
            mostracard(data)
        }
    }

    checkBoxes.forEach((input) =>{
        input.addEventListener("click", ()=>{
            filtraCheckbox()
        })
    })


    // Filtra per prezzo
    let prezzoInput = document.querySelector('#priceInput');
    let formLabel = document.querySelector('.form-label');

    function prezzoMaggiore(){
        let prezzi = data.map((element) => +element.price);

        let maxPrezzo = Math.ceil(Math.max(...prezzi));
        let minPrezzo = Math.min(...prezzi)
        prezzoInput.max = maxPrezzo
        prezzoInput.min = minPrezzo
        prezzoInput.value = maxPrezzo
        console.log(prezzoInput)
        console.log(maxPrezzo)
    }

    prezzoMaggiore();

    function filtraPerPrezzo(){
        let filtered = data.filter((element) => +element.price <= +prezzoInput.value).sort((a,b) => a.price - b.price)
        mostracard(filtered)
    }



    prezzoInput.addEventListener('input', ()=> {
        formLabel.innerHTML = '$' + prezzoInput.value;
        filtraPerPrezzo();
    } )


    // filtra per parola

let parolaInput = document.querySelector('#parolaInput')

    function filtroParola () {
        let inputValue = parolaInput.value;
        let filtered = data.filter((element) => element.name.toLowerCase().includes(inputValue.toLowerCase()))
        mostracard(filtered)

    }


    parolaInput.addEventListener('input', () => {
        filtroParola()
    })

})


function filtroGlobale (){
    let filtrocategorie = filtrocategorie(data);
    let filtraPerPrezzo = filtraPerPrezzo (filtrocategorie);
    let filtroParola = filtroParola (filtraPerPrezzo);

    mostracard (filtroParola)
}




