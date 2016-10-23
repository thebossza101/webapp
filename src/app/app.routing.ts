import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SeaFreightRateCenterComponent } from './sea-freight-rate-center/sea-freight-rate-center.component';

const appRoutes: Routes = [
    {
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},
    { path: 'home', component: HomeComponent }, 
    { path: 'SeaFreightRateCenter', component: SeaFreightRateCenterComponent }, 

];

// เรา export ตัวแปรประเภทค่าคงที่ (const) ชื่อ routing ออกไป
// routing นี้เป็นผลลัพธ์จากการเรียก RouterModule.forRoot(appRoutes)
// โดย routing ของเราเป็น ModuleWithProviders
// เพื่อนๆคนไหนไม่เข้าใจว่าทำไมเราต้องเขียน routing: ModuleWithProviders
// แนะนำให้อ่าน ชุดบทความสอนใช้งาน TypeScript ที่ https://www.babelcoder.com/blog/series/typescript ครับ
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true });