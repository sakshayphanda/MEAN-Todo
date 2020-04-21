import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.sass']
})
export class DynamicComponent implements OnInit {
  title = 'MeanProject';
  postArray: any;
  titleValue;
  contentValue;
  imagePreview: string | ArrayBuffer;
  imgFile: File;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.fetchingData();

  }

  fetchingData() {
    this.http.get(environment.baseApiUrl + 'post').subscribe(
      post => {
        this.postArray = post;
        console.log(post);
      }
    );
  }
  addingData() {
    const postData = new FormData();
    postData.append('title', this.titleValue);
    postData.append('content', this.contentValue);
    postData.append('image', this.imgFile);
    this.http.post(environment.baseApiUrl + 'post/create', postData).subscribe(
      post => {
        this.fetchingData();
        this.imageFile = null;
      }
    );
  }

  deletePost(post) {
    console.log([post]);
    this.http.delete(environment.baseApiUrl +  'post/delete/' + post['_id']).subscribe(
      response => {
        this.fetchingData();
      }
    );
  }

  imageFile(event: Event) {
    this.imgFile = (event.target as HTMLInputElement).files[0];

    console.log(this.imgFile);
    const reader = new FileReader();
    reader.onload = () => {
        this.imagePreview = reader.result;
      };
    reader.readAsDataURL(this.imgFile);
  }


}
