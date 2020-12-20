import { Injectable } from '@angular/core';
import { isAvailable, requestPermissions, takePicture} from '@nativescript/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  public saveToGallery: boolean = false;
  public keepAspectRatio: boolean = true;
  public width: number = 200;
  public height: number = 200;

  constructor() { 
    requestPermissions();
  }

  takePhoto() {

    let options = {
        width: this.width,
        height: this.height,
        keepAspectRatio: this.keepAspectRatio,
        saveToGallery: this.saveToGallery
    };

    return takePicture(options);

  }

  onCheckForCamera() {
    let isCameraAvailable = isAvailable();
    console.log("Is camera hardware available: " + isCameraAvailable);
  }

}
