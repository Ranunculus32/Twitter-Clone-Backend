// Gif.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const Gif = ({ onGifSelect }) => {
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [gifSearch, setGifSearch] = useState('');
  const [gifs, setGifs] = useState([]);

  const handleGifSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=KhAJnLOlQ6n1BbwUy4Nxyw823cbwCBd8=${gifSearch}&limit=20`);
      setGifs(response.data.data);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    }
  };

  return (
    <>
      <Button onClick={() => setShowGifPicker(true)}>GIF</Button>

      <Modal show={showGifPicker} onHide={() => setShowGifPicker(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select a GIF</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleGifSearch}>
            <input
              type="text"
              value={gifSearch}
              onChange={(e) => setGifSearch(e.target.value)}
              placeholder="Search GIFs"
            />
            <Button type="submit">Search</Button>
          </form>
          <div className="gif-container">
            {gifs.map(gif => (
              <img
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt={gif.title}
                onClick={() => {
                  onGifSelect(gif.images.fixed_height.url);
                  setShowGifPicker(false);
                }}
                className="gif-image"
              />
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Gif;
