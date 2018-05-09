import React, { Component } from 'react';
import TaskForm from './TaskForm';
import Control from './Control';
import TaskList from './TaskList';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],// id: unique, name, status
            isDisPlayForm: false,
            taskEditing: null,
            fillter: {
                name: '',
                status: -1
            },
            keyWord: '',
            sortByName: 'name',
            sortByValue: 1

        };
    }

    // được gọi khi component được refesh lại lúc này ta sẽ lấy dữ liệu ở localStorage đưa vào Component của chúng ta.
    // JSon.parse: có nghĩa là chúng ta chuyển từ chuỗi sang đối tượng
    componentWillMount() {
        if (localStorage !== null && localStorage.getItem('tasks')) {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({ tasks })
        }
    }
    // Khởi tạo một số ngẫu nhiên
    radomString = () => {
        return Math.random((1 + Math.random()) * 0x100000).toString(16).substring(1);
    }

    // Khởi tạo id ngẫu nhiên
    genarateId = () => {
        return this.radomString() + this.radomString() + "-" + this.radomString() + "-" + this.radomString() + "-" +
            this.radomString() + "-" + this.radomString();
    }

    onToggleForm = () => { // Thêm Task
        if (this.state.isDisPlayForm && this.state.taskEditing !== null) {
            this.setState({
                isDisPlayForm: true,
                taskEditing: null
            })
        } else {
            this.setState({
                isDisPlayForm: !this.state.isDisPlayForm,
                taskEditing: null
            })
        }
    }

    //============================================================OpenForm==================================
    openForm = () => {
        this.setState({
            isDisPlayForm: true
        })
    }
    //=============================================================CloseForm================================
    closeForm = () => {
        this.setState({
            isDisPlayForm: false
        })
    }
    //=============================================================AddWork===================================
    receiveDataFromTaskForm = (data) => {
        console.log(data)
        var tasks = this.state.tasks;
        data.status = data.status === 'false' ? false : true;
        if (data.id === '') {
            data.id = this.genarateId();
            tasks.push(data);
        } else {
            // Editting
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
        this.setState({
            tasks: tasks,
            taskEditing: ''
        })
        console.log(tasks)
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    //====================================================ChangeStatus=======================================
    onChangeStatus = (id) => {
        let index = this.findIndex(id);
        let { tasks } = this.state;
        if (index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({ tasks })
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

    }

    //==================================================getIndex===========================================
    findIndex = (id) => {
        let result = -1;
        this.state.tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        })
        return result;
    }

    //====================================================================Remove==========================
    deleteTaskItem = (id) => {
        let { tasks } = this.state;
        let index = this.findIndex(id);
        if (index !== -1) {
            tasks.splice(index, 1);
            this.setState({ tasks })
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    //========================================================================Search=========================
    // xử lý khi người dùng nhập vào ô search.
    getValueSearch = (keyWord) => {
        this.setState({
            keyWord: keyWord
        })
    }

    //=======================================================================UpdateItems======================
    updateTaskItem = (id) => {
        let { tasks } = this.state;
        let index = this.findIndex(id);
        var taskEditing = tasks[index];

        this.setState({
            taskEditing: taskEditing
        })
        this.openForm();
    }
    //=========================fillter Table==================================================================
    fillterTable = (fillterName, fillterStatus) => {
        fillterStatus = parseInt(fillterStatus);
        this.setState({
            fillter: {
                name: fillterName.toLowerCase(),
                status: fillterStatus
            }
        })
    }
    //===========================================Sort================================
    onSort = (sortByName, sortByValue) => {
        this.setState({
            sortByName: sortByName,
            sortByValue: sortByValue
        })
    }

    render() {
        var {
            isDisPlayForm,
            taskEditing,
            fillter,
            tasks,
            keyWord,
            sortByName,
            sortByValue
        } = this.state;
        //==================================lọc theo tên===============
        if (fillter) {
            if (fillter.name) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(fillter.name) !== -1;
                });
            }
            //==============================Lọc theo trạng thái===========
            tasks = tasks.filter((task) => {
                if (fillter.status === -1) {
                    return task;
                } else {
                    return task.status == (fillter.status === 0 ? true : false);
                }
            })
        }
        //====================== tìm kiếm theo từ khóa=======================
        if (keyWord) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyWord) !== -1;
            })
        }
        //============================Sort=====================================

        if (sortByName === 'name') {
            tasks.sort((task1, task2) => {
                var nameA = task1.name.toUpperCase();
                var nameB = task2.name.toUpperCase();
                if (nameA > nameB) return sortByValue;
                else if (nameA < nameB) return -sortByValue;
                else return 0;
            })
        } else {
            tasks.sort((task1, task2) => {
                console.log(task1.status + "and " + task2.status)
                if (task1.status > task2.status) {
                    console.log("this is complete");
                    return -sortByValue
                }
                else if (task1.status < task2.status) {
                    return sortByValue;
                } else return 0;

            })
        }
        // kiểu tra đóng mở form
        let elmTaskForm = isDisPlayForm ? <TaskForm
            closeForm={this.closeForm}
            addDataToMain={this.receiveDataFromTaskForm}
            taskEditing={taskEditing}
        /> : '';

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Application Manage Work </h1>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        {/*this is TaskForm of us*/}
                        {elmTaskForm}
                    </div>
                    <div
                        className={isDisPlayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" :
                            "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.onToggleForm}
                        >
                            <span className="fa fa-plus mr-5"></span>Add work
                        </button>
                        <Control
                            getValueSearch={this.getValueSearch}
                            onSort={this.onSort}
                            sortByName={sortByName}
                            sortByValue={sortByValue}
                        />
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                {/*đây là table của danh sách công việc*/}
                                <TaskList
                                    onChangeStatus={this.onChangeStatus}
                                    tasks={tasks}
                                    deleteTaskItem={this.deleteTaskItem}
                                    updateTaskItem={this.updateTaskItem}
                                    fillterTable={this.fillterTable}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
