import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  selectFilteredPosts,
  setSearchTerm,
} from "../../store/redditSlice";
import Subreddits from "../Subreddits/Subreddits";
import { Link } from "react-router-dom";
import Loading from "../common/Loading";
import Header from "../header/Header";
import "./Home.css";

const Home = () => {
  const reddit = useSelector((state) => state.reddit);
  const { isLoading, error, searchTerm } = reddit;
  const posts = useSelector(selectFilteredPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="error">
        <h2>Failed to load posts.</h2>
        <button type="button" onClick={() => dispatch(fetchPosts())}>
          Try again
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="error">
        <h2>No posts matching "{searchTerm}"</h2>
        <button type="button" onClick={() => dispatch(setSearchTerm(""))}>
          Go home
        </button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="sub-container">
        <Subreddits />
        <div className="posts">
          <ul className="posts-list">
            {posts.map((post) => (
              <li key={post.id}>
                <Link className="card" to={`/${post.id}`}>
                  <h3>{post.title}</h3>
                  {post?.url_overridden_by_dest?.endsWith(".jpeg") && (
                    <img src={post.url_overridden_by_dest} />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
