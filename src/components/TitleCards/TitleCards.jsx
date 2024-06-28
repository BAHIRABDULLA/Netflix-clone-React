import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import axios from 'axios';
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';
const TitleCards = ({ title, category }) => {
  const cardsRef = useRef()

  const [apiData ,setApiData]= useState([])

  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${category?category:'now_playing'}`,
    params: { language: 'en-US', page: '1' },
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjY2MDg1NTI3YWUxYzZmMTI3YzQ0NTYxYzk2NjIxNSIsIm5iZiI6MTcxOTUxNDgyNC43MDAzNDksInN1YiI6IjY2N2RhZWMwYmZmNTMzYmEzMmQ1ZTFiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lHgfGsby8ay4_rcZa4doamxJcB5X_9CR4u4srwuCJuA'
    }
  };



  const handleWheel = (event) => {
    event.preventDefault()
    cardsRef.current.scrollLeft += event.deltaY
  }
  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        // console.log(response.data);
        setApiData(response.data.results)
      })
      .catch(function (error) {
        console.error(error);
      });

    cardsRef.current.addEventListener('wheel', handleWheel)
  },[])
  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {
          apiData.map((card, index) => {
            return <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/original`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          })
        }
      </div>
    </div>
  )
}

export default TitleCards