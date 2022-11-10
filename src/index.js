const movieTitles = document.getElementById("films")
const poster = document.getElementById("poster")
const title = document.getElementById("title")
const runtime = document.getElementById("runtime")
const showtime = document.getElementById("showtime")
const filmInfo = document.getElementById("film-info")
const ticketNum = document.getElementById("ticket-num")
const buyTicket = document.getElementById("buy-ticket")
let movieId

const displayTitles = async () => {
    let req = await fetch("http://localhost:3000/films")
    let res = await req.json()

    res.forEach((movie) => {
        let title = document.createElement("li")
        title.innerText = movie.title
        movieTitles.appendChild(title)
        title.setAttribute("class", "film item")

        title.addEventListener("click", () => {
            displayDetails(movie)
        })


    })
    movieId = res.id
    firstMovie = res[0]
    displayDetails(firstMovie)


}

const displayDetails = (movie) => {
    poster.src = movie.poster
    title.innerText = movie.title
    runtime.innerText = movie.runtime + " minutes"
    showtime.innerText = movie.showtime
    filmInfo.innerText = movie.description
    let ticketNumber = movie.capacity - movie.tickets_sold
    ticketNum.innerText = ticketNumber
    let ticketSold = movie.tickets_sold

    buyTicket.addEventListener("click", async () => {
        if (ticketNumber >= 1) {
            ticketNumber = ticketNumber - 1
            ticketSold = ticketSold + 1

            let req = await fetch(`http://localhost:3000/films/${movieId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    capacity: ticketSold
                })

            })
            if (ticketNumber = 0) {
                ticketNumber = 0
                buyTicket.innerText = "Sold Out"
                title.setAttribute("sold-out film item")
            }
            ticketNum.innerText = ticketNumber






        }




        displayTitles()