import React from 'react';
import loadingIMG from '../../assets/loading.png';

const SearchLoading = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <img 
        src={loadingIMG} 
        alt="loading" 
        className="w-16 h-16 animate-spin"
      />
    </div>
  );
};

export default SearchLoading;
