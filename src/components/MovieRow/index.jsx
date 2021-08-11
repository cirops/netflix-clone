import React, { useState } from 'react';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import './styles.css';

const MovieRow = ({ title, items }) => {
  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow = (event) => {
    setScrollX((currentScroll) => {
      let xOffset = currentScroll + Math.round(window.innerWidth / 2);
      if (xOffset > 0) {
        xOffset = 0;
      }
      return xOffset;
    })
  }

  const handleRightArrow = (event) => {
    setScrollX((currentScroll) => {
      let xOffset = currentScroll - Math.round(window.innerWidth / 2);

      let listWidth = items.results.length * 150;

      if ((window.innerWidth - listWidth) > xOffset) {
        xOffset = window.innerWidth - listWidth - 60;
      }

      return xOffset;
    })
  }



  return (
    <div className="movieRow">
      <h2>{title}</h2>
      <div className="movieRow--left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow--right" onClick={handleRightArrow}>
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow--listarea">
        <div className="movieRow--list" style={{
          marginLeft: scrollX,
          width: items.results.length * 150
        }}>
          {
            items.results.length && (
              items.results.map((item, key) => (
                <div key={key} className="movieRow--item">
                  <img src={
                    `https://image.tmdb.org/t/p/w300${item.poster_path}`
                  } alt="" />
                </div>
              ))
            )
          }
        </div>
      </div>
    </div>
  );
}

export default MovieRow;