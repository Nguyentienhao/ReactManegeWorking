import React, { Component } from 'react';

export default class Sort extends Component {

    onClick = (sortByName, sortByValue) => {
        this.props.onSort(sortByName, sortByValue);
    }
    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sort <span className="fa fa-caret-square-o-down ml-5"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onClick('name', 1)} >
                            <a role="button"
                                className={
                                    (this.props.sortByName === 'name' && this.props.sortByValue === 1) ? 'sortSelected' : ''}

                            >
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Name A-Z
                                </span>
                            </a>
                        </li>
                        <li onClick={() => this.onClick('name', -1)} >
                            <a
                                className={
                                    (this.props.sortByName === 'name' && this.props.sortByValue === -1) ? 'sortSelected' : ''}
                                role="button">
                                <span className="fa fa-sort-alpha-desc pr-5">
                                    Name Z-A
                                </span>
                            </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick={() => this.onClick('status', 1)}><a
                            className={
                                (this.props.sortByName === 'status' && this.props.sortByValue === 1) ? 'sortSelected' : ''}
                            role="button">Status Complete</a></li>
                        <li onClick={() => this.onClick('status', -1)} ><a
                            className={
                                (this.props.sortByName === 'status' && this.props.sortByValue === -1) ? 'sortSelected' : ''}
                            role="button">Status InComplete</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}
