// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import Tweetbox from '../Tweetbox';

const HomePage = () => {
  
  return (
    <div>
      {/* Pass loggedIn state to CreatePost component */}
      <Tweetbox  />
    </div>
  );
};

export default HomePage;

