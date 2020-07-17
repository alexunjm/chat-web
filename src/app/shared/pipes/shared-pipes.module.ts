import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjToKeyVal, NmbToArr, FormatP, MapJoin } from './format/format';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ObjToKeyVal,
        NmbToArr,
        MapJoin,
        FormatP
    ],
    exports: [
        ObjToKeyVal,
        NmbToArr,
        MapJoin,
        FormatP
    ]
})
export class SharedPipesModule { }
