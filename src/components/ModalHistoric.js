import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "0%",
    right: "0%",
    left: "auto",
    bottom: "auto",
    height: "500px",
    maxWidth: "500px",
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

class ModalHistoric extends React.Component {
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
              Historique des tâches
            </h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {this.props.messages.length > 0
                ? this.props.messages.map((message, index) => {
                    return (
                      <li className="messages" key={index}>
                        {message}
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        </Modal>
      </>
    );
  }
}

export default ModalHistoric;
