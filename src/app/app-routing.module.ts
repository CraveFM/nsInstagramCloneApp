import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule, NSEmptyOutletComponent } from "@nativescript/angular";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/(homeTab:home/default//searchTab:search/default//cameraTab:camera/default//notificationsTab:notifications/default//profileTab:profile/default)",
        pathMatch: "full"
    },
    {
        path: "home",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule),
        outlet: "homeTab"
    },
    {
        path: "search",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule),
        outlet: "searchTab"
    },
    {
        path: "camera",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/camera/camera.module").then((m) => m.CameraModule),
        outlet: "cameraTab"
    },
    {
        path: "profile",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/profile/profile.module").then((m) => m.ProfileModule),
        outlet: "profileTab"
    },
    {
        path: "notifications",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/notifications/notifications.module").then((m) => m.NotificationsModule),
        outlet: "notificationsTab"
    }

];


@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
