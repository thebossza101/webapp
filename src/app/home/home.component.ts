import {
  Component,
  OnInit
} from '@angular/core';

import { HttpserviceService } from '../shared/httpservice.service';
import { GoogleService } from '../shared/google.service';
import {NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
import {ConfirmOptions, Position} from 'angular2-bootstrap-confirm';
import {Positioning} from '@ng-bootstrap/ng-bootstrap/util/positioning';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[ConfirmOptions,
     // this is required so you can use the bundled position service rather than rely on the `@ng-bootstrap/ng-bootstrap` module
    {provide: Position, useClass: Positioning}]
})
export class HomeComponent implements OnInit {

   private _success = new Subject<string>();

  constructor(public httpserviceService: HttpserviceService,public googleService: GoogleService,private modalService:NgbModal, public activeModal: NgbActiveModal) {}
  items: any;
  PageNumber = 1;
  totalrows = 0;
  RowspPage = 10;
  searchbarinput: string = "";
  initializeData: any;
  initializetotalrows:any;
   closeResult: string;
   ngbalerttext: string;
   mode: string
  title: string
  EMPCODE: string
  EMPDESC: string
  CUSTCODE: string
  VENDCODE: string
  POSITION: string
  CTCADR1: string
  CTCADR2: string
  EMAIL: string
  GROUPID:string
  disabled_EMPCODE:boolean;
  ngOnInit() {
this._success.subscribe((message) => this.ngbalerttext = message);
   this.getonlinedata('', this.PageNumber, this.RowspPage).then((data) => {
     this.initializeData  = data['data'];
     this.initializetotalrows = data['totalrows'];
   });
  }
  buttonSearchclick() {
      let val = this.searchbarinput;
      this.PageNumber = 1;
        if (val && val.trim() != '') {
         this.getonlinedata(this.searchbarinput, this.PageNumber, this.RowspPage);

  }else {
  this.items = this.initializeData;
  this.totalrows = this.initializetotalrows;

  }

  }
  getonlinedata(EMPCODE, PageNumber, RowspPage) {
           let url = 'http://www.072serv.com/etracking/index.php/wepapp/test2';
            let data = {EMPCODE: EMPCODE, PageNumber: PageNumber, RowspPage: RowspPage};
          return  this.httpserviceService.post(url, data).then((data) => {
                // console.log(data);
                this.totalrows = data['totalrows'];
                this.items  = data['data'];
                return data;
            });
  }
  pageChange(val){
//console.log(val);
this.PageNumber = val;
this.getonlinedata(this.searchbarinput, val, this.RowspPage)

  }
  viewPDF(CTCADR2){


this.googleService.handleAuthClick(CTCADR2).then((res)=>{
  
  //console.log(res)
 //window.open(res[0]['webViewLink']);
window.open (res[0]['webViewLink'], "_blank","status=1,toolbar=1");
})


  }
  delclick(item){
      this.delete_EMPCODE(item.EMPCODE).then((res)=>{
    let val = this.searchbarinput;
        if (val && val.trim() != '') {

this.getonlinedata(this.searchbarinput, this.PageNumber, this.RowspPage)
this.getonlinedata('', this.PageNumber, this.RowspPage).then((data) => {
     this.initializeData  = data['data'];
     this.initializetotalrows = data['totalrows'];
   });
        }else{
this.getonlinedata('', this.PageNumber, this.RowspPage).then((data) => {
     this.initializeData  = data['data'];
     this.initializetotalrows = data['totalrows'];
   });
        }

      })


  }
    delete_EMPCODE(EMPCODE) {

    const endpoint = 'http://www.072serv.com/etracking/index.php/wepapp/delete_EMPCODE/';
    let data = { text: EMPCODE }
   return  this.httpserviceService.post(endpoint, data).then((data) => {
                // console.log(data);
                 return data;
            });

  }
  insert(EMPCODE, EMPDESC, CUSTCODE, VENDCODE, POSITION, CTCADR1, CTCADR2, EMAIL, GROUPID) {
    //alert(text)
    const endpoint = 'http://www.072serv.com/etracking/index.php/wepapp/insert/';
    let data = {
      EMPCODE: EMPCODE,
      EMPDESC: EMPDESC,
      CUSTCODE: CUSTCODE,
      VENDCODE: VENDCODE,
      POSITION: POSITION,
      CTCADR1: CTCADR1,
      CTCADR2: CTCADR2,
      EMAIL: EMAIL,
      GROUPID: GROUPID
    }
       return  this.httpserviceService.post(endpoint, data).then((data) => {
                // console.log(data);
                 return data;
            });
  }
  edit(EMPCODE, EMPDESC, CUSTCODE, VENDCODE, POSITION, CTCADR1, CTCADR2, EMAIL, GROUPID) {
    //alert(text)
    const endpoint = 'http://www.072serv.com/etracking/index.php/wepapp/edit/';
    let data = {
      EMPCODE: EMPCODE,
      EMPDESC: EMPDESC,
      CUSTCODE: CUSTCODE,
      VENDCODE: VENDCODE,
      POSITION: POSITION,
      CTCADR1: CTCADR1,
      CTCADR2: CTCADR2,
      EMAIL: EMAIL,
      GROUPID: GROUPID
    }
       return  this.httpserviceService.post(endpoint, data).then((data) => {
                // console.log(data);
                 return data;
            });
  }
    get_detials(EMPCODE) {
    //alert(text)
    const endpoint = 'http://www.072serv.com/etracking/index.php/wepapp/get_EMPCODE_detial/';
    let data = { EMPCODE: EMPCODE }
    return  this.httpserviceService.post(endpoint, data).then((data) => {
                // console.log(data);
                return data;
            });
  }
  add_data(EMPCODE, EMPDESC, CUSTCODE, VENDCODE, POSITION, CTCADR1, CTCADR2, EMAIL) {
        this.get_detials(EMPCODE).then(data=>{
          
        if(Object.keys(data).length > 0){
          
          this._success.next(`EMPCODE ถูกใช้งานแล้ว`);
        }else{
          var GROUPID = "";
          this.insert(EMPCODE, EMPDESC, CUSTCODE, VENDCODE, POSITION, CTCADR1, CTCADR2, EMAIL, GROUPID).then(data=>{
            var msg = 'Add Successful';
             this._success.next(`Add Successful`);
            this.searchbarinput = EMPCODE;
            this.PageNumber = 1;
            this.getonlinedata(this.searchbarinput, this.PageNumber, this.RowspPage)
            this.getonlinedata('', this.PageNumber, this.RowspPage).then((data) => {
     this.initializeData  = data['data'];
     this.initializetotalrows = data['totalrows'];
   });

          },(er)=>{console.log(er)});
        }
      },(er)=>{console.log(er)})

  }
  edit_data(EMPCODE, EMPDESC, CUSTCODE, VENDCODE, POSITION, CTCADR1, CTCADR2, EMAIL){

      var GROUPID = "";
      this.edit(EMPCODE, EMPDESC, CUSTCODE, VENDCODE, POSITION, CTCADR1, CTCADR2, EMAIL, GROUPID).then(data=>{
        var msg = 'Edit Successful';
        this._success.next(`Edit Successful`);
        let val = this.searchbarinput;
        if (val && val.trim() != '') {

this.getonlinedata(this.searchbarinput, this.PageNumber, this.RowspPage)
this.getonlinedata('', this.PageNumber, this.RowspPage).then((data) => {
     this.initializeData  = data['data'];
     this.initializetotalrows = data['totalrows'];
   });
        }else{
this.getonlinedata('', this.PageNumber, this.RowspPage).then((data) => {
     this.initializeData  = data['data'];
     this.initializetotalrows = data['totalrows'];
   });
        }


      },(er)=>{console.log(er)});


  }
  
