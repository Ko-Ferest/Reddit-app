import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectSubreddits } from '../../store/redditSlice';

function Subreddits() {
    const subreddits = useSelector(selectSubreddits);
    const dispatch = useDispatch();
    return (
        <aside>{subreddits.map(subreddit => (
                <button key = {subreddit.id} onClick={() => dispatch(fetchPosts(subreddit.url))}>{subreddit.name}</button>
              ))}
        </aside>
    )
}

export default Subreddits;