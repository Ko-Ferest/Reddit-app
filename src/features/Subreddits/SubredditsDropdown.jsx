import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectSubreddits } from '../../store/redditSlice';

function SubredditsDropdown() {
    const subreddits = useSelector(selectSubreddits);
    const dispatch = useDispatch();
    return (
        <div>
            <select onChange={(ev) => dispatch(fetchPosts(ev.target.value))}><option value="">Select</option>{subreddits.map(subreddit => (
                <option key = {subreddit.id} value = {subreddit.url}>{subreddit.name}</option>
              ))}
              </select>
        </div>
    )
}

export default SubredditsDropdown;