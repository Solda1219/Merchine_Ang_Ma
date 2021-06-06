import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageTranslationModule } from '../../module/language-translation.module';
import { NgxLoadingModule } from 'ngx-loading';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgMultiSelectDropDownModule } from '../../module/ng-multiselect-dropdown/src';
import { AlertModule } from 'ngx-bootstrap/alert';
import { DemoMaterialModule } from '../../material.module';

import { WipCreateComponent } from './wip-create/wip-create.component';
import { WipRoutingModule } from './wip-routing.module';
import { WipContentComponent } from './wip-content/wip-content.component';
import { WipUpdateComponent } from './wip-update/wip-update.component';



@NgModule({
  declarations: [WipCreateComponent, WipContentComponent, WipUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    WipRoutingModule,
    ReactiveFormsModule,
    LanguageTranslationModule,
    NgxLoadingModule.forRoot({}),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    DemoMaterialModule,
    TabsModule,
    ProgressbarModule,
  ]
})
export class WipModule { }
