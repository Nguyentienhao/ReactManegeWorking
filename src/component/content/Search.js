import React, { Component } from 'react';

export default class Search extends Component {
    getValueSearch = () => {
        this.props.getValueSearch(this.refs.search.value);
    }
    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input
                        ref="search"
                        type="text"
                        className="form-control"
                        placeholder="Enter key..." />
                    <span className="input-group-btn">
                        <button
                            onClick={this.getValueSearch}
                            className="btn btn-primary"
                            type="button">
                            <span className="fa fa-search mr-5"></span>Search
                    </button>
                    </span>
                </div>
            </div>
        );
    }
}
