import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Data from '../data';
import CardAgain from './CardAgain';

const ComunitySection = () => {
  const [click, setClick] = useState(false);
  const [tag, setTag] = useState(Data);

  useEffect(() => {
    // This will only run after the initial render
    // and when the 'tag' state is updated.
    // Add any additional logic you need here.
  }, [tag]);

  function clickHandler() {
    setClick(!click);
  }

  function filterHandler(tagData) {
    if(tagData==="All categories")
    {
      setTag(Data);
    }
   else{
    const filterData = Data.filter((data) => data.blog[0].tag === tagData);
    setTag(filterData);
   }
  }

  return (
    <div className='w-full h-max flex flex-col items-center justify-center'>
            <h1 className='text-[rgb(145,105,255)] text-center text-3xl  mt-10'>From Our Community</h1>
      <div className='w-0 overflow-hidden md:w-[80%] md:h-max flex items-center justify-center text-white text-xl gap-x-5 uppercase mt-10 mb-10'>
        <button className='uppercase' onClick={() => filterHandler('All categories')}>All categories</button>
        <button className='uppercase' onClick={() => filterHandler('technology')} >Technology</button>
        <button className='uppercase' onClick={() => filterHandler('sport')} >Sports</button>
        <button  className='uppercase' onClick={() => filterHandler('nature')}>Nature</button>
        <button className='uppercase' onClick={() => filterHandler('entertainment')} >Entertainment</button>
      </div>
      <button onClick={clickHandler} className='mb-10 md:hidden'>
        <GiHamburgerMenu className='w-[50px] h-[50px] text-white' />
      </button>
      {click ? (
        <div className='flex flex-col items-center justify-center text-white gap-y-5 mb-10'>
          <button className='uppercase' onClick={() => filterHandler('All categories')}>
            All categories
          </button>
          <button className='uppercase' onClick={() => filterHandler('technology')}>
            Technology
          </button>
          <button className='uppercase' onClick={() => filterHandler('sport')}>
            Sports
          </button>
          <button className='uppercase' onClick={() => filterHandler('nature')}>
            Nature
          </button>
          <button className='uppercase' onClick={() => filterHandler('entertainment')}>
            Entertainment
          </button>
        </div>
      ) : null}
      <div className='w-[80%] h-max flex flex-wrap items-center justify-center'>
        {tag.map((data) => {
          return <CardAgain data={data} key={data.id} />;
        })}
      </div>
    </div>
  );
};

export default ComunitySection;
