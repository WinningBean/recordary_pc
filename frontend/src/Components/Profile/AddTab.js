import React, { useState } from 'react';

import AlertDialog from '../Other/AlertDialog';
import Snackbar from '../UI/Snackbar';

import { Dialog, DialogActions, Button, TextField } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';

import axios from 'axios';

const ColorButton = styled(Button)({
  minWidth: '60px',
  minHeight: '30px',
});

const AddTab = ({ onClose, userCd, onSuccess }) => {
  const [isClickColor, setIsClickColor] = useState(false);
  const [alert, setAlert] = useState(null);
  const [tabNm, setTabNm] = useState('');
  const [color, setColor] = useState({
    r: 255,
    g: 197,
    b: 0,
  });
  return (
    <Dialog open onClose={onClose}>
      <div style={{ padding: '8px 10px' }}>
        <div
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '12px',
            borderBottom: '1px solid #eee',
            padding: '8px 0',
          }}
        >
          일정 탭 추가
        </div>
        <div>
          <TextField label='탭 이름' style={{ paddingBottom: '8px' }} onChange={(e) => setTabNm(e.target.value)} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '40px',
              alignItems: 'center',
              paddingBottom: '8px',
            }}
          >
            <div style={{ marginRight: '10px', fontWeight: 'bold', fontSize: '16px' }}>일정 색</div>
            <ColorButton
              onClick={() => setIsClickColor(true)}
              style={{ backgroundColor: `rgb(${color.r},${color.g},${color.b})` }}
            />
          </div>
          <div style={{ color: '#aaa', width: '200px' }}>
            Tip. 일정 탭은 사용자의 일정을 분류하기 위한 용도이며 다른사람은 볼수없습니다.
          </div>
        </div>
      </div>
      <DialogActions>
        <Button
          onClick={async () => {
            setAlert(<Snackbar severit='info' content='데이터 요청중...' onClose={() => setAlert(null)} />);
            try {
              const { data } = await axios.post('/tab/create', {
                userCd: userCd,
                tabCol: `rgb(${color.r},${color.g},${color.b})`,
                tabNm: tabNm,
              });
              onSuccess({ tabCd: data, tabCol: `rgb(${color.r},${color.g},${color.b})`, tabNm: tabNm });
            } catch (error) {
              setAlert(<AlertDialog severity='error' content={error} onAlertClose={() => setAlert(null)} />);
            }
          }}
        >
          생성
        </Button>
        <Button onClick={() => onClose()}>취소</Button>
      </DialogActions>
      {isClickColor ? (
        <Dialog open onClose={() => setIsClickColor(false)}>
          <div>
            <ChromePicker disableAlpha color={color} onChange={(color) => setColor(color.rgb)} />
          </div>
        </Dialog>
      ) : null}
      {alert}
    </Dialog>
  );
};

export default AddTab;
