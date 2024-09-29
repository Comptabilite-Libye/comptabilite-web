import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import {Chart} from 'chart.js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  public canvas : any;
  public ctx:any;
  public chartColor:any;
  public chartEmail:any;
  public chartHours:any;
  constructor(private userService: UserService,private authService: AuthService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if(sessionStorage.length==0){
      this.logout();
    }else{ 
    }
  }
TemplateDashbord(){
  this.chartColor = "#FFFFFF";

      this.canvas = document.getElementById("chartHours");
      this.ctx = this.canvas.getContext("2d");

      this.chartHours = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
          datasets: [{
              borderColor: "#6bd098",
              backgroundColor: "#6bd098",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354]
            },
            {
              borderColor: "#f17e5d",
              backgroundColor: "#f17e5d",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420]
            },
            {
              borderColor: "#fcc468",
              backgroundColor: "#fcc468",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
            }
          ]
        },
        // options: {
        //   legend: {
        //     display: false
        //   },

        //   tooltips: {
        //     enabled: false
        //   },

        //   // scales: {
        //   //   yAxes: [{

        //   //     ticks: {
        //   //       fontColor: "#9f9f9f",
        //   //       beginAtZero: false,
        //   //       maxTicksLimit: 5,
        //   //       //padding: 20
        //   //     },
        //   //     gridLines: {
        //   //       drawBorder: false,
        //   //       zeroLineColor: "#ccc",
        //   //       color: 'rgba(255,255,255,0.05)'
        //   //     }

        //   //   }],

        //   //   xAxes: [{
        //   //     barPercentage: 1.6,
        //   //     gridLines: {
        //   //       drawBorder: false,
        //   //       color: 'rgba(255,255,255,0.1)',
        //   //       zeroLineColor: "transparent",
        //   //       display: false,
        //   //     },
        //   //     ticks: {
        //   //       padding: 20,
        //   //       fontColor: "#9f9f9f"
        //   //     }
        //   //   }]
        //   // },
        // }
      });


      this.canvas = document.getElementById("chartEmail");
      this.ctx = this.canvas.getContext("2d");
      this.chartEmail = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: [1, 2, 3],
          datasets: [{
            label: "Emails",
            // pointRadius: 0,
            // pointHoverRadius: 0,
            backgroundColor: [
              '#e3e3e3',
              '#4acccd',
              '#fcc468',
              '#ef8157'
            ],
            borderWidth: 0,
            data: [342, 480, 530, 120]
          }]
        },

        options: {

          // legend: {
          //   display: false
          // },

          // pieceLabel: {
          //   render: 'percentage',
          //   fontColor: ['white'],
          //   precision: 2
          // },

          // tooltips: {
          //   enabled: false
          // },

          // scales: {
          //   yAxes: [{

          //     ticks: {
          //       display: false
          //     },
          //     gridLines: {
          //       drawBorder: false,
          //       zeroLineColor: "transparent",
          //       color: 'rgba(255,255,255,0.05)'
          //     }

          //   }],

          //   xAxes: [{
          //     barPercentage: 1.6,
          //     gridLines: {
          //       drawBorder: false,
          //       color: 'rgba(255,255,255,0.1)',
          //       zeroLineColor: "transparent"
          //     },
          //     ticks: {
          //       display: false,
          //     }
          //   }]
          // },
        }
      }
    );

      var speedCanvas = document.getElementById("speedChart");

      var dataFirst = {
        data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
        fill: false,
        borderColor: '#fbc658',
        backgroundColor: 'transparent',
        pointBorderColor: '#fbc658',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
      };

      var dataSecond = {
        data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
        fill: false,
        borderColor: '#51CACF',
        backgroundColor: 'transparent',
        pointBorderColor: '#51CACF',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      };

      var speedData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [dataFirst, dataSecond]
      };

      var chartOptions = {
        legend: {
          display: false,
          position: 'top'
        }
      }; 
    }
 

  isHovered11 = false;
  onHover11() {
    this.isHovered11 = true;
  }
  onLeave11() {
    this.isHovered11 = false;
  }
  GetNumber11(){
    console.log("Number11");
  }
  isHovered12 = false;
  onHover12() {
    this.isHovered12 = true;
  }
  onLeave12() {
    this.isHovered12 = false;
  }
  isHovered13 = false;
  onHover13() {
    this.isHovered13 = true;
  }
  onLeave13() {
    this.isHovered13 = false;
  }
  isHovered14 = false;
  onHover14() {
    this.isHovered14 = true;
  }
  onLeave14() {
    this.isHovered14 = false;
  }
    isHovered15 = false;
  onHover15() {
    this.isHovered15 = true;
  }
  onLeave15() {
    this.isHovered15 = false;
  }

  
  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.tokenStorageService.signOut();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
