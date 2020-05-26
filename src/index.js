const beerCard = document.querySelector(".card")
let beerArray = []
let chugList = []
let chuckList = []


async function fetchBeers() {
  const resp = await fetch("http://localhost:3000/beers")
  const beers = await resp.json()
  beers.data.forEach(pushToBeerArray)  
}

function pushToBeerArray(beer){
  beerArray.push(beer)
}

function renderBeer(beer) {

  const { brand, name, location, image, uploader_comment, chugs, chucks } = beer[0].attributes
  beerCard.innerHTML =
  `<h2>${brand}</h2>
  <h3>${name}</h3>
  <h3>${location}</h3>
  
  <img src=${image} class="beer-avatar" />
  <h4>${uploader_comment}</h4> 
  <ul id="user_comments"></ul>
  <span>
  <p class="chugLikes"> ${chugs} Chugs</p>
  <button class="chug-btn" data-id=${beer[0].id}>Chug </button>
  <p class="chuckLikes"> ${chucks} Chucks</p>
  <button class="chuck-btn" data-id=${beer[0].id}>Chuck</button>
  </span>`
  // console.log(name)
  // console.log(beer[0].id)
}

function addChug() {
  // const chugBtn = document.querySelector(".chug-btn")
  beerCard.addEventListener('click', (event) => {
    event.preventDefault()
    if (event.target.className === "chug-btn") {
      let currentChugs = parseInt(event.target.previousElementSibling.innerHTML)
      const reqObj = {
        method: "PATCH",
        headers: 
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify ({
          "chugs": currentChugs + 1
        })
      }
      const id = event.target.dataset.id
      fetch(`http://localhost:3000/beers/${id}`, reqObj)
      .then(resp => resp.json())
      .then(chug => event.target.previousElementSibling.innerHTML = `${currentChugs + 1} Chugs`)
    

      let chugItem = beerArray.shift()
      chugList.push(chugItem)
      renderBeer(beerArray)
      loadChugList(chugList)
      console.log(chugList)

    }
  })
}
const chugContainer = document.querySelector("#chug-list-container")

function loadChugList(chugList) {
  chugList.forEach(beer => {
    chugContainer.innerHTML += `${beer.attributes.brand}`
  }
  )

}

function addChuck() {

  beerCard.addEventListener('click', (event) => {
    if (event.target.className === "chuck-btn") {
      let currentChucks = parseInt(event.target.previousElementSibling.innerHTML)
      const reqObj = {
        method: "PATCH",
        headers: 
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify ({
          "chucks": currentChucks + 1
        })
      }
      const id = event.target.dataset.id
      fetch(`http://localhost:3000/beers/${id}`, reqObj)
      .then(resp => resp.json())
      .then(chug => event.target.previousElementSibling.innerHTML = `${currentChucks + 1} Chucks`)

      let chuckItem = beerArray.shift()
      chuckList.push(chuckItem)
      renderBeer(beerArray)
    }
  })
}



async function app() {
  await fetchBeers()
  renderBeer(beerArray)
  addChug()
  addChuck()
  // loadChugList()
}

app()

// console.log(beerArray)
// fetchBeers()
// addChug()
// renderBeer(beer)


// renderBeer()

// Sequential
// Callback
// SetTimeout
// Promise
// Async/await
          // function fetchBeers() {
          //  fetch("http://localhost:3000/beers")
          //     .then(resp => resp.json())
          //     .then(beers => {
          //       // renderBeer(beers.data[0])
          //       beers.data.forEach(pushToBeerArray)
          //       console.log(beerArray, '------')
          //     })
          //     .then(() => {
          //       console.log(beerArray, '------')
          //     })
          
          //   }