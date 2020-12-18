import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JsonConverterComponent } from './pages/json-converter/json-converter.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { PostComponent } from './pages/post/post.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'json', component: JsonConverterComponent },
  { path: 'post', component: PostComponent },
  { path: 'post-detail/:id', component: PostDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
