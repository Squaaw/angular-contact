import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  set contacts(c: Contact[]) {
    localStorage.setItem('contacts', JSON.stringify(c));
  }

  get contacts(): Contact[] {
    return JSON.parse(localStorage.getItem('contacts') || '');
  }

  constructor() { }
}
