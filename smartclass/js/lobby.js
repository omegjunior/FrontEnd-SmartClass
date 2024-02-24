let form = document.getElementById("lobby__form");

let displayName = sessionStorage.getItem("display_name");
if (displayName) {
  form.name.value = displayName;
}
function generateUID(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function createClassroom(link) {
  // Get classroom name from the form
  const className = document.getElementById("nomClasse").value;

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);

  // Data for creating a classroom
  const classroomData = {
    link: link,
    name: className,
    userId: user.id, // Replace with actual user ID
  };

  console.log(classroomData);
  console.log(user.jwtToken);
  // Make a POST request to your backend API to create the classroom
  axios
    .post(`${baseURL}/api/classroom`, classroomData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.jwtToken}`,
      },
    })
    .then((response) => {
      // Handle successful creation
      //alert("Classe creee avec  success!");

      if (response.status == 200) {
        const userString = localStorage.getItem("user");
        const user = JSON.parse(userString);

        sessionStorage.setItem("display_name", user.username);
        let inviteCode = link;

        if (!inviteCode) {
          inviteCode = String(Math.floor(Math.random() * 10000));
        }
        window.location = `room.html?room=${inviteCode}`;
      }
    })
    .catch((error) => {
      // Handle error
      console.error("Error creating classroom:", error);
      alert("Erreur lors de la  creation de la classe. Ressayer.");
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Generate a random 8-character UID for the link
  const link = generateUID(8);

  createClassroom(link);
});
