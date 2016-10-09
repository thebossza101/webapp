import {
  Component,
  OnInit
} from '@angular/core';

import { HttpserviceService } from '../shared/httpservice.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public httpserviceService: HttpserviceService) {}
  items: any;
  PageNumber = 1;
  totalrows = 0;
  RowspPage = 50;
  searchbarinput:string;
  initializeData:any;
  ngOnInit() {

   this.getonlinedata('',this.PageNumber,this.RowspPage).then((data)=>{
     this.initializeData  = data['data'];
   })
  }
  buttonSearchclick(){
      let val = this.searchbarinput
        if (val && val.trim() != ''){
         this.getonlinedata(this.searchbarinput,this.PageNumber,this.RowspPage);

  }else{
  this.items = this.initializeData
  }

  }
  getonlinedata(EMPCODE,PageNumber,RowspPage){
           let url = 'http://www.072serv.com/etracking/index.php/wepapp/test2';
            let data = {EMPCODE:EMPCODE,PageNumber:PageNumber,RowspPage:RowspPage}
          return  this.httpserviceService.post(url,data).then((data)=>{
                //console.log(data);
                this.totalrows = data['totalrows'];
                this.items  = data['data'];
                return data;
            })
  }



}