import React from 'react';
import './PostAppend.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

class PostShare extends React.Component {
  render() {
    return (
      <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
        <div className='Post-Share'>
          <div className='Choose-Upload-buttons'>
            <Button onClick={() => this.props.onCancel()}>취소</Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default PostShare;
