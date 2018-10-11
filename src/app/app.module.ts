import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ClassPanelComponent } from './class-panel/class-panel.component';
import { RaidCompComponent } from './raid-comp/raid-comp.component';
import { IndicatorsPanelComponent } from './indicators-panel/indicators-panel.component';
import { SpotComponent } from './spot/spot.component';
import { GroupComponent } from './group/group.component';


@NgModule({
  declarations: [
    AppComponent,
    ClassPanelComponent,
    RaidCompComponent,
    IndicatorsPanelComponent,
    SpotComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
