import React from 'react';
import { Box, Button, Container } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import './CreatePostForm.css';

export default function CreatePostForm({
  fileName,
  onChange,
  onSubmit,
  postCaption
}) {
  return (
    <form onSubmit={onSubmit} className="create-post-form">
      <Container className="file-upload">
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <CloudUploadOutlinedIcon sx={{fontSize: 100}} color="primary"/>
        </Box>
        {fileName ? <div className="file-name">{fileName}</div> : null}
        <label htmlFor="post-image" className="file-upload-btn">
          <input type="file" name="post-image" id="post-image" style={{display: "none"}} accept="image/png, image/gif, image/jpeg" onChange={onChange}/>
          Browse
        </label>
      </Container>
      <Container>
        <label htmlFor="post-caption-input" className="input-label">Post Caption</label>
        <textarea className="post-caption-input" id="post-caption-input" name="post-caption-input" onChange={onChange} value={postCaption}></textarea>
      </Container>
      <Container className="submit-button">
        <Button variant="contained" type="submit">Submit</Button>
      </Container>
    </form>
  );
}