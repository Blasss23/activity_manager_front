import { Component, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog'; 

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html', 
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent {

    constructor(public dialogRef: MatDialogRef<ModalComponent>) { }

    public response(resp: boolean): void { 
        this.dialogRef.close(resp);
    }
}
