const URL = 'https://cinema-task-backend.herokuapp.com/graphql'

export const getAllFilms = () => fetch(URL, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    query: `
      query {
        allFilms {
          name
          description
          posterLink
          id
        }
      }
    `
  })
})

export const getFilm = (filmID) => fetch(URL, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    query: `
      query {
        getFilm (id: "${filmID}") {
          name
          description
          posterLink
          id
          sessions {
            time
            date
            seats
            id
          }
        }
      }
    `
  })
})

export const newFilm = (name, description, posterLink) => fetch(URL, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    query: `
      mutation {
        newFilm(
          name: "${name}"
          description: "${description}"
          posterLink: "${posterLink}"
        ) {
          name
          id
        }
      }
    `
  })
})

export const getFilmSessions = (filmID) => fetch(URL, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    query: `
      query {
        getFilmSessions(id: "${filmID}") {
          id
          date
          time
          film
          seats
        }
      }
    `
  })
})

export const getHalls = () => fetch(URL, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    query: `
      query {
        getHalls {
          name
          id
        }
      }
    `
  })
})

export const newSession = (date, time, filmID, hallID) => fetch(URL, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    query: `
      mutation {
        newSession(
          date: "${date}"
          time: "${time}"
          filmID: "${filmID}"
          hallID: "${hallID}"
        ) {
          date
          time
          id
        }
      }
    `
  })
})

export const buyTickets = (sessionID, tickets) => fetch(URL, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    variables: {
      tickets
    },
    query: `
      mutation buyTicketsMutation ($tickets: [String!]!) {
        buyTickets(
          sessionID: "${sessionID}",
          tickets: $tickets
        ) {
          id
          session {
            id
            time
            date
            film {
              name
            }
          }
          seat
          row
        }
      }
    `
  })
})
