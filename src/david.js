

// console.log("hello", commentForm)

// const newComment = () => {
//   const commentForm = document.querySelector(".add-comment-form")
  
//   commentForm.addEventListener("submit", (event) => {
//     event.preventDefault()
//     console.log("hey")
//   })
   
// }












// const newToy = () => {
//   const form = document.querySelector(".add-toy-form")
//   form.addEventListener("submit", (event) => {
//     event.preventDefault()
//     const name = event.target[0].value
//     const image = event.target.image.value
//     const reqObj = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify({
//         "name": name,
//         "image": image,
//         "likes": 0
//       })
//     }
//     fetch(`http://localhost:3000/toys/`, reqObj)
//     .then(resp => resp.json())
//     .then(toy => toyCollection.innerHTML += `<div class="card"><h2>${toy.name}</h2><img src=${toy.image} class="toy-avatar" /><p>${toy.likes} Likes </p><button data-id=${toy.id} class="like-btn">Like <3</button></div>`)

//   })
// }

