import React from "react";
import Cookies from "js-cookie";
import FacebookLogin from "react-facebook-login";
import axios from "axios";

const url = "https://mytodolist-api.herokuapp.com/";
class Home extends React.Component {
  render() {
    const responseFacebook = async response => {
      console.log(response);
      try {
        if (response) {
          let firstName = response.name.split(" ")[0];
          let obj = {
            name: firstName,
            idFacebook: response.id,
            pictures: response.picture.data.url
          };
          const responseServer = await axios.post(url + "user/login", obj);

          if (responseServer) {
            await Cookies.set("token", responseServer.data.token);
            await Cookies.set("username", responseServer.data.name);
            await Cookies.set("picture", responseServer.data.pictures);
            await this.props.history.push("/todolist");
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1
              style={{
                fontFamily: "Lobster Two",
                color: "white",
                fontSize: "50px",
                marginRight: "20px"
              }}
            >
              Bienvenue sur myTodolist
            </h1>
            <i
              style={{
                color: "white",
                fontSize: "60px",
                cursor: "pointer"
              }}
              className="fas fa-list-ul"
            />
          </div>

          <FacebookLogin
            appId="400491397408405"
            cssClass="btnFacebook"
            style={{ borderRadius: "5px" }}
            icon={
              <i
                className="fab fa-facebook-f"
                style={{ marginRight: "10px", fontSize: "20px" }}
              />
            }
            fields="name,email,picture"
            textButton="Se connecter avec Facebook"
            callback={responseFacebook}
          />
        </div>
      </>
    );
  }
}

export default Home;
