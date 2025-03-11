import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchPost } from "../../store/postSlice";
import Loading from "../common/Loading";
import "./Post.css";

function Post() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { post, isLoading, comments, error } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch(fetchPost(id));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <header className="post-header">
        <Link to="/">Home</Link>
      </header>
      <article className="post card">
        <h2>{post.title}</h2>
        <div className="post-body">
          {post?.url_overridden_by_dest?.endsWith(".jpeg") && (
            <img src={post.url_overridden_by_dest} />
          )}
          <p>{post.selftext}</p>
        </div>
      </article>
      <div className="comments">
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.body}</p>
              <p className="author">{comment.author}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Post;
