# Gestures App

[<img src="https://github.com/angular/angular/blob/master/aio/src/assets/images/logos/angular/angular.png" width="31" height="31"></img>](https://play.nativescript.org/?template=play-ng&id=Wh9rvG&v=49) Adding Basic Gestures to Your Apps

[<img src="https://raw.githubusercontent.com/NativeScript/code-samples/master/screens/instaclone.gif" width="189" height="375"></img>](https://play.nativescript.org/?template=play-ng&id=QMY4lW&v=2)

Example taken from [:bookmark:`nativescript.rocks`](https://plugins.nativescript.rocks/samples) and can be used as a template since it has already been converted to [NativeScript 7](https://nativescript.org/blog/nativescript-7-announcement)

## :o: Create a project by using this template

```
$ ns create nsInstagramCloneApp --template https://github.com/CraveFM/nsInstagramCloneApp
```


## :m: From Scratch

* Create a blank NativeScript/Angular/sass project

```
$ ns create nsInstagramCloneApp --template @nativescript/template-blank-ng
```


## :b: Creating the services

##### :bangbang: Install Angular CLI

This project uses `Angular` and its `CLI`, if not already installed use the below command to do so:

```
$ npm install @angular/cli --global
```

##### :bangbang: Install [NS Schematics](https://github.com/CollegeBoreal/Tutoriels/blob/master/W.Web/T.NativeScript/Schematics.md) to generate the services

```
$ npm install @schematics/angular @nativescript/schematics tslint --save-dev
```

:pushpin: Create the services

- [ ] Generate the `Camera` service

```
% ng generate service core/camera --skipTests=true 
```


## :a: Home Component

:round_pushpin: in the HomeComponent `Class`

- [ ] Add the `log` instance variables that will be used later on
