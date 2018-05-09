import React, { Component } from 'react';

export default class TaskItem extends Component {

    //=========================================ChangeStatus Work===============
    // đưa id đến cho component Main là ông nội của taskList để cập nhật status.
    onChangeStatus = () => {
        this.props.onChangeStatus(this.props.id);
    }
    //=====================================Delete TaskItem===========================
    // đưa id đến cho component Main là ông nội của taskList để xóa taskItem.
    deleteTaskItem = () => {
        this.props.deleteTaskItem(this.props.id);
    }
    //====================================Update Work in TaskItem=============
    updateTaskItem = () => {
        this.props.updateTaskItem(this.props.id);
    }

    render() {
        let { stt, name, status } = this.props; 
        return (
            <tr>
                <td>{stt}</td>
                <td>{name}</td>
                <td className="text-center">
                    <span
                        ref="valueStatus"
                        onClick={this.onChangeStatus}
                        className={status === true ? 'label label-danger' : 'label label-success'}>
                        {status === true ? "Complete" : "InComplete"}
                    </span>
                </td>
                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={this.updateTaskItem}
                    >
                        <span className="fa fa-pencil mr-5"></span>Update
                    </button>
                    &nbsp;
            <button
                        onClick={this.deleteTaskItem}
                        type="button"
                        className="btn btn-danger">
                        <span className="fa fa-trash mr-5"></span>Remove
            </button>
                </td>
            </tr>
        );
    }
}
