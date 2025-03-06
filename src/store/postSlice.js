import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getPost } from "../api/reddit";

const initialState = {
  post: {},
  comments: [],
  error: false,
  isLoading: false,
};

const postSlice = createSlice({
  name: "redditPost",
  initialState,
  reducers: {
    startGetPost(state) {
      state.isLoading = true;
      state.error = false;
    },
    getPostSuccess(state, action) {
      state.isLoading = false;
      state.post = action.payload.post;
      state.comments = action.payload.comments;
    },
    getPostFailed(state) {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  getPostFailed,
  getPostSuccess,
  startGetPost,
  setSearchTerm,
  setSelectedSubreddit,
  setSubreddits,
} = postSlice.actions;

export default postSlice.reducer;

export const fetchPost = (id) => async (dispatch) => {
  try {
    dispatch(startGetPost());
    const response = await getPost(id);
    const post = response[0].data.children[0].data;
    const comments = response[1].data.children.map((comment) => comment.data);
    dispatch(getPostSuccess({ post, comments }));
  } catch (error) {
    dispatch(getPostFailed());
  }
};

// export const fetchComments = (index, permalink) => async (dispatch) => {
//   try {
//     dispatch(startGetComments(index));
//     const comments = await getPostComments(permalink);
//     dispatch(getCommentsSuccess({ index, comments }));
//   } catch (error) {
//     dispatch(getCommentsFailed(index));
//   }
// };

const selectPosts = (state) => state.reddit.posts;
const selectSearchTerm = (state) => state.reddit.searchTerm;
export const selectSelectedSubreddit = (state) =>
  state.reddit.selectedSubreddit;

export const selectFilteredPosts = createSelector(
  [selectPosts, selectSearchTerm],
  (posts, searchTerm) => {
    if (searchTerm !== "") {
      return posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return posts;
  }
);

export const selectSubreddits = (state) => state.reddit.subreddits;
