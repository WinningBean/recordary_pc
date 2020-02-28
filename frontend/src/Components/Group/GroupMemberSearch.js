import React, { useState } from 'react';
import 'Components/Other/SearchField.css';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import AlertDialog from 'Components/Other/AlertDialog';
import axios from 'axios';
import { Button, Avatar } from '@material-ui/core';


const GroupMemberSearch = (props) => {
    const [input, setInput] = useState('');
    const [alert, setAlert] = useState(null);
    const [list, setList] = useState(null);

    const onSearch = async (insert) => {
        if (insert === '') {
            setAlert(<AlertDialog severity='error' content='아이디를 입력하세요' onAlertClose={() => { setAlert(null) }} />)
            return;
        }
        try{
        const {data} = await axios.get("/user/search", {params : { userSearch : input}});
        console.log(data);
        if(data.searchedCount === 0){
            setAlert(<AlertDialog severity='error' content='검색결과가 없습니다.' onAlertClose={() => { setAlert(null) }} />)
            return;
        }
        setList(data.searedUser);
        }catch(error){
            setAlert(<AlertDialog severity='error' content='에러로인해 검색 실패하였습니다.' onAlertClose={() => { setAlert(null) }} />)
        }
        // const data = [
        //     {
        //         user_id: 'ABCD1234',
        //         user_pic: 'http://placehold.it/40x40',
        //         user_nm: '김길동'
        //     },
        //     {
        //         user_id: 'POIU7894',
        //         user_pic: 'http://placehold.it/40x40',
        //         user_nm: '이길동'
        //     }
        // ]
    }

    return (
        <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }} onClose={() => props.onCancel()} >
            <div className="searchField-result">
                <div className="searchField-title">
                    <InputBase
                        placeholder="아이디를 입력하세요"
                        onChange={(e) => setInput(e.target.value)}
                        style={{ color: '#ffffff' }}
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                onSearch(input);
                            }
                        }}
                    />
                    <IconButton type="submit" aria-label="search" onClick={() => onSearch(input)}>
                        <SearchIcon style={{ color: '#ffffff' }} />
                    </IconButton>
                </div>
                {list === null
                    ? null
                    : (<div style={{maxHeight:'400px'}}>
                                <ul>
                                    {(() => {
                                        return list.map((value) => {
                                            return (
                                                <li key={value.user_id}>
                                                    <Button 
                                                        style={{width:'100%', justifyContent: 'flex-start'}}
                                                        onClick={()=>{
                                                            props.onAdd(value);
                                                        }}
                                                    >
                                                        <Avatar alt={`${value.user_id} img`} src={value.user_pic} />
                                                        &nbsp;&nbsp;&nbsp;
                                                        <span>{value.user_id}</span>
                                                    </Button>
                                                </li>
                                            )
                                        })
                                    })()}
                                </ul>
                    </div>)}
            </div>
            {alert}
        </Dialog>
    );
}

export default GroupMemberSearch;