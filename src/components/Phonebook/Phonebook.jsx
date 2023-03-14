
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

import styles from './ContactForm/contactForm.module.css';

const Phonebook = () => {
   
    const [contacts, setContacts] = useState(() => {
      const contacts = JSON.parse(localStorage.getItem('my-contacts'));
      
    return contacts ? contacts : [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDublicate = ({ name }) => {
    const normalizedName = name.toLowerCase();
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });
  
    return Boolean(result);
  };

  const addContact = ({ name, number }) => {
    if (isDublicate({ name, number })) {
      alert(`${name}: ${number} is already in contacts`);
      return false;
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return [newContact, ...prevContacts];
    });
    return true;
  };
  const removeContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilter = ({ target }) => setFilter(target.value);

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.toLowerCase().includes(normalizedFilter)
      );
    });

    return result;
  };

  const filteredContacts = getFilteredContacts();
  const isContacts = Boolean(filteredContacts.length);

  return (
    <div>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={styles.title}>Contacts</h2>
      <Filter handleInputChange={handleFilter} value={filter} />
      {isContacts && (
        <ContactList
          contacts={filteredContacts}
          removeContact={removeContact}
        />
      )}
      {!isContacts && <p>No contacts in list</p>}
    </div>
  );


}

export default Phonebook;