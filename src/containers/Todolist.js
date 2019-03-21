import React from "react";
import Header from "../components/Header";
import Cookies from "js-cookie";
import io from "socket.io-client";

import axios from "axios";
import ModalTask from "../components/ModalTask";
import ModalDelete from "../components/ModalDelete";
import ModalHistoric from "../components/ModalHistoric";
import ModalChat from "../components/ModalChat";

// socket.on("message", () => {
//   console.log("new message");
// });

const url = "https://mytodolist-api.herokuapp.com/";
class Todolist extends React.Component {
  state = {
    tasksDone: [],
    tasksDoing: [],
    tasksFuture: [],
    events: [],
    users: [],
    draggedTask: {},
    isModalOpen: false,
    isModalDeleteTaskOpen: false,
    isModalHistoricOpen: false,
    isModalChatOpen: false,
    messages: [],
    chatMessages: [],
    notifications: 0,
    messageNotifications: 0
  };

  handleOpenModal = () => {
    this.setState({ isModalOpen: true });
  };
  handleRequestCloseFunc = () => {
    this.setState({ isModalOpen: false });
  };

  handleOpenModalDelete = () => {
    this.setState({ isModalDeleteTaskOpen: true });
  };

  handleCloseModalDelete = () => {
    this.setState({ isModalDeleteTaskOpen: false });
  };

  handleOpenModalHistoric = async () => {
    this.setState({ isModalHistoricOpen: true });
    await axios.post(url + "events/read", null, {
      headers: {
        authorization: "Bearer " + this.props.token
      }
    });
    this.setState({ notifications: 0 });
    this.componentDidMount();
  };

  handleCloseModalHistoric = () => {
    this.setState({ isModalHistoricOpen: false });
  };

  handleOpenModalChat = async () => {
    this.setState({ isModalChatOpen: true });
    await axios.post(url + "messages/read", null, {
      headers: {
        authorization: "Bearer " + this.props.token
      }
    });
    this.setState({ messageNotifications: 0 });
    this.componentDidMount();
  };

  handleCloseModalChat = () => {
    this.setState({ isModalChatOpen: false });
  };

  handleAddTask = async (nameTask, startDate, endDate) => {
    let tasksFuture = [...this.state.tasksFuture];
    let obj = {
      name: nameTask,
      startDate: startDate,
      endDate: endDate
    };

    const response = await axios.post(url + "create", obj, {
      headers: {
        authorization: "Bearer " + this.props.token
      }
    });
    let task = response.data;
    tasksFuture.push(task);

    this.setState({ tasksFuture: tasksFuture });

    this.componentDidMount();
    this.handleRequestCloseFunc();
  };

  handleDeleteTask = async task => {
    const tasksDone = [...this.state.tasksDone];
    const tasksDoing = [...this.state.tasksDoing];
    const tasksFuture = [...this.state.tasksFuture];

    await axios.post(url + "delete/" + task._id, null, {
      headers: {
        authorization: "Bearer " + this.props.token
      }
    });

    this.setState({
      tasksDoing: tasksDoing.filter(Task => Task._id !== task._id),
      tasksDone: tasksDone.filter(Task => Task._id !== task._id),
      tasksFuture: tasksFuture.filter(Task => Task._id !== task._id),
      draggedTask: {}
    });

    this.handleCloseModalDelete();
    this.componentDidMount();
  };

  handleSendMessage = async message => {
    await axios.post(
      url + "messages",
      { message: message },
      {
        headers: {
          authorization: "Bearer " + this.props.token
        }
      }
    );
  };

