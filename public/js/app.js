//console.log('Client side js file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From js'

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address='+location)
    .then((response)=>{
        response.json().then((data)=>{
            if(data.error)
                messageOne.textContent = data.error
            else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }    
        })
})
    // console.log(location)
})
