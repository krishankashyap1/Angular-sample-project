import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthCookie } from 'src/app/services/auth-cookies-handler';
import { Constants } from 'src/app/shared/common/constant';
import { ApiService } from 'src/app/shared/services/api-service.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, AfterContentChecked, OnDestroy {
  sub: any;
  id: number;
  staticConst = Constants;
  blogDetail: any;
  commentDetail: any = [];
  fieldHide: boolean = true;
  commentForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authCookies: AuthCookie,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.getPostDetail();
    this.getCommentForm();

  }

  ngAfterContentChecked() {
    this.checkAuthentication();
  }

  getCommentForm() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
      name: [''],
      email: [''],
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.commentForm.controls; }

  /**
   * @description:
   * @author:
   */
  checkAuthentication() {
    this.fieldHide = true;
    this.f.name.setValidators(null);
    this.f.email.clearValidators();
    if (!this.authCookies.getAuth()) {
      this.fieldHide = false;
      this.f.name.setValidators([Validators.required]);
      this.f.email.setValidators([Validators.required, Validators.email]);
    }
    this.commentForm.updateValueAndValidity();
    console.log(this.fieldHide)
  }

  /**
   * @description:
   * @author:
   */
  getPostDetail() {
    forkJoin(
      [this.apiService.get(this.staticConst.APIS.listPost + `/${this.id}`)
        .pipe(map((res) => res), catchError(e => of('Oops!'))),
      this.apiService.get(this.staticConst.APIS.listPost + `/${this.id}/comments`)
        .pipe(map((res) => res), catchError(e => of('Oops!'))),]
    )
      .subscribe(res => this.handleResponse(res))
  }

  /**
   * @description:
   * @author:
   */
  handleResponse(res) {
    console.log(res)
    if (res[0]['code'] == 200) {
      this.blogDetail = res[0]['data'];
    }
    if (res[1]['code'] == 200) {
      this.commentDetail = res[1]['data'];
    }
  }

  /**
   * @description:
   * @author:
   */
  addComment() {
    this.submitted = true
    if (this.commentForm.status == "INVALID") {
      return;
    }
    this.submitted = false
    let userData = {}
    if (this.authCookies.getAuth()) {
      userData = JSON.parse(this.authCookies.getAuth());
    } else {
      let nameValue = this.f.name.value;
      let emailValue = this.f.email.value;
      userData = { name: nameValue, email: emailValue }
      this.authCookies.setAuth(nameValue, emailValue)
    }
    this.sendComment(userData);
  }

  /**
   * @description:
   * @author:
   */
  sendComment(userData) {
    let data = {}
    data = { ...userData };
    data['body'] = this.f.comment.value;
    this.apiService.post(this.staticConst.APIS.listPost + `/${this.id}/comments`, data).subscribe(
      (data) => {
        if (data['code'] == 201) {
          this.getPostDetail();
          this.checkAuthentication();
          this.commentForm.reset();
        }
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
