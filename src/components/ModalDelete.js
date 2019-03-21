import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class ModalDelete extends React.Component {
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
          ariaHideApp={false}
          isOpen={this.props.isOpen}
          closeTimeoutMS={0}
          style={customStyles}
          shouldCloseOnEsc={true}
          contentLabel="Supprimer une tâche"
        >
          <h4>Etes-vous sûr de vouloir supprimer cette tâche ?</h4>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              style={{
                display: "flex",
                backgroundColor: "none",
                justifyContent: "center",
                cursor: "pointer",
                textAlign: "center",
                marginRight: "10px"
              }}
              onClick={() =>
                this.props.handleDeleteTask(this.props.draggedTask)
              }
            >
              <i className="fas fa-check" />
            </button>
            <button
              style={{
                fontSize: "30px",
                display: "flex",
                backgroundColor: "none",
                justifyContent: "center",
                cursor: "pointer",
                textAlign: "center"
              }}
              onClick={this.props.onRequestClose}
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </Modal>
      </>
    );
  }
}

export default ModalDelete;
