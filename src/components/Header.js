import React from "react";

class Header extends React.Component {
  render() {
    return (
      <>
        <link
          href="https://fonts.googleapis.com/css?family=Lobster+Two"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
          integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Libre+Franklin:400,500"
          rel="stylesheet"
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "50px",
            borderBottom: "solid 1px #dcdcdc",
            width: "100%"
          }}
        >
          <p
            style={{
              fontFamily: "Lobster Two",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold"
            }}
          >
            MyTodolist
          </p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <i
              onClick={this.props.handleOpenModalChat}
              style={{
                color: "white",
                fontSize: "30px",
                cursor: "pointer"
              }}
              className="fas fa-comments"
            />
            {this.props.messageNotifications > 0 ? (
              <p
                style={{
                  padding: "1px 5px",
                  borderRadius: "5px",
                  backgroundColor: "red",
                  color: "white",
                  fontWeight: "bold"
                }}
              >
                {this.props.messageNotifications}
              </p>
            ) : null}
            <i
              onClick={this.props.handleOpenModalHistoric}
              style={{
                color: "white",
                fontSize: "30px",
                marginLeft: "10px",
                cursor: "pointer"
              }}
              className="fas fa-history"
            />
            {this.props.notifications > 0 ? (
              <p
                style={{
                  padding: "1px 5px",
                  borderRadius: "5px",
                  backgroundColor: "red",
                  color: "white",
                  fontWeight: "bold"
                }}
              >
                {this.props.notifications}
              </p>
            ) : null}
            <div
              style={{
                display: "flex",
                marginLeft: "15px",
                paddingLeft: "15px",
                borderLeft: "solid 1px #dcdcdc"
              }}
            >
              <img
                src={this.props.picture}
                alt="profilpic"
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />
              <p
                style={{
                  fontFamily: "Libre Franklin",
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginRight: "10px",
                  color: "white"
                }}
              >
                {this.props.userName}
              </p>
              <button
                onClick={this.props.disconnect}
                style={{ width: "100px", fontSize: "12px" }}
                className="addTask"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
