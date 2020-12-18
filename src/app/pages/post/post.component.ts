import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/shared/common/constant';
import { ApiService } from 'src/app/shared/services/api-service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public staticConst = Constants;
  items = [];
  pageOfItems: Array<any>;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  /**
   * @description:
   * @author:
   */
  getPosts() {
    this.apiService.get(this.staticConst.APIS.listPost).subscribe(
      (data) => {
        if (data['code'] == 200) {
          this.items = data['data'];
        }
      });
  }

  /**
   * @description:
   * @author:
   */
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

}
