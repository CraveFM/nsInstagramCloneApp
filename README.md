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

## :gear: Install plugins

```
% ns plugin add @nativescript/camera
```


:pushpin: The `Camera` service

- [ ] Generate the `Camera` service

```
% ng generate service core/camera --skipTests=true 
```

- [ ] In the `camera.service.ts` add the instance variables that will be used later on

```typescript
    public saveToGallery: boolean = false;
    public keepAspectRatio: boolean = true;
    public width: number = 200;
    public height: number = 200;
```

```typescript
  constructor() { 
    requestPermissions();
  }
```

```typescript
  takePhoto() {

    let options = {
        width: this.width,
        height: this.height,
        keepAspectRatio: this.keepAspectRatio,
        saveToGallery: this.saveToGallery
    };

    return takePicture(options);

  }
```

```typescript
  onCheckForCamera() {
    let isCameraAvailable = isAvailable();
    console.log("Is camera hardware available: " + isCameraAvailable);
  }
```

:pushpin: The `FileReader` service

- [ ] Generate the `FileReader` service

```
% ng generate service core/fileReader --skipTests=true 
```

- [ ] In the `file-reader.service.ts` add the instance variables that will be used later on

```typescript
  documents = knownFolders.currentApp();
```

```typescript
  readJSON(path: string): Promise<Object> {
    let jsonFile = this.documents.getFile(path);
    return new Promise<Object>((resolve, reject) => {
        jsonFile.readText().then((content: string) => {
            let data = <Array<Object>>JSON.parse(content);
            resolve(data);
        })
            .catch((err) => {
                reject(err);
            });
    });
  }
```

:pushpin: The `LocalStorage` service

- [ ] Generate the `LocalStorage` service

```
$ ng generate service core/localStorage --skipTests=true 
```

- [ ] In the `local-storage.service.ts` add the `getter-setter` methods that will be used later on


```typescript
  saveValue(value: any, name: string): boolean {
    ApplicationSettings.setString(name, JSON.stringify(value));
    return true;
  }

  getValue(value: string): any {
      const valueToReturn = ApplicationSettings.getString(value);
      return valueToReturn ? JSON.parse(valueToReturn) : null;
  }

  removeValue(value: string): void {
    ApplicationSettings.remove(value);
  }

  clear(): void {
    ApplicationSettings.clear();
  }
```

- [ ] Import the [application-settings module](https://docs.nativescript.org/ns-framework-modules/application-settings) from the `core` Library

```typescript
import { ApplicationSettings } from '@nativescript/core';
```

:pushpin: The `Photo` service

```
$ ng generate service core/photo --skipTests=true 
```

- [ ] In the `photo.service.ts` add the instance variables that will be used later on

```typescript

    private takenPhoto: ImageAsset;

    private photos: string[] = [
        'https://cdn1.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg',
        'https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg',
        'https://cdn.pixabay.com/photo/2018/09/22/17/05/ara-3695678__480.jpg',
        'https://cdn.pixabay.com/photo/2018/09/25/21/54/hedgehog-3703244__480.jpg',
        'https://cdn.pixabay.com/photo/2018/09/26/21/24/sweet-corn-3705687__480.jpg'
    ];

    private photoExamples: string[] = [
        'https://cdn.pixabay.com/photo/2018/12/29/23/49/rays-3902368__480.jpg',
        'https://cdn.pixabay.com/photo/2018/08/06/16/30/mushroom-3587888__480.jpg',
        'https://cdn.pixabay.com/photo/2018/12/28/01/34/rum-3898745__480.jpg',
        'https://cdn.pixabay.com/photo/2018/07/16/13/17/kiss-3541905__480.jpg',
        'https://cdn.pixabay.com/photo/2018/12/09/14/44/leaf-3865014__480.jpg',
        'https://cdn.pixabay.com/photo/2018/09/12/12/14/photographer-3672010__480.jpg',
        'https://cdn.pixabay.com/photo/2018/11/11/16/51/ibis-3809147_1280.jpg',
        'https://cdn.pixabay.com/photo/2018/11/29/21/19/hamburg-3846525_1280.jpg',
        'https://cdn.pixabay.com/photo/2018/11/04/20/21/harley-davidson-3794909__480.jpg',
        'https://cdn.pixabay.com/photo/2018/11/23/14/19/forest-3833973__480.jpg',
        'https://cdn.pixabay.com/photo/2018/11/17/22/15/tree-3822149__480.jpg',
        'https://cdn.pixabay.com/photo/2018/11/06/14/01/pair-3798371__480.jpg',
        'https://cdn.pixabay.com/photo/2018/11/15/22/52/wolf-3818343__480.jpg',
        'https://cdn.pixabay.com/photo/2018/10/31/22/42/surprised-3786845__480.jpg',
        'https://cdn.pixabay.com/photo/2018/05/03/22/34/lion-3372720__480.jpg',
        'https://cdn.pixabay.com/photo/2018/10/05/22/53/sheep-3727049__480.jpg',
        'https://cdn.pixabay.com/photo/2018/04/04/10/11/portrait-3289372__480.jpg',
        '',
    ];
```

```typescript
  constructor(private localStorage: LocalStorageService) { }
```

```typescript
  getPhotos() {
    return this.photos;
  }

  addPhoto() {

      const photoToAdd: string = this.photoExamples[Math.floor(Math.random() * (this.photoExamples.length - 1)) + 1];
      if (photoToAdd != '') {
          this.photos.unshift(photoToAdd);
          this.localStorageService.saveValue(JSON.stringify(this.photos), 'photos');
      }
  }

  getFromLocalStorage() {
      if (!this.localStorageService.getValue('photos')) {
          // console.log('FIRST TIME, SAVING VALUES');
          this.localStorageService.saveValue(JSON.stringify(this.photos), 'photos');
      } else {
          // console.log('NOT FIRST TIME, GETTING VALUES');
          this.photos = JSON.parse(this.localStorageService.getValue('photos'));
      }

  }
```

## :m: `app.module.ts` add the services to the provider field of the `@NgModule` Decorator


```typescript
import { PhotosService } from "./core/photos.service";
import { CameraService } from "./core/camera.service";
import { LocalStorageService } from "./core/local-storage.service";
import { FileReaderService } from "./core/file-reader.service";
```

```typescript
    providers: [
        PhotosService,
        CameraService,
        LocalStorageService,
        FileReaderService
    ],
```


## :a: Home Component

:round_pushpin: in the HomeComponent `Class`

- [ ] Add the `log` instance variables that will be used later on


