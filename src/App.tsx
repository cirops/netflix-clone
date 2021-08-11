import { useState, useEffect } from 'react';

import { getHomeList, getMovieInfo } from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

import './App.css';

export interface MovieListItemProps {
  id: string;
  poster_path: string;
}

interface MovieListProps {
  slug: string;
  title: string;
  items: {
    results: MovieListItemProps[];
  };
};

export interface FeaturedMovieProps {
  id: number;
  backdrop_path: string;
  original_name: string;
  first_air_date: string;
  vote_average: number;
  number_of_seasons: number;
  overview: string;
  genres: {
    name: string;
  }[];
}

const App = () => {
  const [movieList, setMovieList] = useState<MovieListProps[]>([])
  const [featuredData, setFeaturedData] = useState<FeaturedMovieProps | null>(null)
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      const list = await getHomeList() as MovieListProps[];

      const originals = list.filter((item) => item.slug === 'originals');
      const randomChosen = Math.floor((Math.random() * originals[0].items.results.length - 1));
      const chosenMovie = originals[0].items.results[randomChosen];
      const movieInfo = await getMovieInfo(chosenMovie.id, 'tv') as FeaturedMovieProps;

      setMovieList(list);
      setFeaturedData(movieInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])
  return (
    <div className="page">
      <Header black={blackHeader} />
      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow
            key={key} title={item.title}
            items={item.items.results}
          />
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> pela B7web<br />
        Direitos de imagem para Netflix<br />
        Dados pegos do site Themoviedb.org
      </footer>
      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif" alt="Carregando" />
        </div>
      }
    </div>
  );
}

export default App;