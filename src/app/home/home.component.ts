import {
  Component,
  OnInit
} from '@angular/core';

import { HttpserviceService } from '../shared/httpservice.service';
import { GoogleService } from '../shared/google.service';
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   private _success = new Subject<string>();

  constructor(public httpserviceService: HttpserviceService,public googleService: GoogleService,private modalService: NgbModal) {}
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
  ngOnInit() {
this._success.subscribe((message) => this.ngbalerttext = message);
   this.getonlinedata('', this.PageNumber, this.RowspPage).then((data) => {
     this.initializeData  = data['data'];
     this.initializetotalrows = data['totalrows'];
   });
  }
  buttonSearchclick() {
      let val = this.searchbarinput;
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
             this.ngbalerttext = null;
            
            
          },(er)=>{console.log(er)});
        }
      },(er)=>{console.log(er)})

  }
  edit_data(EMPCODE, EMPDESC, CUSTCODE, VENDCODE, POSITION, CTCADR1, CTCADR2, EMAIL){

      var GROUPID = null;
      this.edit(EMPCODE, EMPDESC, CUSTCODE, VENDCODE, POSITION, CTCADR1, CTCADR2, EMAIL, GROUPID).then(data=>{
        var msg = 'Edit Successful';
  
      },(er)=>{console.log(er)});


  }
   open(content,mode) {
     this.mode = mode;
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
