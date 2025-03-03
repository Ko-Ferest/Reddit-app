import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import Post from '../Post/Post';
//import PostLoading from '../Post/PostLoading';
import {
  fetchPosts,
  selectFilteredPosts,
  selectSubreddits,
  setSearchTerm
} from '../../store/redditSlice';
import Header from '../header/Header';
import Subreddits from '../Subreddits/Subreddits';
//import './Home.css';

const Home = () => {
  const reddit = useSelector((state) => state.reddit);
  const { isLoading, error, searchTerm } = reddit;
  const posts = useSelector(selectFilteredPosts);
  const subreddits = useSelector(selectSubreddits);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (isLoading) {
    return (
      <p>Loading...</p>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Failed to load posts.</h2>
        <button
          type="button"
          onClick={() => dispatch(fetchPosts())}
        >
          Try again
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="error">
        <h2>No posts matching "{searchTerm}"</h2>
        <button type="button" onClick={() => dispatch(setSearchTerm(''))}>
          Go home
        </button>
      </div>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </>
  ); 
};

export default Home;
