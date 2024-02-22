import { randomUUID } from 'crypto';

export class Contact {
  readonly contactId: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  clientId?: string;

  constructor() {
    const currentDate = new Date().toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    this.date = currentDate;
    this.contactId = randomUUID();
  }
}
