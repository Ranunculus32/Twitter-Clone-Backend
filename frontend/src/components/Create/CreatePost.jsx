//frontend
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './CreatePost.css'; // Import CSS file for styling
import axios from 'axios';
// import './Buttons/Gif.jsx';

const CreatePost = () => {
  const [content, setContent] = useState('');
  // const [author, setAuthor] = useState(''); // Assuming you'll want to set the author

  const handlePostSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/posts', {
        text: content,
        // author: author, // This should be set according to your application logic
      });
      
      console.log(response.data); // Handle the response as needed
      setContent(''); // Clear the input field after successful post submission
    } catch (error) {
      console.error('Error posting the content:', error);
    }
  };

  return (
    <div className="create-post-container">
      <Form className="create-post-form">
        <Form.Group controlId="postContent">
          <Form.Control
            as="textarea"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="post-content-input"
            placeholder="What is happening?!"
          />
        </Form.Group>
        <div className="button-group">
          <Button variant="secondary" className="post-action-button">GIF</Button>
          <Button variant="secondary" className="post-action-button">📷</Button>
          <Button variant="secondary" className="post-action-button">💼</Button>
          <Button variant="secondary" className="post-action-button">📍</Button>
          <Button variant="primary" onClick={handlePostSubmit} className="post-submit-button">Tweet</Button>
        </div>
      </Form>
    </div>
  );
};

export default CreatePost;
