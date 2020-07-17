import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjToKeyVal, NmbToArr, FormatP } from './format/format';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ObjToKeyVal,
        NmbToArr,
        FormatP
    ],
    exports: [
        ObjToKeyVal,
        NmbToArr,
        FormatP
    ]
})
export class SharedPipesModule { }
