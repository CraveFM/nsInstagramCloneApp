import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { PhotosService } from "./core/photos.service";
import { CameraService } from "./core/camera.service";
import { LocalStorageService } from "./core/local-storage.service";
import { FileReaderService } from "./core/file-reader.service";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        PhotosService,
        CameraService,
        LocalStorageService,
        FileReaderService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
