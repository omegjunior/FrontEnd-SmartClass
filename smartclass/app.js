const baseURL =
  "https://ec2-52-88-113-139.us-west-2.compute.amazonaws.com:8443";

window.onload = function () {
  const token = localStorage.getItem("token");
  if (token) {
    if (window.location.pathname !== "/room.html") {
      hideForms(); // Hide signup and login forms
    }
    if (window.location.pathname === "/room.html" && window.location.search) {
      // Get parameters from URL
      const params = new URLSearchParams(window.location.search);
      const roomParam = params.get("room");

      if (roomParam) {
        // Call a function to handle the presence of parameters
        handleRoomParameters(roomParam);
      } else {
        // Redirect if parameters are missing
        window.location.href = "index.html";
      }
    }
  } else {
    // Check if pathname is room.html and if parameters exist
    if (window.location.pathname === "/room.html" && window.location.search) {
      // Get parameters from URL
      const params = new URLSearchParams(window.location.search);
      const roomParam = params.get("room");

      if (roomParam) {
        // Call a function to handle the presence of parameters
        handleRoomParameters(roomParam);
      } else {
        // Redirect if parameters are missing
        window.location.href = "index.html";
      }
    } else {
      if (window.location.pathname !== "/index.html") {
        window.location.href = "index.html"; // Redirect to index page
      }
    }
  }
};

//check if meet exist
function handleRoomParameters(room) {
  var result = false;
  axios
    .get(`${baseURL}/api/user`)
    .then((response) => {
      response.data.data.forEach((person) => {
        person.classrooms.forEach((classroom) => {
          if (classroom.link === room) {
            result = true;
          }
        });
      });
      if (result) {
      } else {
        window.location.href = "meetError.html";
      }
    })
    .catch((error) => {
      console.error(error);
      alert(error?.response?.data?.message);
    });
}

function hideForms() {
  document.getElementById("register").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("acc").classList.remove("d-none");
  document.getElementById("acc").classList.add("d-flex");
  document
    .getElementById("forms")
    .style.setProperty("display", "none", "important");

  //   document.getElementById("loginForm").style.display = "none";
}

function signup() {
  var firstName = document.getElementById("signupfirstName").value;
  var lastName = document.getElementById("signuplastName").value;
  var userName = document.getElementById("signupuserName").value;
  var email = document.getElementById("signupemail").value;
  var password = document.getElementById("signuppassword").value;

  var userData = {
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    email: email,
    password: password,
    role: "PROFESSOR",
  };

  axios
    .post(`${baseURL}/api/user`, userData)
    .then((response) => {
      alert("Vous avez cree un compte avec succes!");
    })
    .catch((error) => {
      console.error(error);
      //alert(error?.response?.data?.message);
    });
}

function login() {
  var usernameOrEmail = document.getElementById("loginusernameOrEmail").value;
  var password = document.getElementById("loginpassword").value;

  var loginData = {
    usernameOrEmail: usernameOrEmail,
    password: password,
  };

  axios
    .post(`${baseURL}/api/auth/login`, loginData)
    .then((response) => {
      const token = response.data.data.jwtToken;
      const user = response.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      document.getElementById("register").style.display = "none";
      document.getElementById("login").style.display = "none";
      document.getElementById("exampleModal").style.display = "none";
      window.location.reload();
      // Load Dashboard
      //loadDashboard();
    })
    .catch((error) => {
      console.error(error?.response?.data?.message);
      alert(error?.response?.data?.message);
    });
}

function logout() {
  // Remove token and user information from local storage
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  document.getElementById("signupForm").style.display = "block";
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("dashboardContainer").innerHTML = ""; // Clear Dashboard
}
function loadDashboard() {
  // Retrieve user information from local storage
  // Retrieve user information from local storage
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);

  // Load dashboard content
  axios
    .get("dashboard.html")
    .then((response) => {
      document.getElementById("dashboardContainer").innerHTML = response.data;
      document.getElementById("dashboard").style.display = "block";
      // Check if userDetails element exists before setting innerHTML
      const userDetailsElement = document.getElementById("userDetails");
      console.log(userDetailsElement);
      if (userDetailsElement) {
        const username = user.username; // Adjust this based on your user object structure

        // Display user information on the dashboard
        userDetailsElement.innerHTML = `
     <p>Welcome, ${username}!</p>   `;
      } else {
        console.error("Element with ID 'userDetails' not found.");
      }
    })
    .catch((error) => {
      console.error("Error loading dashboard:", error);
    });
}

function redirectToLobby() {
  window.location.href = "/lobby.html";
}
