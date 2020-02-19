import React from 'react';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';

const StyledBadge = withStyles(theme => ({
    badge: {
        right: 5,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

export default function NotifyIconCount() {
    return (
        <StyledBadge badgeContent={4} color="secondary">
            <NotificationsIcon  style={{fontSize : 38, color: 'white' }}/>
        </StyledBadge>
    );
}
