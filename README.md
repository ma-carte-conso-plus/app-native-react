[![Build Status](https://travis-ci.org/ma-carte-conso-plus/app-native-react.svg?branch=master)](https://travis-ci.org/ma-carte-conso-plus/app-native-react)

# Carte Conso Plus

Application Native React and Native Web de la carte conso+ NC

# Prerequisites

## To Debug Test and Build for Android Without CRNA | Expo :
  - Android SDK tools
  - SDK build-tools 25

## To Debug Test and Build for IOS Without CRNA | Expo :
  - TODO

## Set these sysctl variables to ( Mandatory ):
```
fs.inotify.max_user_instances = 4096
fs.inotify.max_user_watches = 262144
fs.inotify.max_queued_events = 524288
```

# Debug | Test | Build

## Installation in development environment ( Mandatory )
```
$ yarn
```
## Start with Metro & builded debug Native version of Mobile App
```
$ yarn { start | android | ios }
```
## Build Native release android apk
( Make sure you have got ccp.keystore and correct passwords set in android/gradle.properties )
```
$ yarn android:release
```
-> Generated apk can be found in android/app/build/outputs/app-release.apk
## Test Native release apk
```
$ yarn android --variant=release
```
## Start for Web in development environment
```
$ yarn web:start
```
## Start Expo in development environment
```
$ yarn crna:start
```
## Start Expo & Virtual Device in development environment
```
$ yarn { crna:android | crna:ios }
```
