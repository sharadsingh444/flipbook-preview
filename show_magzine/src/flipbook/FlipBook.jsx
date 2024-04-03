import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShowFlipBook from './ShowFlipbook';
import { useSearchParams } from 'react-router-dom';

const FlipBook = () => {
  let [searchParams] = useSearchParams();
  const [images,setImages]=useState(null)
  
  const edition = searchParams.get('edition');
  const table = searchParams.get('table');
console.log(edition,table);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/flipbook/?edition=${edition}&table=${table}`);
        console.log(response.data);
        if(response.status==200){
        setImages(response.data[0])
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (edition && table) {
      fetchData();
    }
  }, [edition, table]); 
console.log('images',images);
  return (
    <>
    {
      images &&
      <ShowFlipBook images={images}/>
    }
    </>
  );
};

export default FlipBook;