import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnChanges {

  /**
   * Permet d'émettre un évènement lors de la modification d'un contact.
   * @type {EventEmitter<any>}
   */
   @Output() editContactEvent = new EventEmitter();

   /**
    * Permet de récupérer les informations du contact depuis le composant parent.
    */
   @Input() contact = new Contact();
 
   constructor(private fb: FormBuilder) { }

   editForm = this.fb.group({
    fullname: [''],
    nickname: [''],
    email: [''],
    editFullname: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z ]*')]]
  });

  /**
   * Par défaut, désactive certains champs du formulaire.
   */
   ngOnInit() {
    this.editForm.disable();
    this.editForm.controls['editFullname'].enable();
   }

   /**
    * Cette fonction permet de mettre à jour les informations de contact reçues par le composant parent.
    */
   ngOnChanges() {
    this.editForm.controls['fullname'].setValue(this.contact.fullname);
    this.editForm.controls['nickname'].setValue(this.contact.nickname);
    this.editForm.controls['email'].setValue(this.contact.email);
    this.editForm.controls['editFullname'].setValue(this.contact.fullname);
   }
 
   /**
    * Lorque l'utilisateur soumet le formulaire, j'émets l'évènement avec la modification du nom du contact.
    */
   onKeyUp(e: any) {
     if (!this.editForm.controls['editFullname'].valid)
      return;
      
      this.editForm.controls['fullname'].setValue(e.target.value);
      this.editContactEvent.emit(e.target.value);
   }
}
