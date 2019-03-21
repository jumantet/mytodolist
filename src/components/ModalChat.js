import React from "react";
import Modal from "react-modal";
import { animateScroll } from "react-scroll";

const customStyles = {
  content: {
    top: "0%",
    right: "0%",
    left: "auto",
    bottom: "auto",
    height: "500px",
    minWidth: "400px",
    maxWidth: "400px",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "var(--background-color)",
    border: "solid 5px var(--main-font-color)",
    overlfow: "scroll"
  },

  overlay: {
    backgroundColor: "none"
  }
};

class ModalChat extends React.Component {
  state = {
    message: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmitMessage = event => {
    event.preventDefault();
    let message = this.state.message;
    this.props.handleSendMessage(message);
  };

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "containerElement"
    });
  }

  shouldComponentUpdate() {
    if (this.props.isOpen === true) {
      this.scrollToBottom();
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
          integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
          crossOrigin="anonymous"
        />
        <Modal
          onRequestClose={this.props.onRequestClose}
          ariaHideApp={false}
          isOpen={this.props.isOpen}
          closeTimeoutMS={0}
          style={customStyles}
          shouldCloseOnEsc={true}
          contentLabel="Supprimer une tâche"
        >
          <div style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <i
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={this.props.onRequestClose}
                className="fas fa-times"
              />
            </div>
            <h2
              style={{
                color: "white",
                borderBottom: "solid 1px #dcdcdc",
                paddingBottom: "10px"
              }}
            >
              Discussions
            </h2>
            <div
              id="containerElement"
              style={{
                display: "flex",
                height: "300px",
                width: "400px",
                overflow: "hidden",
                overflowY: "scroll",
                justifyContent: "center",
                borderRadius: "5px",
                border: "solid 2px var(--main-font-color)",
                backgroundColor: "#dcdcdcad",
                marginBottom: "10px"
              }}
            >
              <ul
                style={{
                  width: "80%"
                  //   display: "flex",
                  //   height: "200px",
                  //   flexDirection: "column",
                  //   overflow: "hidden",
                  //   overflowY: "scroll",
                  //   listStyle: "none",
                  //   padding: "10px",
                  //   borderRadius: "5px",
                  //   backgroundColor: "var(--category-background-color)"
                }}
              >
                {this.props.chatMessages.length > 0
                  ? this.props.chatMessages.map((message, index) => {
                      if (message.who.name === this.props.userName) {
                        return (
                          <li
                            key={message._id}
                            style={{
                              marginBottom: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <p style={{ fontSize: "10px" }}>
                              {message.date.split(" ")[0]} à{" "}
                              {message.date.split(" ")[1].slice(0, -3)}
                            </p>
                            <div className="myMessages" key={index}>
                              {message.who.pictures ? (
                                <img
                                  src={message.who.pictures}
                                  alt="profilpic"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    marginRight: "10px"
                                  }}
                                />
                              ) : null}
                              {message.message}
                            </div>
                          </li>
                        );
                      } else {
                        return (
                          <li
                            key={message._id}
                            style={{
                              marginBottom: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <div className="chatMessages" key={index}>
                              {message.message}
                              {message.who.pictures ? (
                                <img
                                  src={message.who.pictures}
                                  alt="profilpic"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    marginRight: "10px"
                                  }}
                                />
                              ) : null}
                            </div>
                            <p style={{ fontSize: "10px" }}>
                              {message.date.split(" ")[0]} à{" "}
                              {message.date.split(" ")[1].slice(0, -3)}
                            </p>
                          </li>
                        );
                      }
                    })
                  : null}
              </ul>
            </div>

            <div>
              <form
                onSubmit={this.handleSubmitMessage}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <textarea
                    type="text"
                    name="message"
                    placeholder="Entrez votre message ici"
                    style={{
                      minHeight: "50px",
                      width: "400px",
                      maxWidth: "400px",
                      borderRadius: "5px",
                      border: "solid 2px var(--main-font-color)",
                      padding: "5px",
                      resize: "none"
                    }}
                    value={this.state.nameTask}
                    onChange={this.handleChange}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <button
                      type="submit"
                      value="Submit"
                      className="addTask"
                      style={{
                        width: "100px",
                        fontSize: "12px",
                        marginLeft: "10px"
                      }}
                    >
                      ENVOYER
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default ModalChat;
