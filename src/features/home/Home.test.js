import { act, screen, waitFor } from "@testing-library/react";
import Home from "./Home";
import { renderWithProviders } from "../../utils/testUtils";
import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";

export const handlers = [
  http.get("https://www.reddit.com/search.json", async () => {
    //await delay(100);
    console.log("intercepted");
    return HttpResponse.json({
      data: {
        data: {},
        children: [
          {
            data: {
              id: "01",
              title: "Post title",
              url_overridden_by_dest: null,
              subreddit_id: "01",
              subreddit: "Baking",
              subreddit_name_prefixed: "r/Baking",
            },
          },
        ],
      },
    });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Test sad path in future.
// test("renders Try again button if error fetching posts", async () => {
//   renderWithProviders(<Home />);
//   await waitFor(() => {
//     const button = screen.getByText(/Try again/i);
//     expect(button).toBeInTheDocument();
//   });
// });

test("renders posts when provided", async () => {
  renderWithProviders(<Home />);
  await waitFor(() => {
    const postTitle = screen.getByText(/Post title/i);
    expect(postTitle).toBeInTheDocument();
  });
});

// Test fetching and displaying subreddit.

// Test fetching and displaying a single post.

// Test filtering posts functionality.
