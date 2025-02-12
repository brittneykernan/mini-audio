# Mini Audio App

### Tech 

- ⚡ [Expo](https://expo.dev) for mobile development
- ⚛️ [React Native](https://reactnative.dev) for building native apps using React
- 🔥 Type checking [TypeScript](https://www.typescriptlang.org)
- 🎵 [React Native Track Player](https://rntp.dev/)
- 📋 [React Native Actions Sheet](https://rnas.vercel.app/)
- 📁 File-based routing with Expo Router
- 📏 Linter with [ESLint](https://eslint.org)
- 💖 Code Formatter with [Prettier](https://prettier.io)
- 🦊 Husky for Git Hooks
- 🚫 Lint-staged for running linters on Git staged files
- 🦺 Unit Testing with Jest and React Testing Library
- 💡 Absolute Imports using `@` prefix

### Requirements

- Node.js v16.20.2+ and npm
- [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Android Studio Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)

### Running Locally

Run the following command on your local environment:

```shell
git clone git@github.com:brittneykernan/mini-audio.git
cd mini-audio
npm install
```

Run the builds to use the app in simulator
```shell
npm run ios
# Or
npm run android
```

#### Troubleshooting Android

If Android throws an error: 

> Existing package com.brittneykernan.miniplayer signatures do not match newer version; ignoring!

run `adb uninstall com.brittneykernan.miniplayer` and try `npm run android` again.

If you need to rebuild the cloud based builds for simulators

#### Building the app

If you install new packages, you may need to build the apps to install dependencies 

```shell
npm run build
# Or
npm run build:ios
# Or
npm run build:android
```

#### Local development server

To run locally in development mode with live reload:

```shell
npm run dev:ios
# Or
npm run dev:android
```

Then follow prompts, typing `i` or `a` to open in iOS or Android, or `r` to hot reload. 

The above will open the app in the iOS simulator or Android emulator.

### Key decisions and challenges faced
* Expo for rapid development
* RN boilerplate for speed and to use my favorite tools for DX: Typescript, Jest, Husky, etc. 
* Refactored code and audio from RNTP article below for speed.
* There were no official docs for RNTP and Expo, so I used ChatGPT and Reddit for recos. 
* I ended up using EAS to build the app, that worked with RNTP and Expo, but required a bit of config.
* Finding a good ActionSheet library was a challenge. RNAS is lacking an initialize callback. 
* Major TODO in the app is to remove instances of audio during hot reload. I faced this on a RN tvOS project for MSNBC Peacock, but forgot the solve.  


### Testing

#### Manual 
1. Select a song to play from playlist. Do you hear it? Does the play icon in the drawer change from pause to play?
2. Pull open the drawer. Do you see the full controls?
3. Can you scrub through the song?
4. Can you close the drawer and still hear music play?
5. Can you infinitely loop forwards and back through the playlist?
6. Can you scroll the playlist to see all songs?

#### Automated

Typescript and eslint runs on commit with Husky.

Currently, the following automated testing commands need further fixing...

##### Linting
```shell
npm run lint
# And
npm run format 
```

##### Unit - currently no tests
```shell
npm run test
```

##### E2E - currently not configured
```shell
npm run e2e:prepare
# And
npm run e2e:ios
# Or
npm run e2e:android 
```

### Credits

* [React Native Expo Boilerplate](https://github.com/ixartz/React-Native-Boilerplate)
* [Implementing react-native-track-player with Expo, including lock screen, including audio
](https://medium.com/@gionata.brunel/implementing-react-native-track-player-with-expo-including-lock-screen-part-1-ios-9552fea5178c)
* [Artwork](https://unsplash.com/@brittneykernan/likes)
* Music, [Delo](https://pixabay.com/users/delosound-46524562/), [Fass](https://pixabay.com/users/fassounds-3433550/) 