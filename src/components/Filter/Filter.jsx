import styles from './Filter.module.css';
import React from 'react';
import PropTypes from 'prop-types';


const Filter = ({ onChange }) => {
  const { field, text, input } = styles;

  return (
   <div className={field}>
        <p className={text}>Find contact by name</p>
        <input className={input} type="text" onChange={onChange} />
      </div>
  );
};


export default Filter;

Filter.propTypes = {
  onChange: PropTypes.func
};
