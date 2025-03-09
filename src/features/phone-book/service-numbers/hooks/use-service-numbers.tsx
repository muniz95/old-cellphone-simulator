import { useState, useEffect } from 'react';
import { Contact } from '../../../../interfaces/contact';
import service from '../../../../services/contact.service';

export const useServiceNumbers = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    setContacts(service.getServiceNumbers());
  }, []);

  return { contacts };
};
