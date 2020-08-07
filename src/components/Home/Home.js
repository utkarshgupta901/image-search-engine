import React, { useState } from 'react';
import axios from 'axios';

import Input from './components/Input';
import Image from './components/Image';
import Modal from './components/Modal';
import Loader from './components/Loader';

const Home = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [hasMoreImages, setHasMoreImages] = useState(false);

  console.log(match);

  const onSearch = (searchKeyword = keyword, index = pageIndex) => async () => {
    setLoading(true);
    if (index === 1) {
      setImageList([]);
    }

    try {
      const {
        data: { results, total_pages },
      } = await axios.get(
        `https://api.unsplash.com/search/photos?per_page=9&client_id=IESScXbsjYYozx09c1yXWelq4fjTaaHgi9f5-vzEeKc&page=${index}&query=${searchKeyword}`,
      );

      if (index === 1) {
        setImageList(results);
        setKeyword(searchKeyword);
        setHasMoreImages(true);
      } else {
        setImageList([...imageList, ...results]);
      }

      setPageIndex(++index);

      if (total_pages < index) {
        setHasMoreImages(false);
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return match.params.imageId ? (
    <Modal imageId={match.params.imageId} />
  ) : (
    <div className="container">
      <Input onSearch={onSearch} />
      <div className="image-flex-box">
        {imageList.map((image) => (
          <Image
            imageUrl={image.urls.thumb}
            userAvatar={image.user.profile_image.small}
            userName={image.user.name}
            imageId={image.id}
          />
        ))}
      </div>
      {imageList.length === 0 && !loading && (
        <h2>Nothing to Show, Please search</h2>
      )}
      {hasMoreImages && !loading && (
        <div style={{ margin: '50px auto', width: 'fit-content' }}>
          <div className="btn" onClick={onSearch()}>
            Load More
          </div>
        </div>
      )}
      {loading && (
        <div style={{ margin: '0 auto', width: 'fit-content' }}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Home;
