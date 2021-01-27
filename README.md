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

### `yarn deploy`

Builds the app and deploys it to github pages on `gh-pages` branch using gh-pages module.

# Preview

Website is deployed at [https://abhay-tank.github.io/universal-search/](https://abhay-tank.github.io/universal-search/)
