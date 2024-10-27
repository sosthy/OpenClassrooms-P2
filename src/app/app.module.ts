import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgIconsModule } from '@ng-icons/core';
import { remixMedalLine } from '@ng-icons/remixicon';
import { DetailComponent } from './pages/detail/detail.component';
import { HeaderItemComponent } from './components/header-item/header-item.component';
import { HeaderComponent } from './components/header/header.component';
import { ChartWrapperComponent } from './components/chart-wrapper/chart-wrapper.component';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    DetailComponent, 
    HeaderComponent, 
    HeaderItemComponent, 
    NotFoundComponent,
    ChartWrapperComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    NgIconsModule.withIcons({ remixMedalLine })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
