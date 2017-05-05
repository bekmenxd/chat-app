import React, { Component } from 'react';
import { List, ListItem, Divider, Subheader } from 'material-ui';
import UserStore from '../data/UserStore.js';

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: ''
        }
    }
    componentWillMount() {
        UserStore.on('change', () => {
            this.setState({
                users: UserStore.getAll().map(u => <ListItem primaryText={u.name} />)
            })
        });
    }

    render() {
        return(
            <div style={{position: 'fixed', left: 'calc(100% - 250px)', width: '250px', top: '0', borderLeft: '1px lightgrey solid', height: '100%'}}>
                <List style={{backgroundColor: 'rgb(232, 232, 232)'}}>
                    <Subheader style={{height: '81px', lineHeight: '125px', fontSize: '20px'}}>Connected Users</Subheader>
                </List>
                <Divider/>
                <List>
                    {this.state.users}
                </List>
            </div>
        );
    }
}