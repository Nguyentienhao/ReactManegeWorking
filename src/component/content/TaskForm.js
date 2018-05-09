import React, { Component } from 'react';

export default class TaskForm extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            name: "",
            status: true
        }
    }
    //=======================================================Save Work======================================
    onHandleChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.type === "checkbox" ? target.checked : target.value;
        // console.log(value);
        // console.log(target.checked)
        this.setState({
            [name]: value
        });
    }

    onHandleSubmit = (event) => {
        event.preventDefault();
        // console.log(this.state.status)
        // let status = this.state.status == "false" ? false : true;
        // this.setState({status:status})
        // console.log(status)
        this.props.addDataToMain(this.state);
        this.resetState();
        this.props.closeForm();
    }
    resetState = () => {
        this.setState({
            id: '',
            name: '',
            status: true
        })
    }
    //=========================================================Update=======================================
    componentWillMount() {
        if (this.props.taskEditing) {
            this.setState({
                id: this.props.taskEditing.id,
                name: this.props.taskEditing.name,
                status: this.props.taskEditing.status
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.taskEditing) {
            this.setState({
                id: nextProps.taskEditing.id,
                name: nextProps.taskEditing.name,
                status: nextProps.taskEditing.status
            })
        } else if (nextProps && nextProps.taskEditing === null) {
            this.resetState();
        }
    }
    // // xử lý khi có sự thay đổi của form

    render() {
        // chúng ta sẽ dựa vào id để phân biệt khi nào cập nhật và thêm.
        var { id } = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{id !== '' ? "Update Work" : "Add Work"}
                        <span
                            className="fa fa-times-circle text-right ml-150"
                            onClick={this.props.closeForm}
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onHandleSubmit} >
                        <div className="form-group">
                            <label>Name Work: </label>
                            <input
                                name="name"
                                ref="nameWork"
                                value={this.state.name}
                                onChange={this.onHandleChange}
                                type="text"
                                className="form-control" />
                        </div>
                        <label>Status:</label>
                        <select
                            name="status"
                            ref="statusWork"
                            value={this.state.status}
                            onChange={this.onHandleChange}
                            className="form-control"
                            required="required">
                            <option value={true}>Complete</option>
                            <option value={false}>InComplete</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn btn-warning"
                            >
                                <span className="fa fa-plus mr-5"></span>Save
                            </button>&nbsp;
                                <button
                                type="reset"
                                className="btn btn-danger"
                                onClick={this.resetState}
                            >
                                <span className="fa fa-close mr-5"></span>Cancel
                                </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
