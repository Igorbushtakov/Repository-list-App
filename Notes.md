# Project Notes

## 1. Project Stack

The project was built using the modern Vue.js stack:

- **Vite** for fast builds and optimized development experience
- **Vue 3.4** leveraging the **Composition API** for better modularity and code reusability
- **Vue Router** was not used as the task description did not require routing functionality.

## 2. HTTP Client

- **Axios** was used as the HTTP client to interact with external APIs and manage requests.

## 3. GitHub API

- The project utilizes the GitHub API for fetching repository data. Specifically, the following endpoint was used:
    - [List Organization Repositories](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-organization-repositories)
- API endpoint stored in the environment variable as a separately secured way.

## 4. Testing

- **vue test utils** and **vitest** were used for minimal test coverage, in alignment with the assignment requirements.
- Tests primarily cover essential components and functionality.

## 5. Custom Directive: v-long-click

- A custom directive called **v-long-click** was implemented to simulate a "long click" interaction. This directive:
    - Listen for **pointer event** and sets a timer when the mouse button is pressed for **1 second**.
    - Executes a callback function passed into the directive once the time threshold is met.
    - This functionality provides a clear and reusable solution for handling long-press interactions.

## 6. Custom Dialog Component

- A custom dialog window was implemented, though it contains minimal logic.
- The dialog displays data passed from the parent component via **slots**, ensuring flexibility in how the content is
  structured.

## 7. Bonus Feature Clarification

- The bonus requirement was a little bit unclear for me. However, if it refers to **preserving dynamic data after a page
  reload**,
  this could be handled in several ways:
    - One approach would be to create a `localStorageService` that saves data in **localStorage**, making it accessible
      after reloads.
    - Alternatively, **Pinia** (the state management library) can be used alongside the `persisted-state` plugin to
      automatically retain state data across reloads.

## 8. Potential Improvements

- An area for improvement is the **expansion of styles**, specifically:
    - Moving color values into **CSS variables** for better reuse and maintainability across the project.
    - This approach would allow for more consistent theming and easier style adjustments.


