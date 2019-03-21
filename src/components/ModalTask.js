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
class ModalTask extends React.Component {
  state = {
    nameTask: "",
    startDate: "",
    endDate: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let nameTask = this.state.nameTask;
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;
    this.props.handleAddTask(nameTask, startDate, endDate);
  };
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
          contentLabel="Créer une tâche"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <h2 style={{ color: "var(--main-font-color)" }}>
              Ajout d'une tâche
            </h2>
            <button
              style={{ height: "20px", cursor: "pointer" }}
              onClick={this.props.onRequestClose}
            >
              <i className="fas fa-times" />
            </button>
          </div>
          <form
            onSubmit={this.handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "300px",
                justifyContent: "space-between",
                height: "20px",
                marginBottom: "10px"
              }}
            >
              <p style={{ fontSize: "14px" }}>Nom de la tâche : </p>
              <input
                type="text"
                name="nameTask"
                style={{
                  borderRadius: "5px",
                  border: "solid 1px var(--category-background-color)",
                  padding: "5px"
                }}
                value={this.state.nameTask}
                onChange={this.handleChange}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "300px",
                justifyContent: "space-between",
                height: "20px",
                marginBottom: "10px"
              }}
            >
              <p style={{ fontSize: "14px" }}>Date de démarrage : </p>
              <input
                type="text"
                name="startDate"
                placeholder="JJ/MM/AAAA"
                style={{
                  borderRadius: "5px",
                  border: "solid 1px var(--category-background-color)",
                  padding: "5px"
                }}
                value={this.state.startDate}
                onChange={this.handleChange}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "20px",
                marginBottom: "10px"
              }}
            >
              <p style={{ fontSize: "14px" }}>Date de fin espérée : </p>
              <input
                type="text"
                name="endDate"
                placeholder="JJ/MM/AAAA"
                style={{
                  borderRadius: "5px",
                  border: "solid 1px var(--category-background-color)",
                  padding: "5px"
                }}
                value={this.state.endDate}
                onChange={this.handleChange}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "10px"
              }}
            >
              <button type="submit" value="Submit" className="addTask">
                Ajouter une tâche
              </button>
            </div>
          </form>
        </Modal>
      </>
    );
  }
}

export default ModalTask;
