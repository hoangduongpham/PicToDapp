/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Button, Container, Typography } from '@mui/material';
import { IoClose } from 'react-icons/io5'
import { create } from 'ipfs-http-client';
import Post from  '../../components/post/Post';
import CreatePostForm from '../../components/create-post-form/CreatePostForm';
import './Home.css';

export function Home({ fileName, onChange, onSubmit, posts, postCaption }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="home">
      <Container className="create-post">
        <Typography component="h1" variant="h4" color="text.primary">PicToDapp</Typography>
        <Button variant="contained" onClick={() => setModalIsOpen(true)}>Create post</Button>
      </Container>
      {posts.map(post => (
        <Post
          key={post.id}
          caption={post.caption}
          imageUrl={`https://ipfs.io/ipfs/${post.ipfsHash}`}
          user={post.user}
        />
      ))}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <div className="close-form">
          <IoClose onClick={() => setModalIsOpen(false)}/>
        </div>
        <CreatePostForm
          fileName={fileName}
          onChange={onChange}
          onSubmit={onSubmit}
          postCaption={postCaption}
        />
      </Modal>
    </div>
  )
}

export function HomeWrapper({ account, picToDapp }) {
  const [posts, setPosts] = useState([]);
  const [postForm, setPostForm] = useState({ 'post-image': '', 'post-caption-input': '' });
  const client = create('https://ipfs.infura.io:5001/api/v0')

  useEffect(() => {
    (async function() {
      setupPostCreatedListener();
      const loadedPosts = await picToDapp.methods.getPosts().call();
      const posts = []
      loadedPosts.forEach(post => {
        posts.unshift(post)
      });
      setPosts(posts);
    })();
  }, []);

  function setupPostCreatedListener() {
    picToDapp.events.Posted({}, (contractEvent) => {
      const { ipfsHash, caption, id, user } = contractEvent.returnValues;
      setPosts(previousState => [{ ipfsHash, caption, id, user }, ...previousState]);
    });
  }

  function onChange(event) {
    const target = event.target;
    const isFileInput = target.files !== undefined;
    const newValue = isFileInput ? target.files[0] : target.value;
    setPostForm(previousState => ({...previousState, [target.name]: newValue}));
  }

  async function onSubmit(event) {
    event.preventDefault();
    const file = postForm['post-image'];
    const caption = postForm['post-caption-input'];
    const added = await client.add(file);
    await picToDapp.methods.createPost(added.path, caption).send({ from: account });
    window.location.reload(false);
  }

  return (
    <Home
      fileName={postForm['post-image'] ? postForm['post-image'].name : null}
      onChange={onChange}
      onSubmit={onSubmit}
      posts={posts}
      postCaption={postForm['post-caption-input']}
    />
  )
}