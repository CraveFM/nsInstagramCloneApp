# Instagram Clone App

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

- [ ] Add the instance variables that will be used later on

```typescript
    // github repo link - https://github.com/kumarandena/nativescript-instagram-clone
    photoWidth: number;
    photoHeight: number;
    photos: string[];
    instagram: any[];
    isSelected: string;
    selectedRoute: string;
```

- [ ] Edit the constructor

```typescript
    constructor(
        private photosService: PhotosService
      , private camera: CameraService
      , private fileReader: FileReaderService
      , private modal: ModalDialogService
      , private vref: ViewContainerRef
      , private cd: ChangeDetectorRef
      , private page: Page
      ) { }
```

- [ ] Edit the `ngOnInit` method

```typescript
    ngOnInit(): void {
        this.selectedRoute = 'home';
        this.photoWidth = Screen.mainScreen.widthDIPs * 0.33333;
        this.photoHeight = this.photoWidth;
        this.photos = [];
        this.instagram = [];
        this.isSelected = '0';
        this.photos = this.photosService.getPhotos();
        this.fileReader.readJSON('/core/instagram.json').then(
            res => {
                this.instagram = res["instagram"];
            },
            err => {
                console.log('Error reading json: ' + JSON.stringify(err));
            }
        )
    }
```

- [ ] Add the `onNavtap` method


```typescript
    onNavtap(route: string, selectedTab: string) {
        this.isSelected = selectedTab;
        this.selectedRoute = route;
        this.cd.detectChanges();
    }
```

## :round_pushpin: template

