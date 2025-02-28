import { createSlice, createSelector } from "@reduxjs/toolkit";
import {
  getSubredditPosts,
  getPostComments,
  getBakingPosts,
} from "../api/reddit";

const initialState = {
  posts: [],
  subreddits: [],
  error: false,
  isLoading: false,
  searchTerm: "",
  selectedSubreddit: "",
};

const redditSlice = createSlice({
  name: "redditPosts",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    startGetPosts(state) {
      state.isLoading = true;
      state.error = false;
    },
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },
    getPostsFailed(state) {
      state.isLoading = false;
      state.error = true;
    },
    setSubreddits(state, action) {
      state.subreddits = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit(state, action) {
      state.selectedSubreddit = action.payload;
      state.searchTerm = "";
    },
    // startGetComments(state, action) {
    //   state.posts[action.payload].loadingComments = true;
    //   state.posts[action.payload].error = false;
    // },
    // getCommentsSuccess(state, action) {
    //   state.posts[action.payload.index].loadingComments = false;
    //   state.posts[action.payload.index].comments = action.payload.comments;
    // },
    // getCommentsFailed(state, action) {
    //   state.posts[action.payload].loadingComments = false;
    //   state.posts[action.payload].error = true;
    // },
  },
});

export const {
  setPosts,
  getPostsFailed,
  getPostsSuccess,
  startGetPosts,
  setSearchTerm,
  setSelectedSubreddit,
  setSubreddits,
  //   getCommentsFailed,
  //   getCommentsSuccess,
  //   startGetComments,
} = redditSlice.actions;

export default redditSlice.reducer;

export const fetchPosts = (subreddit) => async (dispatch) => {
  try {
    dispatch(startGetPosts());
    let posts;
    let subreddits;
    if (subreddit) {
      posts = await getSubredditPosts(subreddit);
    } else {
      posts = await getBakingPosts();
      subreddits = posts.reduce((acc, post) => {
        if (!acc.some((sreddit) => sreddit.id === post.subreddit_id)) {
          acc.push({
            id: post.subreddit_id,
            name: post.subreddit,
            url: post.subreddit_name_prefixed,
          });
        }
        return acc;
      }, []);
      dispatch(setSubreddits(subreddits));
    }

    const postsWithMetadata = posts.map((post) => ({
      ...post,
      comments: [],
      loadingComments: false,
      errorComments: false,
    }));
    dispatch(getPostsSuccess(postsWithMetadata));
  } catch (error) {
    dispatch(getPostsFailed());
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
