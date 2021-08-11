import React from 'react';

import './styles.css'

const FeaturedMovie = ({ item }) => {
  const firstAirDate = new Date(item.first_air_date);

  return (
    <section className="featured" style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: item.backdrop_path ? `url(https://image.tmdb.org/t/p/original${item.backdrop_path})` : ''
    }}>
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured-name">{item.original_name}</div>
          <div className="featured--info">
            <div className="featured--points">{item.vote_average} pontos</div>
            <div className="featured--year">{firstAirDate.getFullYear()}</div>
            <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons > 1 && 's'}</div>
          </div>
          <div className="featured--description">
            {item.overview.length < 200 ? item.overview : item.overview.substring(0, 200) + "..."}
          </div>
          <div className="featured--buttons">
            <a href={`/watch/${item.id}`} className="featured--watchbutton">▶ Assistir</a>
            <a href={`/list/add/${item.id}`} className="featured--mylistbutton">+ Minha Lista</a>
          </div>
          <div className="featured--genres">
            <strong>Gêneros: </strong>
            {item.genres.map((genre, index) => {
              return index < item.genres.length - 1 ?
                genre.name + ', ' :
                genre.name
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedMovie;