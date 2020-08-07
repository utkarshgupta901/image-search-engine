import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { MdClose } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import Loader from './Loader';

const Modal = ({ imageId }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchImage(imageId);
  }, [imageId]);

  const navigateToHome = () => {
    history.push('/home');
  };

  const handleClick = (event) => {
    if (event.target?.id === 'modal') {
      navigateToHome();
    }
  };

  const fetchImage = async (id) => {
    const { data } = await axios.get(
      `https://api.unsplash.com/photos/${id}?client_id=IESScXbsjYYozx09c1yXWelq4fjTaaHgi9f5-vzEeKc`,
    );

    setImage(data);
    setLoading(false);
  };

  return (
    <div id="modal" className="modal" role="presentation" onClick={handleClick}>
      <div className="modal-content">
        <div style={{ display: 'block', width: '100%' }}>
          {loading && (
            <div style={{ margin: '0 auto', width: 'fit-content' }}>
              <Loader />
            </div>
          )}
          {!loading && image && (
            <React.Fragment>
              <div className="user-container">
                <img
                  className="avatar"
                  src={image.user.profile_image.medium}
                  alt="avatar"
                />

                <div style={{ display: 'block' }}>
                  <h4>{image.user.name}</h4>
                  <h5>{`@${image.user.username}`}</h5>
                </div>
              </div>
              <div className="image-content">
                <img
                  src={image.urls.regular}
                  width="100%"
                  alt={image.alt_description}
                />
              </div>
              <div style={{ margin: '35px auto 0 auto', width: 'fit-content' }}>
                <a
                  className="btn"
                  href={`${image.links.download}?force=true`}
                  target="_blank"
                  download={image.alt_description}
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </div>
            </React.Fragment>
          )}
        </div>
        <div>
          <MdClose className="close-btn" size={35} onClick={navigateToHome} />
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  image: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
};
