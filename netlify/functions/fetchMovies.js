const fetch = require('node-fetch')

exports.handler = async function (event, context) {
  const eventBody = JSON.parse(event.body)
  const query = eventBody.query
  const API_SECRET = process.env.REACT_APP_API_SECRET

  const url = query === "popular" ? `https://api.themoviedb.org/3/trending/all/week?api_key=${API_SECRET}`
    : /\d{4}/.test(parseInt(query)) ? `https://api.themoviedb.org/3/discover/movie?api_key=${API_SECRET}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=${query}`
      : `https://api.themoviedb.org/3/search/multi?api_key=${API_SECRET}&language=en-US&query=${query}&page=1&include_adult=false`;

  const response = await fetch(url)
  const data = await response.json()
  return {
    statusCode: 200,
    body: JSON.stringify({
      data: data.results
    })
  }
}