import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPost } from "../../store/postSlice";

function Post() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { post, isLoading, comments, error } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(fetchPost(id));
    }, [])
    if (isLoading) {
        return <p>Loading</p>;
    } 
    return (
    <><div><h2>{post.title}</h2>
    <p>{post.selftext}</p>
    <img src={post.url_overridden_by_dest} /></div>
    <div>
        <ul>{comments.map(comment => (
            <li key={comment.id}><p>{comment.body}</p></li>
        ))}</ul>
        
        </div></>)
}

export default Post;