const baseUrl = "https://www.reddit.com";

export const getBakingPosts = async () => {
  const response = await fetch(`${baseUrl}/search.json?q=baking`);
  const json = await response.json();

  return json.data.children.map((post) => post.data);
};

export const getSubredditPosts = async (subreddit) => {
  const response = await fetch(`${baseUrl}/${subreddit}.json`);
  const json = await response.json();

  return json.data.children.map((post) => post.data);
};

export const getPost = async (id) => {
  const response = await fetch(`${baseUrl}/${id}.json`);
  const json = await response.json();

  return json;
};