```xml
<GridLayout rows="auto, * ,50" class="page">
    <GridLayout *ngIf="selectedRoute == 'home' || selectedRoute == 'profile' ? true : false"
        row="0" borderBottomWidth="0.5" borderBottomColor="#b2b2b2">
        <GridLayout *ngIf="selectedRoute == 'home' ? true : false" marginTop="5"
            marginBottom="5" columns="10, auto, auto, *, auto, auto, 10">
            <Label col="1" text="&#xf030;" class="fa android-lbl" marginright="8"
                verticalalignment="center" fontsize="25"></Label>
            <Image col="2" height="40" src="~/assets/title.png" stretch="aspectFill"></Image>
            <Image col="4" width="30" height="30" src="~/assets/icon.png"
                stretch="aspectFill" marginright="15"></Image>
            <Label col="5" text="&#xf1d9;" class="fa android-lbl"
                verticalalignment="center" fontsize="25"></Label>
            <Label col="5" text="2" borderRadius="100%" width="20" height="20"
                style="background: white; border-width: 1; border-color: #2E93F0; color: #2E93F0; margin-left:15;"
                verticalAlignment="top" horizontalAlignment="right"
                textAlignment="center"></Label>
        </GridLayout>
        <GridLayout *ngIf="selectedRoute == 'profile' ? true : false"
            marginTop="5" marginBottom="5" columns="15, auto, auto, *, auto, auto, 10">
            <label col="1" text="woorkout.pt" verticalalignment="center"
                fontsize="20" class="android-lbl"></label>
            <Label col="2" text="&#xf0d7;" class="fa android-lbl" marginleft="8"
                verticalalignment="center" fontsize="20"></Label>

            <Label col="4" text="&#xf017;" class="fa android-lbl"
                verticalalignment="center" fontsize="25" marginright="15"></Label>
            <Label col="5" text="&#xf0ae;" class="fa android-lbl"
                verticalalignment="center" fontsize="20"></Label>
            <Label col="5" text="2" borderRadius="100%" width="20" height="20"
                style="background: #ff4b60; color: white; margin-left:15; margin-bottom: 20;"
                verticalAlignment="top" horizontalAlignment="right"
                textAlignment="center"></Label>
        </GridLayout>
    </GridLayout>

    <!-- home screen -->
    <ScrollView row="1" [visibility]="selectedRoute == 'home' ? 'visible' : 'collapse'">

        <StackLayout>

            <!-- header -->
            <StackLayout borderBottomWidth="0.5" borderBottomColor="gray">
                <ScrollView orientation="horizontal"
                    scrollBarIndicatorVisible="false">
                    <StackLayout orientation="horizontal">
                        <GridLayout *ngFor="let header of instagram.home.header"
                            height="90" rows="auto, auto" style="margin: 10;">
                            <Image row="0" [src]="header.imageSrc"
                                borderRadius="100%" verticalAlignment="center"
                                horizontalAlignment="center" stretch="aspectFill"
                                [ngClass]="{imgheaderown : header.isOwn, imgheader : !header.isOwn}"></Image>
                            <Label row="0" text="" borderRadius="100%" height="70"
                                width="70" [visibility]="!header.isOwn ? 'visible' : 'collapsed'"
                                style="border-width: 2; border-color: #ff4b60;"></Label>
                            <Label *ngIf="header.isOwn" row="0" borderRadius="100%"
                                width="30" height="30" text="&#xf055;"
                                fontSize="30" backgroundColor="white" color="#2E93F0"
                                class="fa" textAlignment="center"
                                verticalAlignment="bottom"
                                horizontalAlignment="center" marginLeft="70"></Label>
                            <Label row="1" [text]="header.title" color="black"
                                textAlignment="center" marginTop="3"></Label>
                        </GridLayout>
                    </StackLayout>
                </ScrollView>
            </StackLayout>

            <!-- body -->
            <GridLayout rows="30, 30, *, auto" columns="10, auto,10, *, auto"
                *ngFor="let item of instagram.home.body" marginTop="5">
                <Image row="0" rowSpan="2" col="1" [src]="item.imageSrc"
                    borderRadius="100%" height="40" width="40"
                    verticalAlignment="center" horizontalAlignment="center"
                    stretch="aspectFill"></Image>
                <Label row="0" rowSpan="2" col="1" text="" borderRadius="100%"
                    height="50" width="50" style="border-width: 2; border-color: #ff4b60;;"></Label>
                <Label row="0" col="3" [text]="item.name" verticalAlignment="bottom"
                    color="black"></Label>
                <Label row="1" col="3" [text]="item.location"
                    verticalAlignment="top" color="#4c4c4c"></Label>
                <Label row="0" rowSpan="2" col="4" text="&#xf142;" class="fa android-lbl"
                    fontSize="25" verticalAlignment="center" paddingright="25"
                    margintop="5"></Label>
                <Image marginTop="10" row="2" col="0" colSpan="5" [src]="item.post"
                    stretch="aspectFill"></Image>
                <GridLayout row="3" col="0" colSpan="5" rows="auto, auto, auto, auto, auto"
                    columns="auto, auto, auto, *, auto" margintop="5"
                    marginbottom="20">
                    <Label row="0" col="0" text="&#xf004;" class="fa android-lbl"
                        fontSize="25" verticalAlignment="center" padding="10"></Label>
                    <Label row="0" col="1" text="&#xf075;" class="fa android-lbl"
                        fontSize="25" verticalAlignment="center" padding="10"></Label>
                    <Label row="0" col="2" text="&#xf1d8;" class="fa android-lbl"
                        fontSize="25" verticalAlignment="center" padding="10"></Label>
                    <Label row="0" col="4" text="&#xf02e;" class="fa android-lbl"
                        fontSize="25" verticalAlignment="center" padding="10"></Label>
                    <Label row="1" col="0" colSpan="5" text="{{ item.likes }} Likes"
                        verticalAlignment="bottom" color="black" paddingleft="10"
                        fontSize="16"></Label>
                    <Label marginLeft="10" row="2" col="0" colSpan="5"
                        verticalAlignment="bottom" textWrap="true">
                        <FormattedString>
                            <Span [text]="item.desc.person" color="black"></Span>
                            <Span [text]="item.desc.content" color="#2E93F0"></Span>
                        </FormattedString>
                    </Label>
                    <Label row="3" col="0" colSpan="5" text="...more"
                        verticalAlignment="bottom" paddingleft="10" color="#4c4c4c"></Label>
                    <Label row="4" col="0" colSpan="5" [text]="item.time"
                        verticalAlignment="bottom" paddingleft="10" color="#4c4c4c"></Label>
                </GridLayout>
            </GridLayout>

        </StackLayout>
    </ScrollView>


    <!-- search screen -->
    <ScrollView row="1" [visibility]="selectedRoute == 'search' ? 'visible' : 'collapse'">

        <StackLayout>

            <GridLayout columns="auto, *, auto">
                <Label col="0" text="&#xf002;" class="fa" fontSize="25"
                    verticalAlignment="center" padding="10" color="black"></Label>
                <Label col="1" text="Search" fontSize="20" verticalAlignment="center"
                    padding="10"></Label>
                <Label col="2" text="&#xf16d;" class="fa" fontSize="25"
                    verticalAlignment="center" padding="10" color="black"></Label>
            </GridLayout>

            <ScrollView orientation="horizontal" scrollBarIndicatorVisible="false">
                <StackLayout orientation="horizontal">
                    <GridLayout *ngFor="let item of instagram.search.header"
                        height="90" rows="auto" style="margin: 5;">
                        <Image borderRadius="10%" row="0" [src]="item.imageSrc"
                            height="90" width="100" stretch="aspectFill"></Image>
                        <Image *ngIf="item.isOwn" borderRadius="100%" row="0"
                            src="~/assets/wk.png" height="40"
                            verticalAlignment="top" width="40" stretch="aspectFill"
                            marginTop="10"></Image>
                        <Label row="0" [text]="item.title" color="white"
                            fontSize="15" fontWeight="bold" verticalAlignment="bottom"
                            horizontalAlignment="center" marginBottom="10"
                            [ngClass]="{ shisown : item.isOwn }">
                        </Label>
                    </GridLayout>
                </StackLayout>
            </ScrollView>

            <GridLayout rows="auto, auto" columns="*, *, *" marginTop="5">
                <Image borderColor="white" borderWidth="1" row="0" col="0"
                    [src]="instagram.search.midSection.imgSrc" stretch="aspectFill"></Image>
                <Image borderColor="white" borderWidth="1" row="1" col="0"
                    [src]="instagram.search.midSection.imgSrc1" stretch="aspectFill"></Image>
                <Image borderColor="white" borderWidth="1" row="0" col="1"
                    rowSpan="2" colSpan="2" [src]="instagram.search.midSection.imgSrc2"
                    stretch="aspectFill"></Image>
            </GridLayout>

            <FlexboxLayout flexWrap="wrap" width="100%">
                <Image *ngFor="let item of instagram.search.body" borderColor="white"
                    borderWidth="1" [src]="item.imageSrc" [height]="photoHeight"
                    [width]="photoWidth" stretch="aspectFill"></Image>
            </FlexboxLayout>

        </StackLayout>
    </ScrollView>

    <!-- profile -->
    <ScrollView row="1" [visibility]="selectedRoute == 'profile' ? 'visible' : 'collapse'">

        <StackLayout>

            <GridLayout borderBottomWidth="0.5" borderBottomColor="gray" rows="auto, auto, auto, auto"
                columns="auto, 15, *, 15 *, 15, *" padding="10">
                <Image row="0" rowSpan="3" col="0" src="~/assets/wk.png"
                    height="100" width="100" borderRadius="100%"
                    verticalAlignment="center" horizontalAlignment="center"
                    stretch="aspectFill"></Image>
                <Label row="0" rowSpan="3" col="0" borderRadius="100%" width="30"
                    height="30" text="&#xf055;" fontSize="30" backgroundColor="white"
                    color="#2E93F0" class="fa" textAlignment="center"
                    verticalAlignment="bottom" horizontalAlignment="center"
                    marginLeft="70"></Label>

                <Label row="0" col="2" fontWeight="bold" horizontalAlignment="center"
                    verticalAlignment="bottom" [text]="photos.length" class="android-lbl"></Label>
                <Label row="0" col="4" fontWeight="bold" horizontalAlignment="center"
                    verticalAlignment="bottom" text="220" class="android-lbl"></Label>
                <Label row="0" col="6" fontWeight="bold" horizontalAlignment="center"
                    verticalAlignment="bottom" text="430" class="android-lbl"></Label>

                <Label row="1" col="2" horizontalAlignment="center"
                    verticalAlignment="top" color="gray" fontSize="14" text="posts"
                    textWrap="true"></Label>
                <Label row="1" col="4" horizontalAlignment="center"
                    verticalAlignment="top" fontSize="14" color="gray" text="followers"
                    textWrap="true"></Label>
                <Label row="1" col="6" horizontalAlignment="center"
                    verticalAlignment="top" fontSize="14" color="gray" text="following"
                    textWrap="true"></Label>

                <Label row="2" col="2" colSpan="5" class="android-lbl" text="Edit Profile"
                    borderWidth="0.5" borderColor="gray" borderRadius="5"
                    verticalAlignment="top" textAlignment="center" padding="5"></Label>

                <Label row="3" col="0" colSpan="7" text="Woorkout" fontWeight="bold"
                    textWrap="true" class="android-lbl" marginTop="20"
                    marginBottom="10" marginLeft="5"></Label>
            </GridLayout>

            <GridLayout height="40" columns="*,*,*">
                <Label text="&#xf00a;" fontSize="25" color="#2E93F0" col="0"
                    class="fa" textAlignment="center" verticalAlignment="center"
                    horizontalAlignment="center"></Label>
                <Label text="&#xf0c9;" fontSize="25" col="1" class="fa android-lbl"
                    textAlignment="center" verticalAlignment="center"
                    horizontalAlignment="center"></Label>
                <Label text="&#xf02c;" fontSize="25" col="2" class="fa android-lbl"
                    textAlignment="center" verticalAlignment="center"
                    horizontalAlignment="center"></Label>
            </GridLayout>

            <FlexboxLayout flexWrap="wrap" width="100%">
                <Image *ngFor="let photo of photos" borderColor="white"
                    borderWidth="1" [src]="photo" [height]="photoHeight"
                    [width]="photoWidth" stretch="aspectFill"></Image>
            </FlexboxLayout>

        </StackLayout>
    </ScrollView>

    <!-- notifications screen -->

    <GridLayout row="1" rows="auto, *" [visibility]="selectedRoute == 'notifications' ? 'visible' : 'collapse'">

        <GridLayout row="0" columns="*, *" marginTop="5">
            <Label col="0" text="FOLLOWING" fontSize="20" padding="5" color="#cccccc"
                textAlignment="center" style="border-bottom-width: 1; border-bottom-color: #cccccc;"></Label>
            <Label col="1" text="YOU" fontSize="20" padding="5" color="black"
                textAlignment="center" style="border-bottom-width: 1; border-bottom-color: black;"></Label>
        </GridLayout>
        <ScrollView row="1">
            <StackLayout>
                <GridLayout rows="auto, auto" columns="10, auto,10, *">
                    <Label row="0" col="1" rowSpan="2" text="&#xf2bd;" class="fa followreq-image"
                        verticalAlignment="top"></Label>
                    <Label row="0" col="1" rowSpan="2" text="2" borderRadius="100%"
                        width="20" style="background: #ff4b60; color: white; margin-top: 25;"
                        verticalAlignment="top" horizontalAlignment="right"
                        textAlignment="center"></Label>
                    <StackLayout row="0" rowSpan="2" col="3" marginTop="30">
                        <Label text="Follow Requests" fontSize="16"
                            fontweight="bold" color="black"></Label>
                        <Label text="Approve or ignore requests" fontSize="14"
                            color="#4c4c4c" marginTop="3"></Label>
                    </StackLayout>
                </GridLayout>

                <GridLayout rows="auto, auto" columns="10, *" *ngFor="let item of instagram.notifications">
                    <Label row="0" col="1" [text]="item.notify_time"
                        marginTop="20" marginBottom="20" color="#4c4c4c"></Label>

                    <StackLayout orientation="vertical" row="1" col="1">
                        <GridLayout columns="auto,10, *, auto, 10" *ngFor="let notify_list of item.notify_list"
                            orientation="vertical" marginBottom="20">
                            <Image [src]="notify_list.imageSrc" col="0"
                                borderRadius="100%" height="60" width="60"
                                verticalAlignment="center"
                                horizontalAlignment="center" stretch="aspectFill"></Image>
                            <StackLayout col="2" verticalAlignment="center">
                                <Label textWrap="true">
                                    <FormattedString>
                                        <Span [text]="notify_list.desc.name"
                                            fontWeight="bold" color="black"></Span>
                                        <Span [text]="notify_list.desc.content"
                                            color="black"></Span>
                                        <Span [text]="notify_list.desc.date"
                                            color="#4c4c4c"></Span>
                                    </FormattedString>
                                </Label>
                            </StackLayout>
                            <Image *ngIf="notify_list.imageSrc2" [src]="notify_list.imageSrc2"
                                col="3" borderRadius="5" height="60" width="60"
                                verticalAlignment="center"
                                horizontalAlignment="center" stretch="aspectFill"></Image>
                        </GridLayout>
                    </StackLayout>

                </GridLayout>
            </StackLayout>
        </ScrollView>
    </GridLayout>

    <GridLayout row="1" *ngIf="selectedRoute == 'loading' ? true : false"
        verticalAlignment="center">
        <ActivityIndicator busy="true" class="activity-indicator" color="black"></ActivityIndicator>
    </GridLayout>

    <GridLayout row="2" columns="*,*,*,*,*" borderTopWidth="0.5"
        borderTopColor="gray">
        <Label text="&#xf015;" col="0" class="fa android-lbl" fontSize="25"
            textAlignment="center" verticalAlignment="center" [ngClass]="{tabselected : isSelected == '0'? true : false, tabnotselected : isselected != '0'? false: true}"
            horizontalAlignment="center" (tap)="onNavtap('home', '0')"></Label>
        <Label text="&#xf002;" col="1" class="fa android-lbl" fontSize="25"
            textAlignment="center" verticalAlignment="center" [ngClass]="{tabselected : isSelected == '1'? true : false, tabnotselected : isselected != '1'? false: true}"
            horizontalAlignment="center" (tap)="onNavtap('search', '1')"></Label>
        <Label text="&#xf196;" (tap)="takePhoto()" col="2" class="fa android-lbl"
            fontSize="30" textAlignment="center" verticalAlignment="center"
            horizontalAlignment="center"></Label>
        <Label text="&#xf08a;" col="3" class="fa android-lbl" fontSize="25"
            textAlignment="center" [ngClass]="{tabselected : isSelected == '3'? true : false, tabnotselected : isselected != '3'? false: true}"
            verticalAlignment="center" horizontalAlignment="center" (tap)="onNavtap('notifications', '3')"></Label>
        <Label text="&#xf007;" col="4" class="fa android-lbl" fontSize="25"
            textAlignment="center" verticalAlignment="center" [ngClass]="{tabselected : isSelected == '4'? true : false, tabnotselected : isselected != '4'? false: true}"
            horizontalAlignment="center" (tap)="onNavtap('profile', '4')"></Label>
    </GridLayout>

</GridLayout>
```

# Resources

- [ ] Fonts

* copy `fonts` folder to the `src` directory

- [ ] Photos

* copy `images` folder to the `src` directory

- [ ] Edit `webpack.config.js` file

* locate the `copyTargets` variable and add the `from: 'images/**'` JSON section like below

```javascript
const copyTargets = [
    { from: 'assets/**', noErrorOnMissing: true, globOptions: { dot: false, ...copyIgnore } },
    { from: 'fonts/**', noErrorOnMissing: true, globOptions: { dot: false, ...copyIgnore } },
    { from: 'images/**', noErrorOnMissing: true, globOptions: { dot: false, ...copyIgnore } },
    ...copyReplacements
  ];
```
