var ENV = process.env.NODE_ENV ? 'beamup' : 'local';
require('dotenv').config();
const sortOpts = require('./sortOpts.json');

function getSortValues(){
  const values = [];
  const {SortOptions,SortDirections} = sortOpts;
  SortOptions.forEach((sort) => {
    SortDirections.forEach((direction) => {
      values.push(`${sort.value} ${direction.value}`);
    })
  })
  return values;
}

function getConfig(env = ENV){
  var config = {
    host: "https://api.trakt.tv",
    'API_KEY': process.env.API_KEY,
    'client_secret': process.env.client_secret,
    'client_id': process.env.client_id,
    'tmdb': process.env.tmdb
  }

  //config.CacheControl = 'max-age=86400, stale-while-revalidate=43200, stale-if-error=86400, public';

  config.CacheControl = 'max-age=3600, stale-while-revalidate=1800, stale-if-error=3600, public';
  config.lists_array = { 'trakt_trending': "trakt - Trending", 'trakt_popular': "trakt - Popular", 'trakt_watchlist': "trakt - Watchlist", 'trakt_rec': "trakt - Recommended" };
  config.genres = ["action", "adventure", "animation", "anime", "comedy", "crime", "disaster", "documentary", "Donghua", "drama", "eastern", "family", "fan-film", "fantasy", "film-noir", "history", "holiday", "horror", "indie", "music", "musical", "mystery", "none", "road", "romance", "science-fiction", "short", "sports", "sporting-event", "suspense", "thriller", "tv-movie", "war", "western"];
  config.sort_array = getSortValues() // ["added asc", "added desc", "title asc", "title desc", "released asc", "released desc", "runtime asc", "runtime desc", "votes asc", "votes desc", "rating asc", "rating desc", "rank asc", "rank desc"];
  config.count = 100;
  switch (env) {
    case 'beamup':
      config.port = process.env.PORT;
      config.local = "https://stremio-trakt-2e39d7982687.herokuapp.com"
      break;

    case 'local':
      config.port = 63355;
      config.local = "http://127.0.0.1:" + config.port;
      break;
  }
  return config;
}


module.exports = getConfig;
