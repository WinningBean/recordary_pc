import React, { useState, useEffect } from 'react';
import './group.css';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import GroupMemberSearch from 'Components/Group/GroupMemberSearch';
import AlertDialog from 'Components/Other/AlertDialog';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    content: {
        display: 'flex',
        flexDirection: 'column'
    },
    marginBottom: {
        marginBottom: '10px'
    },
    chip: {
        marginBottom: '4px',
        marginRight: '4px'
    }
}));

const GroupApply = props => {
    const classes = useStyles();
    const [dialog, setDialog] = useState(null);

    const data = props.data;
    const [info, setInfo] = useState(props.info);

    return (
        <div className='dialog-wrap'>
            <DialogContent className={classes.content}>
                <div className={classes.marginBottom}>
                    <span>그룹장</span>
                    &nbsp;&nbsp;
                    <div>
                        <Chip
                            avatar={
                                <Avatar
                                    alt={`${info.user_id} img`}
                                    src={info.user_pic}
                                />
                            }
                            className={classes.chip}
                            label={info.user_nm}
                            style={{
                                backgroundColor: 'rgba(20, 81, 51, 0.8)',
                                color: '#ffffff'
                            }}
                        />
                    </div>
                </div>
                <div>
                    <span>그룹멤버</span>
                    &nbsp;&nbsp;
                    <div>
                        {(() => {
                            return info.group_member.map((value, index) => {
                                return (
                                    <Chip
                                        avatar={
                                            <Avatar
                                                alt={`${value.user_id} img`}
                                                src={value.user_pic}
                                            />
                                        }
                                        className={classes.chip}
                                        label={value.user_nm}
                                        clickable
                                        variant='outlined'
                                        onDelete={() => {
                                            setDialog(
                                                <AlertDialog
                                                    severity='success'
                                                    content='정말로 삭제하시겠습니까'
                                                    onAlertClose={() =>
                                                        setDialog(null)
                                                    }
                                                    onAlertSubmit={async () => {
                                                        try {
                                                            const form = new FormData();
                                                            form.append('group_cd',2);
                                                            form.append('user_id','ffff3311');
                                                                                //     .group.group_cd,
                                                                                // value.user_id
                                                            const isDelete = (
                                                                await axios.post(
                                                                    '/groupMember/delete',
                                                                    form
                                                                )
                                                            ).data.isDelete;
                                                            if (
                                                                isDelete ===
                                                                false
                                                            ) {
                                                                setDialog(
                                                                    <AlertDialog
                                                                        severity='error'
                                                                        content='그룹 멤버 삭제에 실패하였습니다'
                                                                        onAlertClose={() =>
                                                                            setDialog(
                                                                                null
                                                                            )
                                                                        }
                                                                    />
                                                                );
                                                                return;
                                                            }

                                                            const k = JSON.parse(JSON.stringify(info.group_member));
                                                            k.splice(index, 1)
                                                            setInfo({
                                                                ...info,
                                                                group_member: k
                                                            });
                                                            setDialog(null);
                                                        } catch (error) {
                                                            setDialog(
                                                                <AlertDialog
                                                                    severity='error'
                                                                    content='서버 에러로 인해 그룹 멤버 삭제에 실패하였습니다'
                                                                    onAlertClose={() =>
                                                                        setDialog(
                                                                            null
                                                                        )
                                                                    }
                                                                />
                                                            );
                                                        }
                                                    }}
                                                />
                                            );
                                        }}
                                    />
                                );
                            });
                        })()}
                        <Chip
                            className={classes.chip}
                            icon={<AddIcon />}
                            label='ADD'
                            clickable
                            variant='outlined'
                            onClick={() => {
                                setDialog(
                                    <GroupMemberSearch
                                        onCancel={() => setDialog(false)}
                                        onAdd={value => {
                                            setInfo({
                                                ...info,
                                                group_member: info.group_member.concat(
                                                    {
                                                        user_id: value.user_id,
                                                        user_nm: value.user_nm,
                                                        user_pic: value.user_pic
                                                    }
                                                )
                                            });
                                            setDialog(false);
                                        }}
                                    />
                                );
                            }}
                            // onClick={async () => {
                            //     await axios.post('/group/memberDelete',
                            //         {
                            //             params: {
                            //                 group_cd: data.group.group_cd,
                            //                 user_cd: value.user_cd
                            //             }
                            //         })
                            // }}
                        />
                    </div>
                </div>
            </DialogContent>
            {dialog}
        </div>
    );
};

export default GroupApply;
