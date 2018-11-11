
import React, { Component } from 'react';
// eslint-disable-next-line
import VenueList  from './VenueList';

export default class SideBar extends Component {
    render() {
        return (
            <div className="sideBar">
                <input type={"search"} id={"search"} placeholder={"Filter venues"}/>
                <VenueList {...this.props} handleLsitItemClick={this.props.handleLsitItemClick}/>
                </div>
        )
    }
}