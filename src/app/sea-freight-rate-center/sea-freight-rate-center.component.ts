import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../shared/httpservice.service';

@Component({
  selector: 'app-sea-freight-rate-center',
  templateUrl: './sea-freight-rate-center.component.html',
  styleUrls: ['./sea-freight-rate-center.component.scss']
})
export class SeaFreightRateCenterComponent implements OnInit {
  items: any;
  PageNumber = 1;
  totalrows = 0;
  RowspPage = 15;
  searchbarinput:any;
  constructor(public httpserviceService: HttpserviceService) { }

  ngOnInit() {
 this.searchbarinput = {
   FINALPORTNAME:'',
   AGENTNAME:'',
   LINERNAME:''
 }   
let FINALPORTNAME = this.searchbarinput.FINALPORTNAME;
let AGENTNAME = this.searchbarinput.AGENTNAME;
let LINERNAME = this.searchbarinput.LINERNAME;   
this.getonlinedata(FINALPORTNAME,AGENTNAME,LINERNAME, this.PageNumber, this.RowspPage)
  }
  buttonSearchclick() {
      let FINALPORTNAME = this.searchbarinput.FINALPORTNAME;
      let AGENTNAME = this.searchbarinput.AGENTNAME;
      let LINERNAME = this.searchbarinput.LINERNAME;
      this.PageNumber = 1;  
      this.getonlinedata(FINALPORTNAME,AGENTNAME,LINERNAME, this.PageNumber, this.RowspPage);
  }
   getonlinedata(FINALPORTNAME,AGENTNAME,LINERNAME, PageNumber, RowspPage) {
           let url = 'http://www.072serv.com/etracking/index.php/webapp_sfrc/search_data';
            let data = {
              data:{
                FINALPORTNAME,
                AGENTNAME,
                LINERNAME
              },
              PageNumber: PageNumber,
              RowspPage: RowspPage,
              table:'SFRATE',
              ORDERBY:'PMKEY'
            };
          return  this.httpserviceService.newpost(url, data).then((data) => {
                // console.log(data);
                this.totalrows = data['totalrows'];
                this.items  = data['data'];
                return data;
            });
  }
    datetimeformat(date){
let t =date.split(" ");
let d = new Date(t[0]+ " " +t[1]+ " "+t[2])
//console.log(d);
return d;

  }
    pageChange(val){
//console.log(val);
this.PageNumber = val;
let FINALPORTNAME = this.searchbarinput.FINALPORTNAME;
let AGENTNAME = this.searchbarinput.AGENTNAME;
let LINERNAME = this.searchbarinput.LINERNAME;   
this.getonlinedata(FINALPORTNAME,AGENTNAME,LINERNAME, this.PageNumber, this.RowspPage)

  }

}
