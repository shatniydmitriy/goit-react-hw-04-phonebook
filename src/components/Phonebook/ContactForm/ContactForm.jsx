
import PropTypes from 'prop-types';
import useForm from 'components/shared/hooks/useForm';

import initialState from './initialState';
import styles from './contactForm.module.css';


const ContactForm = ({ onSubmit }) => {
    const { state, handleChange, handleSubmit } = useForm({
    initialState,
    onSubmit,
    });
  
    const { name, number } = state;
  return (
      <div className={styles.wrapper}>
        <div className={styles.contactFormBlock}>
          <form className="" onSubmit={handleSubmit}>
            <div className={styles.conactFormGroup}>
              <label className={styles.label} htmlFor={this.nameInputId}>
                Name
              </label>
              <input
                className={styles.input}
                value={name}
                onChange={handleInputChange}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
            />
          </div>
           <div className={styles.conactFormGroup}>
              <label className={styles.label}>
                Number
              </label>
              <input
                className={styles.input}
                value={number}
                onChange={handleInputChange}
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required

            />
          </div>
          <button className={styles.btnAddContact} type="submit">
            Add contact
          </button>
        </form>
      </div>
    </div>
  );
  

}
export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};