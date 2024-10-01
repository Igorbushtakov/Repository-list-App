# GitHub Repositories Viewer

This project is a single-page application (SPA) designed as a test assignment. It displays a list of public repositories from GitHub using their public API. The app is built with Vue.js and includes infinite scrolling to load more repositories as the user scrolls down the page.


## Features

- Display public repositories from GitHub.
- Infinite scrolling to load more repositories as you reach the bottom of the list.
- Debounced scroll event handling to optimize performance.
- Automatic retry of failed API requests after 300 milliseconds.
- Responsive and clean UI.

## Technologies

- **Vue.js 3**: For building the user interface.
- **Vite**: For fast development and bundling.
- **GitHub API**: For fetching repository data.
- **Axios**: For handling HTTP requests.
- **Jest**: For unit testing.

## Requirements

- **Node.js**: Version 14.x or higher.
- **npm**: Node.js package manager.

## Setup Instructions

To set up and run this project locally, follow the steps below:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/github-repositories-viewer.git
   cd github-repositories-viewer
   npm install
   npm run dev
   
## You can find additional information in Notes.md file
