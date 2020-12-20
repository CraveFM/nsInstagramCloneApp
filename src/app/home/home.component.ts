import { ChangeDetectorRef, Component, OnInit, ViewContainerRef } from "@angular/core";
import { ModalDialogService, ModalDialogOptions } from "@nativescript/angular";
import { Page, Screen } from "@nativescript/core";
import { CameraService } from "../core/camera.service";
import { FileReaderService } from "../core/file-reader.service";
import { PhotosService } from "../core/photos.service";


@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

    // github repo link - https://github.com/kumarandena/nativescript-instagram-clone
    photoWidth: number;
    photoHeight: number;
    photos: string[];
    instagram: any[];
    isSelected: string;
    selectedRoute: string;

    constructor(
        private photosService: PhotosService
      , private camera: CameraService
      , private fileReader: FileReaderService
      , private modal: ModalDialogService
      , private vref: ViewContainerRef
      , private cd: ChangeDetectorRef
      , private page: Page
      ) { }
  

    ngOnInit(): void {
        this.selectedRoute = 'home';
        this.photoWidth = Screen.mainScreen.widthDIPs * 0.33333;
        this.photoHeight = this.photoWidth;
        this.photos = [];
        this.instagram = [];
        this.isSelected = '0';
        this.photos = this.photosService.getPhotos();
        this.fileReader.readJSON('/images/instagram.json').then(
            res => {
                this.instagram = res["instagram"];
            },
            err => {
                console.log('Error reading json: ' + JSON.stringify(err));
            }
        )
    }

    onNavtap(route: string, selectedTab: string) {
        this.isSelected = selectedTab;
        this.selectedRoute = route;
        this.cd.detectChanges();
    }

    takePhoto() {
        this.camera.takePhoto()
            .then(imageAsset => {
                this.onNavtap('loading', '');
                const options: ModalDialogOptions = {
                    context: imageAsset,
                    viewContainerRef: this.vref,
                    fullscreen: true
                };
                // setTimeout(() => { //https://github.com/NativeScript/NativeScript/issues/5744#issuecomment-384589739
                //     this.modal.showModal(FilterComponent, options).then((response) => {
                //         if (response == 'success') {
                //             this.onNavtap('profile', '4');
                //         }
                //         else {
                //             this.onNavtap('home', '0');
                //         }
                //     }, error => {
                //         console.log(error);
                //     });
                // }, 1000);
            }).catch(err => {
                console.log(err.message);
            });
    }

}
