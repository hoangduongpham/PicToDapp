import React from 'react';
import Container from '@mui/material/Container';

import './Post.css';

export default function Post({caption, imageUrl, user}) {
  return (
    <Container className="post">
      <div className="user-address">{user}</div>
      <img className="post-image" src={imageUrl} alt="post"/>
      <p className="post-caption">{caption}</p>
    </Container>
  );
}