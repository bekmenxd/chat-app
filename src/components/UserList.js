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
                users: UserStore.getAll().map(u => <ListItem primaryText={u} />)
            })
        });
    }

    render() {
        return(
            <div style={{position: 'fixed', left: 'calc(100% - 200px)', width: '200px', top: '0'}}>
                <List>
                    <Subheader>Connected Users</Subheader>
                </List>
                <Divider/>
                <List>
                    {this.state.users}
                </List>
            </div>
        );
    }
}