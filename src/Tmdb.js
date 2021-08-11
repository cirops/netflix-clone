const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const API_BASE = process.env.REACT_APP_TMDB_API_BASE;

const API_SUFFIX = `language=pt-BR&api_key=${API_KEY}`

const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`);
  const json = await req.json();
  return json;
}

export const getHomeList = async () => {
  return [
    {
      slug: 'originals',
      title: 'Originais do Netflix',
      items: await basicFetch(`/discover/tv?with_network=213&${API_SUFFIX}`)
    },
    {
      slug: 'trending',
      title: 'Recomendados para Você',
      items: await basicFetch(`/trending/all/week?${API_SUFFIX}`)
    },
    {
      slug: 'toprated',
      title: 'Em Alta',
      items: await basicFetch(`/movie/top_rated?${API_SUFFIX}`)
    },
    {
      slug: 'action',
      title: 'Ação',
      items: await basicFetch(`/discover/movie?with_genres=28&${API_SUFFIX}`)
    },
    {
      slug: 'comedy',
      title: 'Comédia',
      items: await basicFetch(`/discover/movie?with_genres=35&${API_SUFFIX}`)
    },
    {
      slug: 'horror',
      title: 'Terror',
      items: await basicFetch(`/discover/movie?with_genres=27&${API_SUFFIX}`)
    },
    {
      slug: 'romance',
      title: 'Romance',
      items: await basicFetch(`/discover/movie?with_genres=10749&${API_SUFFIX}`)
    },
    {
      slug: 'documentary',
      title: 'Documentário',
      items: await basicFetch(`/discover/movie?with_genres=99&${API_SUFFIX}`)
    },

  ]
}

export const getMovieInfo = async (movieId, type) => {
  let info = {};
  
  if(movieId) {
    switch(type) {
      case 'movie':
        info = await basicFetch(`/movie/${movieId}?${API_SUFFIX}`)
        break;
      case 'tv':
        info = await basicFetch(`/tv/${movieId}?${API_SUFFIX}`)
        break;
      default:
        throw new Error('Something went wrong.');
    }
  }

  return info;
}