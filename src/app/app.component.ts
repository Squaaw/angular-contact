import { Component, OnInit } from '@angular/core';
import { Contact } from './models/contact';
import { ContactService } from './service/contact.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  contacts: Contact[] = [];
  contactIndex: number = -1;
  currentContact: Contact = new Contact();

  constructor(private contactService: ContactService, private fb: FormBuilder) { }

  /**
   * Au chargement de l'application, je récupère mes contacts depuis le localStorage.
   */
  ngOnInit() {
     this.contacts = this.contactService.contacts;
  }

  /**
   * Cette fonction se déclenche dans l'application lorsqu'un nouveau contact
   * est créé par l'utilisateur dans le composant app-profile-editor.
   * On ajoute le nouveau contact dans le tableau des contacts,
   * puis on enregistre dans le localStorage.
   * @param newContactEvent
   */
   newContact(newContactEvent: any) {
    this.contacts.push(newContactEvent.contact);
    this.contactService.contacts = this.contacts;
  }

  /**
   * Lorsque l'utilisateur sélectionne un contact, ses informations sont affichées.
   * On récupère également l'index du contact dans le tableau afin de modifier son nom (en cas de changement).
   * @param contact
   */
  onContactClick(contact: Contact){
    this.currentContact = new Contact();
    this.currentContact.fullname = contact.fullname;
    this.currentContact.nickname = contact.nickname;
    this.currentContact.email = contact.email;

    this.contactIndex = this.contacts.indexOf(contact);
  }

  /**
   * Lorsque l'utilisateur modifie le nom du contact, cette modification est enregistrée instantanément dans le tableau.
   * @param e 
   */
  onKeyUp(e: string) {
    if (this.contactIndex >= 0) {
      this.contacts[this.contactIndex].fullname = e;
      this.contactService.contacts = this.contacts;
    }
  }
}
