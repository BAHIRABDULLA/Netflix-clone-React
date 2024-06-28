import React, { useEffect, useState } from 'react'
import './Player.css'
import axios from 'axios'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id}=useParams()
  const navigate = useNavigate()

const [apiData,setApiData]= useState({
  name:'',
  key:'',
  published_at:'',
  typeof:''
})

const options = {
  method: 'GET',
  url: `https://api.themoviedb.org/3/movie/${id}/videos`,
  params: {language: 'en-US'},
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjY2MDg1NTI3YWUxYzZmMTI3YzQ0NTYxYzk2NjIxNSIsIm5iZiI6MTcxOTUxNDgyNC43MDAzNDksInN1YiI6IjY2N2RhZWMwYmZmNTMzYmEzMmQ1ZTFiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lHgfGsby8ay4_rcZa4doamxJcB5X_9CR4u4srwuCJuA'
  }
};

useEffect(()=>{
  axios
  .request(options)
  .then(function (response) {
    setApiData(response.data.results[0])
    // console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

},[])







  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>navigate(-1)}/>
      <iframe src={`https://www.youtube.com/embed/${apiData.key}`} 
      width={'90%'} height={'90%'} frameborder="0"  title='trailer' allowFullScreen></iframe>
      <div className="player-info">
        <p>Published : {apiData.published_at.slice(0,10)}</p>
        <p>Movie : {apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player