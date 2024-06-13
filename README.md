# BMC-UI

BMC-UI is a web-based user interface for managing and configuring the BMC of a Turing Pi cluster.

## Technologies Used

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TanStack Router](https://tanstack.com/router) - Routing library for React applications
  - Handles route management and route protection
- [TanStack Query](https://tanstack.com/query) - Data fetching and caching library for React
- [Vite](https://vitejs.dev/) - Fast build tool and development server
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript

## Getting Started

1. Set up `bmcd-api-mock` for development:
   - Clone the [bmcd-api-mock](https://github.com/barrenechea/bmcd-api-mock) repository.
   - Follow the instructions in the `bmcd-api-mock` repository to set up and run the mock server.

2. Clone the repository:

   ```bash
   git clone https://github.com/turing-machines/BMC-UI.git
   ```

3. Install dependencies:

   ```bash
   cd BMC-UI
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173` to see the application running.

## Deployment

The deployment process for BMC-UI is automated using GitHub Actions. The version management is handled by the `version` field defined in the `package.json` file.

Whenever a pull request targeting the `main` branch is created and the `package.json` file is modified with an updated version, a new build is triggered automatically. Once the pull request is merged into the `main` branch, the version change will be detected, and the built files will be packaged into a tarball and released as an artifact on GitHub.

To deploy a new version:

1. Create a new branch and update the `version` field in the `package.json` file following semantic versioning (e.g., `2.1.0`, `2.1.1`, `3.0.0`).

2. Commit the changes and push the branch to the repository.

3. Open a pull request from the branch targeting the `main` branch.

4. Review and merge the pull request into the `main` branch.

5. GitHub Actions will automatically detect the version change, trigger a new build, and create a release with the tarball artifact.

6. The release artifact can be downloaded and deployed to the target environment.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

Please note that due to memory restrictions on the BMC, the final bundle size of the application cannot exceed 4MB. To ensure this limit is maintained, every pull request will report its bundle size, allowing us to track the bundle size over time. When contributing, please be mindful of the bundle size impact of your changes.

## License

This project is licensed under the [GNU General Public License v2.0](LICENSE).
