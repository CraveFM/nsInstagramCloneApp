import { Component, OnInit } from '@angular/core';
import { Screen } from "@nativescript/core";
import { FileReaderService } from '../core/file-reader.service';
import { PhotosService } from '../core/photos.service';

@Component({
  selector: 'ns-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  instagram: any[];
  isSelected: string;
  selectedRoute: string;
  photoWidth: number;
  photoHeight: number;

  constructor(
    private fileReader: FileReaderService
    ) { }

  ngOnInit(): void {
    this.selectedRoute = 'search';
    this.photoWidth = Screen.mainScreen.widthDIPs * 0.33333;
    this.photoHeight = this.photoWidth;
    this.instagram = [];
    this.isSelected = '0';
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
