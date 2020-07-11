import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjToKeyVal, NmbToArr } from './format/format';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ObjToKeyVal,
        NmbToArr
    ],
    exports: [
        ObjToKeyVal,
        NmbToArr
    ]
})
export class SharedPipesModule { }
