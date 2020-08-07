import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const Image = ({ imageUrl, userName, userAvatar, imageId }) => {
  return (
    <div className="image-container">
      <Link to={`/home/${imageId}`}>
        <div
          className="image"
          style={{
            background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.2)),
        url(${imageUrl}) no-repeat`,
          }}
          role="presentation"
        />
      </Link>
      <div className="contributor">
        <img src={userAvatar} alt={userName} />
        <h6>
          <strong>Image by </strong>
          {` ${userName}`}
        </h6>
      </div>
    </div>
  );
};

export default Image;

Image.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userAvatar: PropTypes.string.isRequired,
  imageId: PropTypes.string.isRequired,
};
