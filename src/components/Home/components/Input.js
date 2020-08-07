import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoIosSearch } from 'react-icons/io';

const Input = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const onValueChange = ({ target: { value } }) => {
    setSearchValue(value);
  };

  const handleKeyDown = ({ keyCode }) => {
    if (keyCode === 13) {
      onSearch(searchValue, 1)();
    }
  };

  return (
    <div className="input-container">
      <input
        placeholder="Search for images here..."
        value={searchValue}
        onChange={onValueChange}
        onKeyDown={handleKeyDown}
      />
      <div>
        <IoIosSearch
          className="search-btn"
          size={21}
          onClick={onSearch(searchValue, 1)}
        />
      </div>
    </div>
  );
};

export default Input;

Input.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
