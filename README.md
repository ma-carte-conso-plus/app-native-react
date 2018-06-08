[![Build Status](https://travis-ci.org/ma-carte-conso-plus/app-native-react.svg?branch=master)](https://travis-ci.org/ma-carte-conso-plus/app-native-react)

# app-native-react

Application Native React de la carte conso+ NC

Installation in development environment

$ yarn

Start with Metro & builded debug version of Mobile App
$ yarn { start | android | ios }

Build release android apk
( Make sure you have got ccp.keystore and correct passwords set in android/gradle.properties )
$ yarn android:release

-> Generated apk can be found in android/app/build/outputs/app-release.apk

Test release apk
$ yarn android --variant=release

Start for Web in development environment
$ yarn web:start

Start for CRNA & Expo in development environment
$ yarn crna:start

To use for Native & Virtual Device in development environment
$ yarn { crna:android | crna:ios }

In case of Watchman errors

$ watchman watch-del-all
$ watchman shutdown-server
