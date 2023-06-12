let navbar = document.querySelector('.navbar');
let navLinks = document.querySelectorAll('.nav-link');
let logo = document.querySelector('#mylogo');
let price1 = document.querySelector("#counter1")
let price2 = document.querySelector("#counter2")
let price3 = document.querySelector("#counter3")
let btnHeader = document.querySelector("#btn-header")

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

function creaContatore(elemento, counter, limiteNum, interv){
    let interval = setInterval(() =>{
        if(counter < limiteNum){
            counter++;
            elemento.innerHTML = counter;
        }else{
            clearInterval(interval);
        }
    }, interv)
}



let confirm = false;
let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) =>{
        if(entry.isIntersecting && confirm == false){
            creaContatore(price1, 2000, 2022, 100);
            creaContatore(price2, 1000, 5000, 0.1);
            creaContatore(price3, 100, 200, 100);
            confirm = true;
            setTimeout(() =>{
                confirm = false;
            }, 6000)
        }
    })
})

observer.observe(price1);


// cards

let annunci = [
    {nome : 'Giacca Salewa', categoria : 'Abbigliamento', prezzo : '80 $', url: "./img/giacca-salewa-pedroc-hybrid-3PTX.jpg" },
    {nome : 'Giacca grey', categoria : 'Abbigliamento', prezzo : '95 $', url: "./img/Giacca-uomo-MH-500.png"},
    {nome : 'Giacca Blu', categoria : 'Abbigliamento', prezzo : '70 $', url: "./img/images.jpg"},
];

let row = document.querySelector('.riga')
annunci.forEach((annuncio) =>{


    let div = document.createElement('div')
    div.classList.add('col-12', 'col-md-4', 'd-flex', 'justify-content-evenly');

    div.innerHTML = `
    <div class="card p-3" style="width: 18rem;">

    <img class="img-cst" src="${annuncio.url}">

        <div class="card-body">
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            NEW
            <span class="visually-hidden">unread messages</span>
            </span>
            <h5 class="card-title">${annuncio.nome}</h5>
            <p class="card-text">${annuncio.categoria}</p>
            <p class="card-text">${annuncio.prezzo}</p>
            <div class="d-flex justify-content-between align-items-center"><a href="#" class=" button-6">Buy Now<i class="fa-solid fa-bag-shopping ms-2"></i></a><i class="fa-regular fa-heart"></i></div>
            
        </div>
    </div> `

    row.appendChild(div);
})



let icons = document.querySelectorAll('.fa-heart')
let imgCards = document.querySelectorAll(".img-cst")

icons.forEach((icon) => { 
    icon.addEventListener('click',() => {
        icon.classList.toggle('fa-solid');
        icon.style.color = 'red';
    })
} )

imgCards.forEach((card, index) =>{
    card.addEventListener("dblclick", ()=>{
        icons[index].classList.toggle('fa-solid');
        icons[index].style.color = 'red';
    })
})


function contatoreCarrello(elemento, contatore, limiteN, intervallo){
    let interval = setInterval(()=>{
        if(contatore < limiteN){
            contatore++;
            elemento.innerHTML = contatore;
        }else{
            clearInterval(interval)
        }
    }, intervallo)
}

contatoreCarrello(btnHeader, 0, 8, 1000);










AOS.init();