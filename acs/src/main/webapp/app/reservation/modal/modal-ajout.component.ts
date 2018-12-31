import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component( {
    selector: 'ref-modal-ajout',
    templateUrl: './modal-ajout.component.html'
} )
export class ModalAjoutComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<ModalAjoutComponent>,
            @Inject(MAT_DIALOG_DATA) public data ) {
    }
    
    ngOnInit() {
    }
}