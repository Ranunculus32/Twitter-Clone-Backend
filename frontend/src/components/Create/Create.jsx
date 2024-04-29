// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Create.css'; 
import axios from 'axios';



const Create = () => {
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState(''); 
  const[] 
  
 

  const handlePostSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/posts', {
        text: content,
        author: userId, 
       
      });
      
      console.log(response.data); // Handle the response as needed
      setContent('');
      setUserId('') // Clear the input field after successful post submission 

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

export default Create;