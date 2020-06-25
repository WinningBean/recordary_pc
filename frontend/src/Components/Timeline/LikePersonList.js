import React, { useState, useRef, useEffect } from 'react';
import '../Other/SearchField.css';

import Dialog from '@material-ui/core/Dialog';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LikePersonList = (props) => {
  const [postLikeList, setPostLikeList] = useState([]);

  const getPostLikeList = async () => {
    const data = (await axios.get(`/post/${props.postCd}/likeUser`)).data;
    console.log(data);
    if (data.length > 0) {
      setPostLikeList(data);
    } else return;
  };

  useEffect(() => {
    if (props.postCd !== undefined) {
      getPostLikeList();
      console.log(props);
    }
  }, []);

  return (
    <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }} onClose={() => props.onCancel()}>
      <div className='searchField-result'>
        <div className='searchField-title'>
          <div className='likeTitle'>좋아요</div>
        </div>
        <hr />
        <div className='searchField-result-list'>
          <ul>
            {postLikeList.map((value) => (
              <Link to={`/${value.userId}`}>
                <li key={value.userCd}>
                  <div className='like_list'>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                        width: '300px',
                      }}
                    >
                      <img
                        alt='friend-img'
                        style={{
                          marginRight: '10px',
                          borderRadius: '50%',
                          height: '40px',
                          width: '40px',
                        }}
                        src={value.userPic}
                      />
                      {`${value.userId}(${value.userNm})`}
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </Dialog>
  );
};

export default LikePersonList;
