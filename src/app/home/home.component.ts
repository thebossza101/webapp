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
  inputfrom = {
    DOCNO:'',
    disabled_Key:false,
    CONAME:'',
    CTCNAME:'',
    DOCDATE:'',
    FROMNAME:'',
    TEL:'',
    CCNAME:'',
    OPTION1:'',
    SHIPPERNAME:'',
    CBM:'',
    FEEDER:'',
    VESSEL:'',
    PORTNAME:'',
    ETD:'',
    ETA:'',
    CFSDATE:'',
    RETURNDATE:'',
    LOADTIME:'',


  }
    selectfrom:any;
  constructor(public httpserviceService: HttpserviceService,public googleService: GoogleService,private modalService:NgbModal, public activeModal: NgbActiveModal) 
  { }
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
  DOCNO:string
  isClassVisible:any

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
  getonlinedata(DOCNO, PageNumber, RowspPage) {
           let url = 'http://www.072serv.com/etracking/index.php/webapp2/search_data';
            let data = {
              data:{
                DOCNO: DOCNO
              },
              PageNumber: PageNumber,
              RowspPage: RowspPage,
              table:'SFBOOK',
              ORDERBY:'DOCNO'
            };
          return  this.httpserviceService.newpost(url, data).then((data) => {
                // console.log(data);
                this.totalrows = data['totalrows'];
                this.items  = data['data'];
                this.isClassVisible = data['data'][0].DOCNO;
                this.selectfrom = data['data'][0];
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
  delclick(){

      this.delete_EMPCODE(this.selectfrom.DOCNO).then((res)=>{
          this.inputfrom.DOCNO='';
     this.inputfrom.disabled_Key=false;
     this.inputfrom.CONAME='';
     this.inputfrom.CTCNAME='';
     this.inputfrom.DOCDATE='';
     this.inputfrom.FROMNAME='';
     this.inputfrom.TEL='';
     this.inputfrom.CCNAME='';
     this.inputfrom.OPTION1='';
     this.inputfrom.SHIPPERNAME='';
     this.inputfrom.CBM='';
     this.inputfrom.FEEDER='';
     this.inputfrom.VESSEL='';
     this.inputfrom.PORTNAME='';
     this.inputfrom.ETD='';
     this.inputfrom.ETA='';
     this.inputfrom.CFSDATE='';
     this.inputfrom.RETURNDATE='';
     this.inputfrom.LOADTIME='';
        this.ngbalerttext = null
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

    const endpoint = 'http://www.072serv.com/etracking/index.php/webapp2/delete_data/';
    let data = { 
      table: 'SFBOOK',
      key:'DOCNO',
      value:EMPCODE
   }
   return  this.httpserviceService.newpost(endpoint, data).then((data) => {
                // console.log(data);
                 return data;
            });

  }
  insert(data) {
    //alert(text)
    const endpoint = 'http://www.072serv.com/etracking/index.php/webapp2/insert_data/';
    // +-----------------------------------------
    // +-----------------------------------------
     let data2 = { 
      table: 'SFBOOK', 
      data:data
   }
       return  this.httpserviceService.newpost(endpoint, data2).then((data) => {
                // console.log(data);
                 return data;
            });
  }
  edit(data) {
    //alert(text)
    const endpoint = 'http://www.072serv.com/etracking/index.php/webapp2/edit_data/';
    // +-----------------------------------------
    let data2 = { 
      table: 'SFBOOK',
      key:'DOCNO',
      value:data.DOCNO,
      data:data
   }
    // +-----------------------------------------
       return  this.httpserviceService.newpost(endpoint, data2).then((data) => {
                // console.log(data);
                 return data;
            });
  }
    get_detials(value) {
    //alert(text)
    const endpoint = 'http://www.072serv.com/etracking/index.php/webapp2/get_detial/';
 
    let data = {
       key:'DOCNO',
       value: value,
       table:'SFBOOK'
       }
    return  this.httpserviceService.newpost(endpoint, data).then((data) => {
                // console.log(data);
                return data;
            });
  }
  add_data(data) {
        this.get_detials(data.DOCNO).then(res=>{
          
        if(Object.keys(res).length > 0){
          
          this._success.next(`EMPCODE ถูกใช้งานแล้ว`);
        }else{
          var GROUPID = "";
          this.insert(data).then(res2=>{
            var msg = 'Add Successful';
             this._success.next(`Add Successful`);
            this.searchbarinput = data.DOCNO;
            this.PageNumber = 1;
            this.getonlinedata('', this.PageNumber, this.RowspPage).then((res3) => {
     this.initializeData  = res3['data'];
     this.initializetotalrows = res3['totalrows'];
       this.getonlinedata(this.searchbarinput, this.PageNumber, this.RowspPage)
   });
      
          },(er)=>{console.log(er)});
        }
      },(er)=>{console.log(er)})

  }
  edit_data(data){

      var GROUPID = "";
      this.edit(data).then(res=>{
        var msg = 'Edit Successful';
        this._success.next(`Edit Successful`);
        let val = this.searchbarinput;
        if (val && val.trim() != '') {
this.getonlinedata('', this.PageNumber, this.RowspPage).then((res2) => {
     this.initializeData  = res2['data'];
     this.initializetotalrows = res2['totalrows'];
       this.getonlinedata(this.searchbarinput, this.PageNumber, this.RowspPage).then((res4)=>{
     this.isClassVisible = data.DOCNO;
    this.selectfrom = data;
   })
   });
 
        }else{
this.getonlinedata('', this.PageNumber, this.RowspPage).then((res3) => {
     this.initializeData  = res3['data'];
     this.initializetotalrows = res3['totalrows'];
     this.isClassVisible = data.DOCNO;
    this.selectfrom = data;
   });
        }


      },(er)=>{console.log(er)});


  }
  
   open(content,mode) {
     this.mode = mode;
     if(mode == 'A'){
   this.inputfrom.DOCNO='';
     this.inputfrom.disabled_Key=false;
     this.inputfrom.CONAME='';
     this.inputfrom.CTCNAME='';
     this.inputfrom.DOCDATE='';
     this.inputfrom.FROMNAME='';
     this.inputfrom.TEL='';
     this.inputfrom.CCNAME='';
     this.inputfrom.OPTION1='';
     this.inputfrom.SHIPPERNAME='';
     this.inputfrom.CBM='';
     this.inputfrom.FEEDER='';
     this.inputfrom.VESSEL='';
     this.inputfrom.PORTNAME='';
     this.inputfrom.ETD='';
     this.inputfrom.ETA='';
     this.inputfrom.CFSDATE='';
     this.inputfrom.RETURNDATE='';
     this.inputfrom.LOADTIME='';
        this.ngbalerttext = null
      
     }else{
       this.inputfrom.disabled_Key=true;
       
     this.inputfrom.DOCNO=this.selectfrom.DOCNO;
     this.inputfrom.CONAME=this.selectfrom.CONAME;
     this.inputfrom.CTCNAME=this.selectfrom.CTCNAME;
     this.inputfrom.DOCDATE=this.selectfrom.DOCDATE;
     this.inputfrom.FROMNAME=this.selectfrom.FROMNAME;
     this.inputfrom.TEL=this.selectfrom.TEL;
     this.inputfrom.CCNAME=this.selectfrom.CCNAME;
     this.inputfrom.OPTION1=this.selectfrom.OPTION1;
     this.inputfrom.SHIPPERNAME=this.selectfrom.SHIPPERNAME;
     this.inputfrom.CBM=this.selectfrom.CBM;
     this.inputfrom.FEEDER=this.selectfrom.FEEDER;
     this.inputfrom.VESSEL=this.selectfrom.VESSEL;
     this.inputfrom.PORTNAME=this.selectfrom.PORTNAME;
     this.inputfrom.ETD=this.selectfrom.ETD;
     this.inputfrom.ETA=this.selectfrom.ETA;
     this.inputfrom.CFSDATE=this.selectfrom.CFSDATE;
     this.inputfrom.RETURNDATE=this.selectfrom.RETURNDATE;
     this.inputfrom.LOADTIME=this.selectfrom.LOADTIME;
     this.ngbalerttext = null
     }
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      //console.log( this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      //console.log( this.closeResult);
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
  
Saveclick() {
    if (!this.inputfrom.DOCNO) {
   this._success.next(`โปรดใส่ DOCNO`);
      return
    }
     let data = {
    DOCNO:this.inputfrom.DOCNO,
    CONAME:this.inputfrom.CONAME,
    CTCNAME:this.inputfrom.CTCNAME,
    DOCDATE:this.inputfrom.DOCDATE,
    FROMNAME:this.inputfrom.FROMNAME,
    TEL:this.inputfrom.TEL,
    CCNAME:this.inputfrom.CCNAME,
    OPTION1:this.inputfrom.OPTION1,
    SHIPPERNAME:this.inputfrom.SHIPPERNAME,
    CBM:this.inputfrom.CBM,
    FEEDER:this.inputfrom.FEEDER,
    VESSEL:this.inputfrom.VESSEL,
    PORTNAME:this.inputfrom.PORTNAME,
    ETD:this.inputfrom.ETD,
    ETA:this.inputfrom.ETA,
    CFSDATE:this.inputfrom.CFSDATE,
    RETURNDATE:this.inputfrom.RETURNDATE,
    LOADTIME:this.inputfrom.LOADTIME,
      }
    
    if (this.mode == 'A') {
      this.add_data(data);

    }
    if (this.mode == 'E') {
      this.edit_data(data);
    }


  }
  clicktr(item){
this.isClassVisible = item.DOCNO;
this.selectfrom = item;

    
  }



}
