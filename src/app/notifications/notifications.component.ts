import { Component, OnInit } from '@angular/core';
import { Page } from "@nativescript/core";
import { FileReaderService } from "../core/file-reader.service";

@Component({
  selector: 'ns-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

    // github repo link - https://github.com/kumarandena/nativescript-instagram-clone
    instagram: any[];
    isSelected: string;
    selectedRoute: string;

    constructor(
        private fileReader: FileReaderService
        , private page: Page
      ) { }
  

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.selectedRoute = 'notifications';
        this.instagram = [];
        this.isSelected = '5';
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