   open(content,mode,item) {
     this.mode = mode;
     if(mode == 'A'){
this.EMPCODE = "";
 this.EMPDESC = "";
  this.CUSTCODE = "";
   this.VENDCODE = "";
    this.POSITION = "";
     this.CTCADR1 = "";
      this.CTCADR2 = "";
       this.EMAIL = "";
        this.GROUPID = "";
        this.ngbalerttext = null
        this.disabled_EMPCODE = false;
     }else{
       this.EMPCODE = item.EMPCODE;
 this.EMPDESC = item.EMPDESC;
  this.CUSTCODE = item.CUSTCODE ;
   this.VENDCODE = item.VENDCODE ;
    this.POSITION = item.POSITION ;
     this.CTCADR1 = item.CTCADR1 ;
      this.CTCADR2 = item.CTCADR2 ;
       this.EMAIL = item.EMAIL ;
        this.GROUPID = item.GROUPID ;
        this.ngbalerttext = null
        this.disabled_EMPCODE = true;
     }
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  
Saveclick(EMPCODE, EMPDESC, CUSTCODE, VENDCODE, POSITION, CTCADR1, CTCADR2, EMAIL) {
    if (!EMPCODE) {
   this._success.next(`โปรดใส่ EMPCODE`);
      return
    }
    if (!EMPDESC) {
      EMPDESC = "";
    }
    if (!CUSTCODE) {
      CUSTCODE = "";
    }
    if (!VENDCODE) {
      VENDCODE = "";
    }
    if (!POSITION) {
      POSITION = "";
    }
    if (!CTCADR1) {
      CTCADR1 = "";
    }
    if (!POSITION) {
      POSITION = "";
    }
    if (!EMAIL) {
      EMAIL = "";
    }
    if (!CTCADR2) {
  this._success.next(`โปรดใส่ CTCADR2`);
      return
    }
    if (this.mode == 'A') {
      this.add_data(EMPCODE, EMPDESC, CUSTCODE, VENDCODE, POSITION, CTCADR1, CTCADR2, EMAIL);
    }
    if (this.mode == 'E') {
      this.edit_data(EMPCODE, EMPDESC, CUSTCODE, VENDCODE, POSITION, CTCADR1, CTCADR2, EMAIL);
    }


  }



}
