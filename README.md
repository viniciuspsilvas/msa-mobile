This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn ios`

### update all SS4U dependencies 

yarn add @bit/smart-solution-4u.mobile-components.form.forgot-password @bit/smart-solution-4u.mobile-components.form.login @bit/smart-solution-4u.mobile-components.form.logout @bit/smart-solution-4u.mobile-components.form.signup @bit/smart-solution-4u.mobile-components.layout.background @bit/smart-solution-4u.mobile-components.layout.container




# 1 - Rodar app
yarn ios or yarn android

# 2 - Run React Native Server para navegar no Storybook atraves dos browser 
yarn storybook 

# Ao utilizar Storybook rode esse comando para criar as stories
yarn prestorybook 

# or
node ./node_modules/.bin/rnstl --searchDir ./src ./packages --pattern **/*.stories.js --outputFile ./storybook/storyLoader.js



# How to clear the React Native packager
When you’re unable to load a bundle, look at the packager logs or the error message displayed in the Expo client to see if it’s related to the packager. If so, you should try clearing the packager’s state to reduce the chance the bug is related to a stale cache or corrupt process.

These instructions are for macOS and Linux, but the general ideas apply to Windows as well.

Stop XDE/exp, which should also stop the packager. Check your list of running processes to ensure these processes are not running.

Delete node_modules in your project

If your project depends on other local projects (e.g. has a file: URI in its dependencies), clear those local project’s node_modules directories too for good measure even though it’s probably unnecessary.

# Clear your Yarn or npm cache, depending on which you’re using, with yarn cache clean or npm cache clean
yarn cache clean

# Run yarn or npm i to install your dependencies again
yarn or npm i

# Run watchman watch-del-all to clear Watchman’s state
watchman watch-del-all

Kill the watchman daemon process

# Delete the packager’s cache directory with rm -fr $TMPDIR/metro*
rm -fr $TMPDIR/metro*

# Start XDE or exp With exp, run exp r -c for good measure
exp r -c 

# And just to be sure, force quit the Expo client on your phone or simulator and re-open it.

yarn cache clean  && rm -fr node_modules && rm -fr $TMPDIR/metro* && watchman watch-del-all && yarn && yarn ios

exp r -c


# upload your iOS app to TestFlight

expo upload:ios --apple-id viniciuspsilvas@gmail.com --apple-id-password ****** --app-name 'Mindroom Student APP'