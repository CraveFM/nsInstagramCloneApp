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

```typescript
    saveValue(value: any, name: string): boolean {
        appSettings.setString(name, JSON.stringify(value));
        return true;
    }

    getValue(value: string): any {
        const valueToReturn = appSettings.getString(value);
        return valueToReturn ? JSON.parse(valueToReturn) : null;
    }

    removeValue(value: string): void {
        appSettings.remove(value);
    }

    clear(): void {
        appSettings.clear();
    }
```

## :a: Home Component

:round_pushpin: in the HomeComponent `Class`

- [ ] Add the `log` instance variables that will be used later on