  componentDidMount = async () => {
    const socket = io(url);
    socket.on("message", () => {
      this.componentDidMount();
    });

    let tasksFuture = [];
    let tasksDoing = [];
    let tasksDone = [];
    let events = [];
    let messages = [];
    let users = [];
    let chatMessages = [];
    let notifications = 0;
    let messageNotifications = 0;

    const response = await axios.get(url + "tasks/");

    const responseEvent = await axios.get(url + "events/");

    const responseUsers = await axios.get(url + "users");

    const responseChat = await axios.get(url + "messages");

    events = responseEvent.data.events;
    users = responseUsers.data;
    chatMessages = responseChat.data;

    let tasks = response.data.tasks;

    await tasks.map(task => {
      if (task.status === "todo") {
        tasksFuture.push(task);
      } else if (task.status === "doing") {
        tasksDoing.push(task);
      } else if (task.status === "done") {
        tasksDone.push(task);
      }
    });

    events.map(event => {
      if (event.type === "create") {
        messages.push(
          <p style={{ display: "flex", alignItems: "center" }}>
            {event.who.pictures ? (
              <img
                src={event.who.pictures}
                alt="profilpic"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  marginRight: "10px"
                }}
              />
            ) : null}
            {event.who.name} a ajouté la tâche {event.task.name.toUpperCase()}{" "}
            le {event.date}
          </p>
        );
      } else if (event.type === "update") {
        messages.push(
          <p style={{ display: "flex", alignItems: "center" }}>
            {event.who.pictures ? (
              <img
                src={event.who.pictures}
                alt="profilpic"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  marginRight: "10px"
                }}
              />
            ) : null}
            {event.who.name} a déplacé la tâche {event.task.name.toUpperCase()}{" "}
            dans le bloc {event.where.toUpperCase()} le {event.date}
          </p>
        );
      } else if (event.type === "delete") {
        messages.push(
          <p style={{ display: "flex", alignItems: "center" }}>
            {event.who.pictures ? (
              <img
                src={event.who.pictures}
                alt="profilpic"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  marginRight: "10px"
                }}
              />
            ) : null}
            {event.who.name} a supprimé la tâche{" "}
            {event.deletedTask.toUpperCase()} le {event.date}
          </p>
        );
      }
    });

    events.map(event => {
      const found = event.readers.find(x => {
        return x.name === this.props.userName;
      });
      if (!found && event.who.name !== this.props.userName) {
        notifications += 1;
      }
    });

    chatMessages.map(message => {
      const found = message.readers.find(x => {
        return x.name === this.props.userName;
      });
      if (!found && message.who.name !== this.props.userName) {
        messageNotifications += 1;
      }
    });

    this.setState({
      tasksFuture: tasksFuture,
      tasksDoing: tasksDoing,
      tasksDone: tasksDone,
      events: events,
      messages: messages,
      notifications: notifications,
      messageNotifications: messageNotifications,
      chatMessages: chatMessages,
      users: users
    });

    this.scrollToBottom();
  };
  onDrag = (event, task) => {
    event.preventDefault();
    this.setState({
      draggedTask: task
    });
  };

  onDragOver = event => {
    event.preventDefault();
  };
  onDrop = async (event, destination) => {
    event.preventDefault();
    const tasksDone = [...this.state.tasksDone];
    const tasksDoing = [...this.state.tasksDoing];
    const tasksFuture = [...this.state.tasksFuture];
    let draggedTask = this.state.draggedTask;
    let origin;
    if (draggedTask.status === "done") {
      origin = [...this.state.tasksDone];
      if (destination === "doing") {
        draggedTask.status = "doing";
        await axios.post(
          url + "update/" + draggedTask._id,
          {
            where: "doing",
            status: "doing"
          },
          {
            headers: {
              authorization: "Bearer " + this.props.token
            }
          }
        );

        this.setState({
          tasksDoing: [...tasksDoing, draggedTask],
          tasksDone: origin.filter(task => task._id !== draggedTask._id),
          draggedTask: {}
        });
        this.componentDidMount();
      } else if (destination === "todo") {
        draggedTask.status = "todo";
        await axios.post(
          url + "update/" + draggedTask._id,
          {
            where: "todo",
            status: "todo"
          },
          {
            headers: {
              authorization: "Bearer " + this.props.token
            }
          }
        );

        this.setState({
          tasksFuture: [...tasksFuture, draggedTask],
          tasksDone: origin.filter(task => task._id !== draggedTask._id),
          draggedProjet: {}
        });
        this.componentDidMount();
      } else if (destination === "bin") {
        this.handleOpenModalDelete();
      }
    } else if (draggedTask.status === "doing") {
      origin = [...this.state.tasksDoing];
      if (destination === "done") {
        draggedTask.status = "done";
        await axios.post(
          url + "update/" + draggedTask._id,
          {
            where: "done",
            status: "done"
          },
          {
            headers: {
              authorization: "Bearer " + this.props.token
            }
          }
        );
        this.setState({
          tasksDone: [...tasksDone, draggedTask],
          tasksDoing: origin.filter(task => task._id !== draggedTask._id),
          draggedTask: {}
        });
        this.componentDidMount();
      } else if (destination === "todo") {
        draggedTask.status = "todo";
        await axios.post(
          url + "update/" + draggedTask._id,
          {
            where: "todo",
            status: "todo"
          },
          {
            headers: {
              authorization: "Bearer " + this.props.token
            }
          }
        );
        this.setState({
          tasksFuture: [...tasksFuture, draggedTask],
          tasksDoing: origin.filter(task => task._id !== draggedTask._id),
          draggedTask: {}
        });
        this.componentDidMount();
      } else if (destination === "bin") {
        this.handleOpenModalDelete();
      }
    } else if (draggedTask.status === "todo") {
      origin = [...this.state.tasksFuture];
      if (destination === "done") {
        draggedTask.status = "done";
        await axios.post(
          url + "update/" + draggedTask._id,
          {
            where: "done",
            status: "done"
          },
          {
            headers: {
              authorization: "Bearer " + this.props.token
            }
          }
        );
        this.setState({
          tasksDone: [...tasksDone, draggedTask],
          tasksFuture: origin.filter(task => task._id !== draggedTask._id),
          draggedTask: {}
        });
        this.componentDidMount();
      } else if (destination === "doing") {
        draggedTask.status = "doing";
        await axios.post(
          url + "update/" + draggedTask._id,
          {
            where: "doing",
            status: "doing"
          },
          {
            headers: {
              authorization: "Bearer " + this.props.token
            }
          }
        );
        this.setState({
          tasksDoing: [...tasksDoing, draggedTask],
          tasksFuture: origin.filter(task => task._id !== draggedTask._id),
          draggedTask: {}
        });
        this.componentDidMount();
      } else if (destination === "bin") {
        this.handleOpenModalDelete();
      }
    }
  };

  disconnect = async () => {
    await Cookies.remove("token");
    await Cookies.remove("username");
    await Cookies.remove("picture");
    this.props.history.push("/");
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
        id="tasks"
      >
        <link
          href="https://fonts.googleapis.com/css?family=Libre+Franklin:400,500"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
          integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
          crossOrigin="anonymous"
        />

        <Header
          disconnect={this.disconnect}
          users={this.state.users}
          userName={this.props.userName}
          picture={this.props.picture}
          notifications={this.state.notifications}
          messageNotifications={this.state.messageNotifications}
          handleOpenModalChat={this.handleOpenModalChat}
          handleOpenModalHistoric={this.handleOpenModalHistoric}
        />
        <ModalTask
          onRequestClose={this.handleRequestCloseFunc}
          handleAddTask={this.handleAddTask}
          isOpen={this.state.isModalOpen}
        />
        <ModalDelete
          draggedTask={this.state.draggedTask}
          onRequestClose={this.handleCloseModalDelete}
          handleDeleteTask={this.handleDeleteTask}
          isOpen={this.state.isModalDeleteTaskOpen}
        />
        <ModalHistoric
          messages={this.state.messages}
          onRequestClose={this.handleCloseModalHistoric}
          isOpen={this.state.isModalHistoricOpen}
        />
        <ModalChat
          userName={this.props.userName}
          chatMessages={this.state.chatMessages}
          isOpen={this.state.isModalChatOpen}
          handleSendMessage={this.handleSendMessage}
          onRequestClose={this.handleCloseModalChat}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: "10px"
            }}
          >
            <h3>TO DO</h3>
            <div
              style={{
                overflow: "hidden",
                boxSizing: "border-box",
                minHeight: "350px",
                maxHeight: "350px",
                width: "315px",
                borderRadius: "5px",
                marginBottom: "30px"
              }}
            >
              <div
                onDrop={event => this.onDrop(event, "todo")}
                onDragOver={event => this.onDragOver(event)}
                className="todo taskCategory"
              >
                <div
                  style={{
                    paddingTop: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <button className="addTask" onClick={this.handleOpenModal}>
                    Ajouter une tâche
                  </button>
                </div>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {this.state.tasksFuture.length > 0
                    ? this.state.tasksFuture.map((task, index) => {
                        return (
                          <li
                            key={task._id}
                            className="tasks"
                            draggable
                            onDrag={event => this.onDrag(event, task)}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                              }}
                            >
                              <p>{task.name}</p>
                              {task.who.pictures ? (
                                <img
                                  src={task.who.pictures}
                                  alt="profilpic"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%"
                                  }}
                                />
                              ) : null}
                            </div>
                          </li>
                        );
                      })
                    : null}
                </ul>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: "10px"
            }}
          >
            <h3>DOING</h3>
            <div
              style={{
                overflow: "hidden",
                boxSizing: "border-box",
                minHeight: "350px",
                maxHeight: "350px",
                width: "315px",
                borderRadius: "5px",
                marginBottom: "30px"
              }}
            >
              <div
                onDrop={event => this.onDrop(event, "doing")}
                onDragOver={event => this.onDragOver(event)}
                className="doing taskCategory"
              >
                <div
                  style={{
                    paddingTop: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                />
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {this.state.tasksDoing.length > 0
                    ? this.state.tasksDoing.map((task, index) => {
                        return (
                          <li
                            key={task._id}
                            draggable
                            className="tasks"
                            onDrag={event => this.onDrag(event, task)}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                              }}
                            >
                              <p>{task.name}</p>
                              {task.who.pictures ? (
                                <img
                                  src={task.who.pictures}
                                  alt="profilpic"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%"
                                  }}
                                />
                              ) : null}
                            </div>
                          </li>
                        );
                      })
                    : null}
                </ul>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: "10px"
            }}
          >
            <h3>DONE</h3>
            <div
              style={{
                overflow: "hidden",
                boxSizing: "border-box",
                minHeight: "350px",
                maxHeight: "350px",
                width: "315px",
                borderRadius: "5px",
                marginBottom: "30px"
              }}
            >
              <div
                onDrop={event => this.onDrop(event, "done")}
                onDragOver={event => this.onDragOver(event)}
                className="finished taskCategory"
              >
                <div
                  style={{
                    paddingTop: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                />
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {this.state.tasksDone.length > 0
                    ? this.state.tasksDone.map((task, index) => {
                        return (
                          <li
                            draggable
                            className="tasks"
                            onDrag={event => this.onDrag(event, task)}
                            key={task._id}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                              }}
                            >
                              <p>{task.name}</p>
                              {task.who.pictures ? (
                                <img
                                  src={task.who.pictures}
                                  alt="profilpic"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%"
                                  }}
                                />
                              ) : null}
                            </div>
                          </li>
                        );
                      })
                    : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          onDrop={event => this.onDrop(event, "bin")}
          onDragOver={event => this.onDragOver(event)}
          className="bin"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <i className="far fa-times-circle" />
          <p style={{ fontWeight: "bold", color: "white", fontSize: "16px" }}>
            Supprimer une tâche
          </p>
        </div>
      </div>
    );
  }
}

export default Todolist;
