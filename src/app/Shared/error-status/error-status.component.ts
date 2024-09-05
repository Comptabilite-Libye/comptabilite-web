// import { Component, OnInit } from '@angular/core'; 

// import { ActivatedRoute, Router } from '@angular/router';


// @Component({
//   selector: 'app-error-status',
//   templateUrl: './error-status.component.html',
//   styleUrls: ['./error-status.component.scss']
// })
// export class ErrorStatusComponent   {

//   errorStatus: any;

//   errorStatusList: any[] = [
//     { statusCode: 401, statusMsg: "Unauthorized", statusImg: "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" },
//     { statusCode: 400, statusMsg: "Bad Request", statusImg: "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" },
//     { statusCode: 404, statusMsg: "Page Not Found", statusImg: "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" },
//     { statusCode: 403, statusMsg: "Forbidden", statusImg: "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" },
//     { statusCode: 500, statusMsg: "Unexpected Error", statusImg: "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" },
//     { statusCode: 503, statusMsg: "Service Unavailable", statusImg: "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" }
//   ];

//   constructor(private route: ActivatedRoute) { }

//   ngOnInit(): void {
//     this.loadRelevantItems();
//   }

//   loadRelevantItems() {
//     this.route.queryParams.subscribe(params => {
//       const statusCode = Number(params['status']);  
//       if (!isNaN(statusCode)) {  
//         this.errorStatus = this.errorStatusList.filter(i => i.statusCode === statusCode);
//       } else { 
//         console.warn('Invalid status code:', params['status']);
//       }
//       console.log(this.errorStatus);
//     });
//   }

// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-error-status',
  templateUrl: './error-status.component.html',
  styleUrls: ['./error-status.component.scss']
})
export class ErrorStatusComponent implements OnInit {

  errorStatus: any;

  errorStatusList: any[] = [
    { statusCode: 401, statusMsg: "Unauthorized", statusImg: "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" },
    { statusCode: 400, statusMsg: "Bad Request", statusImg: "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" },
    { statusCode: 404, statusMsg: "Page Not Found", statusImg: "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" },
    { statusCode: 403, statusMsg: "Forbidden", statusImg: "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" },
    { statusCode: 500, statusMsg: "Unexpected Error", statusImg: "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" },
    { statusCode: 503, statusMsg: "Service Unavailable", statusImg: "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" }
  ];

  constructor(private routerQuery: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadRelevantItems();
  }

  loadRelevantItems() {
     this.routerQuery.queryParams.subscribe(params => {
      const statusCode = Number(params['status']);  
      if (!isNaN(statusCode)) {  
        this.errorStatus = this.errorStatusList.filter(i => i.statusCode === statusCode);
      } else { 
        console.warn('Invalid status code:', params['status']);
      }
      console.log(this.errorStatus);
    });
  }

}