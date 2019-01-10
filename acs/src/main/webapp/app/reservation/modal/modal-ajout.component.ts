import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormControl} from '@angular/forms';

@Component( {
    selector: 'ref-modal-ajout',
    templateUrl: './modal-ajout.component.html'
} )
export class ModalAjoutComponent implements OnInit {
    date = new FormControl(new Date());
    serializedDate = new FormControl((new Date()).toISOString());
    
    constructor(public dialogRef: MatDialogRef<ModalAjoutComponent>,
            @Inject(MAT_DIALOG_DATA) public data ) {
    }
    
    ngOnInit() {
        console.log("modal");
    }
}