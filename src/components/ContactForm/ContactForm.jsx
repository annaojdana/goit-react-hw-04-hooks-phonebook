import styles from './ContactForm.module.css';
import { Button } from 'components/Button/Button';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const ContactForm = ({ onSubmit }) => {
  const { form, form__field, label, input } = styles;

  const [contact, setContact] = useState({ ...INITIAL_STATE });

  const { name, number } = contact;

  const handleChange = evt => {
    const { name, value } = evt.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(contact);
    setContact({ ...INITIAL_STATE });
  };

  return (
    <form className={form} onSubmit={handleSubmit}>
      <div className={form__field}>
        <label htmlFor="contactName" className={label}>
          Name
        </label>
        <input
          className={input}
          id="contactName"
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={handleChange}
          required
        />
      </div>
      <div className={form__field}>
        <label htmlFor="contactTel" className={label}>
          Phone number
        </label>
        <input
          className={input}
          id="contactTel"
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" title="Add contact"></Button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
