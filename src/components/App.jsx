import styles from './App.module.css';
import Section from 'components/Section/Section';
import ContactForm from 'components/ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import ContactList from './ContactList/ContactList';
import { Notification } from 'components/Notification/Notification';
import Filter from './Filter/Filter';
import { load, save } from 'services/localStorage';
import contactsItems from 'data/contactsItems';

const localStorageKey = 'contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const { wrapper } = styles;

  const setContactsInStorage = contactsArray => {
    save(localStorageKey, contactsArray);
  };

  const getContactFromStorage = () => {
    const localPhonebookContacts = load(localStorageKey);
    return localPhonebookContacts
      ? localPhonebookContacts
      : setContactsInStorage(contactsItems);
  };
  const handleFilter = e => {
    setFilter(e.target.value);
  };

  const setFilterContacts = (filterValue, contactsArray) => {
    if (!filterValue) {
      return contactsArray;
    } else {
      return contactsArray.filter(contact => {
        return contact.name
          .toLocaleLowerCase()
          .includes(filterValue.toLocaleLowerCase());
      });
    }
  };

  const removeContact = id => {
    const newContactList = contacts.filter(contact => contact.id !== id);
    save(localStorageKey, newContactList);
    setContacts(newContactList);
  };

  const onSubmit = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    if (contacts.some(contact => contact.number === number)) {
      const filteredNumber = contacts.filter(
        contact => contact.number === number
      )[0].name;
      alert(`${number} is already in contact with ${filteredNumber} `);
      return;
    }
    const newContactArray = [newContact, ...contacts];

    setContactsInStorage(newContactArray);
    setContacts(newContactArray);
  };

  useEffect(() => {
    const myPhonebookContacts = getContactFromStorage();
    setContacts(myPhonebookContacts);
  }, []);

  const phonebookContacts = getContactFromStorage();
  return (
    <div className={wrapper}>
      <Section title="Phonebook">
        <ContactForm onSubmit={onSubmit} />
      </Section>
      <Section title="Contacts">
        {phonebookContacts.length > 0 ? (
          <>
            <Filter onChange={handleFilter} />
            <ContactList
              contacts={setFilterContacts(filter, phonebookContacts)}
              removeContact={removeContact}
            />
          </>
        ) : (
          <Notification message="Your phonebook is empty" />
        )}
      </Section>
    </div>
  );
};

export default App;
