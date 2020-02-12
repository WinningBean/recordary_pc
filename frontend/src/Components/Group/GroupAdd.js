import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';


class GroupAdd extends React.Component {
    render() {
        return (
            <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
                <div>
                    <div>
                        <Button onClick={() => this.props.onCancel()}>취소</Button>
                    </div>
                </div>
            </Dialog>
        );
    }
}




export default GroupAdd;
