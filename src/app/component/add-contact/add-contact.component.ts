import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent {
  /**
   * Permet d'émettre un évènement lors de la création d'un contact.
   * @type {EventEmitter<any>}
   */
  @Output() newContactEvent = new EventEmitter();

  /**
   * Le contact à créer.
   * @type {Contact}
   */
   contact: Contact = new Contact();

  constructor(private fb: FormBuilder) { }

  mailRegex: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  profileForm = this.fb.group({
    fullname: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z ]*')]],
    nickname: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern(this.mailRegex)]],
  });

  /**
   * Lorque l'utilisateur soumet le formulaire, j'émets l'évènement avec le nouveau contact.
   */
  onSubmit() {
    this.contact.fullname = this.profileForm.controls['fullname'].value;
    this.contact.nickname = this.profileForm.controls['nickname'].value;
    this.contact.email = this.profileForm.controls['email'].value;

    this.newContactEvent.emit({ contact: this.contact });

    // Réinitialisation du contact et du formulaire.
    this.contact = new Contact();
    this.profileForm.reset();
  }
}
