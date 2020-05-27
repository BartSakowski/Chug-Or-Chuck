const beerCard = document.querySelector(".card")
let beerArray = []

let chuckList = []


async function fetchBeers() {
  const resp = await fetch("http://localhost:3000/beers")
  const beers = await resp.json()
  beerArray = beers.data 
  renderBeer(beerArray) 
}

function renderBeer(beer) {
  const { brand, name, location, image, uploader_comment, chugs, chucks, comments } = beer[0].attributes
  const cardBrand = document.getElementById("brand")
  cardBrand.innerHTML = brand

  const cardName = document.getElementById("bartender")
  cardName.innerHTML = name

  const cardLocation = document.getElementById("location")
  cardLocation.innerHTML = location

  const cardImg = document.querySelector(".beer-avatar")
  cardImg.src = image

  const cardUploaderComment = document.getElementById("uploader_comment")
  cardUploaderComment.innerHTML = uploader_comment

  const chugNum = document.querySelector(".chugLikes")
  chugNum.innerHTML = `${chugs} Chugs`

  const chugId = document.querySelector(".chug-btn").dataset
  chugId.id = `${beer[0].id}`

  const chuckNum = document.querySelector(".chuckLikes")
  chuckNum.innerHTML = `${chucks} Chucks`

  const chuckId = document.querySelector(".chuck-btn").dataset
  chuckId.id = `${beer[0].id}`

  const userComments = document.getElementById("user_comments")
  console.log(comments)
  comments.forEach(comment => {
    userComments.innerHTML = `<li>-${comment.text}</li>`
  })


}

function addComment() {
  const commentForm = document.querySelector(".add-comment-form")
  console.log(commentForm)
  commentForm.addEventListener("click", (event) => {
    event.preventDefault()
    console.log("hey")
  })
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
      console.log(event.target.dataset)
      fetch(`http://localhost:3000/beers/${id}`, reqObj)
      .then(resp => resp.json())
      .then(chug => event.target.previousElementSibling.innerHTML = `${currentChugs + 1} Chugs`)
    
      const chugList = []
      let chugItem = beerArray.shift()
      chugList.push(chugItem)
      renderBeer(beerArray)
      loadChugList(chugList)
    }
  })
}
const chugContainer = document.querySelector("#chug-list-container")

function loadChugList(chugList) {
  const chugListItems = document.getElementById("chug-list-items")
  chugList.forEach(beer => {
    chugListItems.innerHTML += `<li class="chug-list-beers" data-beer-id=${beer.id}>${beer.attributes.brand}</li>` 
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


function chugListCardRender() {
  const chugListContainer = document.querySelector("#chug-list-container")
  chugListContainer.addEventListener('click', (event) => {
    if (event.target.className === "chug-list-beers") {
      const currentBeerId = event.target.dataset.beerId
      renderBeerListCard(currentBeerId)
    }
  })
}

function renderBeerListCard(currentBeerId) {

}


async function app() {
  await fetchBeers()
  addChug()
  addChuck()
  chugListCardRender()
  addComment()
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