import React, { Component } from 'react';
import TaskItem from './TaskItem';

export default class TaskList extends Component {
    // lấy id để thay đổi truyền từ component TaskItem
    constructor() {
        super();
        this.state = {
            fillterName: "",
            fillterStatus: -1 // All -1 Complete 0 InComplete 1
        }
    }
    //================================================Fillter Form==============================
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.props.fillterTable(
            name === "fillterName" ? value : this.state.fillterName,
            name === "fillterStatus" ? value : this.state.fillterStatus
        )
        this.setState({
            [name]: value
        })
        console.log(this.state.fillterStatus)
    }
    onChangeStatus = (id) => {
        this.props.onChangeStatus(id);
    }
    // lấy id từ component TaskItem chuyển đến Main
    //=================================================Delete===================================
    deleteTaskItem = (id) => {
        this.props.deleteTaskItem(id);
    }
    // lấy dữ liệu thông qua props truyền từ component Main , tại đây chúng ta sẽ nhận và phân phát 
    // thông qua props cho component TaskItem.
    //==========================================AddWork=========================================
    addDataTaskItem = () => {       
        var dataDownTaskItem = this.props.tasks.map((task, stt) => {
            let id = task.id;
            return (
                <TaskItem
                    id={id}
                    stt={stt + 1}
                    key={id}
                    name={task.name}
                    status={task.status}
                    onChangeStatus={this.onChangeStatus}
                    deleteTaskItem={this.deleteTaskItem}
                    updateTaskItem={this.props.updateTaskItem}
                />
            );
        })
        return dataDownTaskItem;
    }
    render() {
        return (
            <table className="table table-bordered table-hover" style={{ marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input
                                onChange={this.onChange}
                                type="text"
                                className="form-control"
                                name="fillterName"
                                value={this.state.fillterName}
                            />
                        </td>
                        <td>
                            <select
                                value={this.state.fillterStatus}
                                onChange={this.onChange}
                                name="fillterStatus"
                                className="form-control">
                                <option value="-1">All</option>
                                <option value="0">Complete</option>
                                <option value="1">InComplete</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {/*các danh sách công việc*/}
                    {this.addDataTaskItem()}
                </tbody>
            </table>
        );
    }
}
