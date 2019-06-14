import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LeftNavigationBarComponent } from './components/left-navigation-bar/left-navigation-bar.component';
import { FrontPageComponent } from './components/front-page/front-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LeftNavigationBarComponent,
    FrontPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
     // provider used to create fake backend
     fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
