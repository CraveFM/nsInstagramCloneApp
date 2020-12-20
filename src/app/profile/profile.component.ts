import { Component, OnInit } from '@angular/core';
import { Page, Screen } from "@nativescript/core";
import { FileReaderService } from "../core/file-reader.service";
import { PhotosService } from '../core/photos.service';

@Component({
  selector: 'ns-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    // github repo link - https://github.com/kumarandena/nativescript-instagram-clone
    instagram: any[];
    isSelected: string;
    selectedRoute: string;
    photos: string[];
    photoWidth: number;
    photoHeight: number;  

    constructor(
          private fileReader: FileReaderService
        , private photosService: PhotosService
        , private page: Page
        ) { }
  

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.selectedRoute = 'profile';
        this.photoWidth = Screen.mainScreen.widthDIPs * 0.33333;
        this.photoHeight = this.photoWidth;    
        this.instagram = [];
        this.isSelected = '4';
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

}
