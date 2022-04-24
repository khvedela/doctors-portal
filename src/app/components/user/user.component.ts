import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Subscription } from "rxjs";
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ProductService } from "../../services/product.service";
import {Product} from "../../services/Product";
import {AuthService} from "../../services/auth.service";
import { Chart, registerables } from 'chart.js';
import {CalendarOptions} from "@fullcalendar/angular";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit, AfterViewInit {
  subscription!: Subscription;
  productDialog!: boolean;
  products: Product[] = [{}]
  product!: Product;
  selectedProducts!: any;
  submitted!: boolean;
  statuses!: any[];
  testData: any;
  lineChartOne: any;
  lineChartTwo: any;
  radarChart: any;
  results: any;
  @ViewChild('lineChartOne') private lineChartOneRef!: ElementRef;
  @ViewChild('lineChartTwo') private lineChartTwoRef!: ElementRef;
  @ViewChild('radarChart') private radarChartRef!: ElementRef;
  @ViewChild('dt', { static: false }) dt: any;
  value: any = 40;

  constructor(private productService: ProductService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private auth: AuthService) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.pieChartBrowser();
  }

  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   dateClick: this.handleDateClick.bind(this), // bind is important!
  //   events: [
  //     { title: 'event 1', date: '2020-06-27' },
  //     { title: 'event 2', date: '2020-06-30' }
  //   ]
  // };
  // handleDateClick(arg: any) {
  //   alert('date click! ' + arg.dateStr)
  // }

  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth'
  // };

  pieChartBrowser(): void {
    setTimeout(() => {
      this.lineChartOne = new Chart(this.lineChartOneRef.nativeElement, {
        type: 'line',
        data: {
          labels: ['ოქტომბერი', 'ნოემბერი', 'დეკემბერი', 'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი'],
          datasets: [{
            label: 'სისხლის წნევა',
            data: this.testData[0].res1,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        }
      });

      this.lineChartTwo = new Chart(this.lineChartTwoRef.nativeElement, {
        type: 'line',
        data: {
          labels: ['ოქტომბერი', 'ნოემბერი', 'დეკემბერი', 'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი'],
          datasets: [{
            label: 'შაქრის დონე',
            data: this.testData[0].res2,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        }
      });

      this.radarChart = new Chart(this.radarChartRef.nativeElement, {
        type: 'radar',
        data: {
          labels: [
            'დეპრესია',
            'პოზიტივი',
            'შიზოფრენია',
            'პესიმიზმი',
            'სუიციდისკენ მიდრეკილება',
            'დათრგუნული',
            'იმედ გაცრუებული'
          ],
          datasets: [{
            label: 'My First Dataset',
            data: this.testData[0].res1,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
          }, {
            label: 'My Second Dataset',
            data: this.testData[0].res2,
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
          }]
        },
        options: {
          elements: {
            line: {
              borderWidth: 3
            }
          }
        },
      })
    }, 1500)
  }

  ngOnInit(): void {
    this.productService.getProducts().then(data => this.products = data);
    this.getData();
    this.getResults()

    setTimeout(() => {
      console.log(this.testData[0].res1);
    },1000)

    this.statuses = [
      {label: 'INSTOCK', value: 'instock'},
      {label: 'LOWSTOCK', value: 'lowstock'},
      {label: 'OUTOFSTOCK', value: 'outofstock'}
    ];
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.selectedProducts = null;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
    });
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  editProduct(product: any) {
    this.product = {...product};
    this.productDialog = true;
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => val.id !== product.id);
        this.product = {};
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    // @ts-ignore
    if (this.product.name.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
      }
      else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getData() {
    this.testData = this.auth.getData('testResults');
  }

  getResults() {
    this.results = this.auth.getData('researches');
    setTimeout(() => {
      console.log(this.getDateOfResearch(this.results, 1));
    }, 1000);
  }

  getDateOfResearch(data: any, step: number) {
    return Object.keys(data[0])[step];
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'საერთო სისხლის ანალიზი', date: '2022-04-23' },
      { title: 'ფსიქოლოგთან ვიზიტი', date: '2022-04-27' }
    ]
  };
  handleDateClick(arg: any) {
    if(arg.dateStr == '2022-04-23' || arg.dateStr == '2022-04-27') alert('თავისუფალი დრო')
  }

}
