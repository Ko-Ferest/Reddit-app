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

export const getPostComments = async (permalink) => {
  const response = await fetch(`${baseUrl}${permalink}.json`);
  const json = await response.json();

  return json[1].data.children.map((subreddit) => subreddit.data);
};
