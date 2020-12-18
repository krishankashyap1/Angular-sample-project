import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthCookie } from './services/auth-cookies-handler';
import { JsonConverterComponent } from './pages/json-converter/json-converter.component';
import { PostComponent } from './pages/post/post.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { HeaderComponent } from './pages/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { JsonPrintPipe } from './shared/pipe/json-print.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwPaginationModule } from 'jw-angular-pagination';
import { HttpTokenInterceptor } from './shared/interceptors/http.token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    JsonConverterComponent,
    PostComponent,
    PostDetailComponent,
    HeaderComponent,
    HomeComponent,
    JsonPrintPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwPaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }, 
    AuthCookie
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
