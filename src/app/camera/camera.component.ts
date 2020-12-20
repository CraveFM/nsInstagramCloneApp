import { ChangeDetectorRef, Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogOptions, ModalDialogService } from '@nativescript/angular';
import { requestPermissions } from '@nativescript/camera';
import { Page, ImageAsset } from '@nativescript/core';
import { CameraService } from '../core/camera.service';

@Component({
  selector: 'ns-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  isSelected: string;
  selectedRoute: string;

  public saveToGallery: boolean = true;
  public cameraImage: ImageAsset;

  constructor( 
      private camera: CameraService
    , private modal: ModalDialogService
    , private vref: ViewContainerRef
    , private cd: ChangeDetectorRef
    , private page: Page
  ) { }

  ngOnInit(): void {
    this.selectedRoute = 'camera';
    this.isSelected = '0';
    requestPermissions;
    this.takePhoto();
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
