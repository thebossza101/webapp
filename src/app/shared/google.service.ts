import { Injectable } from '@angular/core';



declare var gapi: any;

@Injectable()
export class GoogleService {
CLIENT_ID: string = '660395730054-jamduso3f43pubilm8fcld5kpatgt1rl.apps.googleusercontent.com';
SCOPES: string[]  = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
authResult: any ;
output:any = ' ';
immediate:boolean = true;
  constructor() {

  }
checkAuth() {
    return gapi.auth.authorize(
      {
        'client_id': this.CLIENT_ID,
        'scope': this.SCOPES.join(' '),
        'immediate': true
      }, (authResult)=>{
return this.handleAuthResult(authResult,name);
      });
  }
  handleAuthResult(authResult,name) {
  //  alert(this.CLIENT_ID + '/' + authResult)
    if (authResult && !authResult.error) {
      // Hide auth UI, then load client library.
      this.authResult = authResult;
      return Promise.resolve(name);
    } else {
    //alert(this.CLIENT_ID + '/' + authResult)
    this.immediate = false;
    this.handleAuthClick(name);
 //return  gapi.auth.authorize(
  //     {client_id: this.CLIENT_ID, scope: this.SCOPES}).then((authResult)=>this.handleAuthResult(authResult,name)).then((name)=>this.loadDriveApi(name)).then((name)=>this.listFiles(name))
    
    }
  }
  loadDriveApi(name) {

return gapi.client.load('drive', 'v3').then(()=>{return name});
  }
  handleAuthClick(name) {
  
   return new Promise((resolve, reject) => {

gapi.auth.authorize(
      {
        'client_id': this.CLIENT_ID,
        'scope': this.SCOPES.join(' '),
        'immediate': true
      }, (authResult)=>{
          if (authResult && !authResult.error) {         
      this.authResult = authResult;
      this.loadDriveApi(name).then((res)=>this.listFiles(res)).then((data)=>{
          resolve(data);
          })
    } else {
    gapi.auth.authorize(
      {
        'client_id': this.CLIENT_ID,
        'scope': this.SCOPES.join(' '),
        'immediate': false
      }, (authResult)=>{
    this.loadDriveApi(name).then((res)=>this.listFiles(res)).then((data)=>{
          resolve(data);
          })
        
      });
    }

        
      });

   });
    


        
     
     }
     listFiles(name){

    var request = gapi.client.drive.files.list({
                'q': "name ='"+name+"'",
                'fields': "files(webViewLink)"
              });

            return  request.then((resp) => {
            //console.log(resp.result);
          //  this.output = 'Files:';

            var files = resp.result.files;
            if (files && files.length > 0) {
              //console.log(files);
              //return Promise.resolve(name);
              return files;
            } else {
              return 'No files found.';
            }
          });


  }


}

