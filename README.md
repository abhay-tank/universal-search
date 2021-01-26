# Universal Searchbar

## Universal Searchbar is a independent component which performs search on datalist provided.

`Required props`

```js
let arrayOfObjects = [
  {
    name: "Jon",
    email: "jon@mail.com"
    ...
  },
  {
    name: "Doe",
    email: "doe@mail.com"
    ...
  }
  ...
];

let searchKeys = ["name", "email"];

const fetchResult = (result) => {
  console.log(result)
}
```

`Include Searchbar component`

```JSX
<Searchbar
	dataList={arrayOfObjects}
	searchKeys={searchKeys}
	resultCallback={fetchResult}
	caseSensitive={false}
	resultOnSubmit={true}
	className="searchInput"
	alignIcon="right"
	autoFocus={true}
	placeholder="Search Name"
  icon={<FontAwesomeIcon icon={faSearch} />}
/>
```

# Props

- ### _REQUIRED_ **dataList** - Array of objects on which search is to be performed.
- ### _REQUIRED_ **searchKeys** - Array of object Keys on which search would be performed.
- ### _REQUIRED_ **resultCallback** - Function to handle result upon search completion.
- ### **caseSensitive** - Should search be caseSesnsitive. Default `false`.
- ### **resultOnSubmit** - If true result would be generated onSubmit else onChange. Default `false`.
- ### **className** - SCSS className. Default `""`.
- ### **alignIcon** - Align search icon to left or right. Default `"right"`.

- ### **autoFocus** - Input autofocus. Default `false`.
- ### **placeholder** - Input placeholder. Default `""`.
- ### **icon** - FontAwesome icon that should be displayed along side input field.

# Run project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
