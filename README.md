## Live example

[TODO deployment]

## Instructions

To run in dev mode:

`yarn install`\
`yarn dev`

To run in production mode:

`yarn install`\
`yarn build`\
`yarn start`

Or, use NPM if you prefer :shrug:.

Full Create React App README is below the horizontal rule.

## Possible improvements

- Layout for small screens (mobile) + handle press events
- Persistent storage
- Pagination
- Form validation (add/edit contact)
- Could use a state management library such as Redux but not necessary for current level of complexity
- Could abstract the column field names into state and map over them everywhere:
```js
this.state = {
  fields: [
    { name: 'name', filter: '', sortDirection: 'ASC', sortPrecedence: 2, columnWidth: 3 },
    { name: 'address', filter: '', sortDirection: 'DESC', sortPrecedence: 1, columnWidth: 2 },
    { name: 'phone_number', filter: '', sortDirection: null, columnWidth: 5 },
  ]
}
```
etc. but it's completely unnecessary with only three fields. We're not writing a spreadsheet...

## Notes

- [Semantic UI React](https://react.semantic-ui.com) is used for the UI.

### Requirement

Your task is to build a single page application that will play the role of a phone book.

### Requirements

- Use this api to get the data you need: http://www.mocky.io/v2/581335f71000004204abaf83

- The app needs to allow the user to create, edit or delete a contact (in a stateless mode, not permanently)

- You need to display all the contacts and add basic filters for searching and sorting

Please describe in a readme file how to run your application.

We strongly recommend you use frameworks to solve the challenge if you added frameworks to your hackajob profile.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
