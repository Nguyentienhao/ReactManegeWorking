import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

export default class Control extends Component {
    constructor(props) {
        super(props);        
    }  
    render() {
        return (
            <div className="row mt-15" style={{ marginTop: "20px" }}>
                <Search  
                    getValueSearch={this.props.getValueSearch}                
                />
                <Sort 
                    onSort={this.props.onSort}
                    sortByName={this.props.sortByName}
                    sortByValue={this.props.sortByValue}
                />
            </div>
        );
    }
}
