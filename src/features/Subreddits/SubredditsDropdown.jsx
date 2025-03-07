import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectSubreddits } from "../../store/redditSlice";
import "./SubredditsDropdown.css";

function SubredditsDropdown() {
  const subreddits = useSelector(selectSubreddits);
  const dispatch = useDispatch();
  return (
    <select
      className="subreddits-dropdown"
      onChange={(ev) => dispatch(fetchPosts(ev.target.value))}
    >
      <option value="">Select</option>
      {subreddits.map((subreddit) => (
        <option key={subreddit.id} value={subreddit.url}>
          {subreddit.name}
        </option>
      ))}
    </select>
  );
}

export default SubredditsDropdown;
