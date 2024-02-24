let displayName = sessionStorage.getItem("display_name");
console.log("Display", displayName);
let user3 = localStorage.getItem("user");
const userw = JSON.parse(user3);

if (!displayName) {
  if (user) {
    sessionStorage.setItem("display_name", userw.username);
  }
}

// Fonction pour appeler l'API et ajouter les éléments à la liste des publications récentes
function fetchRecentPosts() {
  axios
    .get(`${baseURL}/api/user`)
    .then((response) => {
      let classes = [];
      console.log(response.data.data);
      // Vérifie si l'ID existe dans les données
      let idFound = false;

      const userString2 = localStorage.getItem("user");
      const user2 = JSON.parse(userString2);

      response.data.data.forEach((person) => {
        if (person.id === user2.id) {
          idFound = true;
          classes = person.classrooms;
        }
      });

      // Sélectionne l'élément parent où tu veux ajouter les éléments
      const recentPostItems = document.querySelector(".recent-post-items");

      // Parcours les données reçues de l'API
      classes.forEach((post) => {
        // Crée les éléments HTML pour chaque publication récente
        const postElement = document.createElement("div");
        postElement.classList.add("recent-post-signle");

        const linkElement = document.createElement("a");
        linkElement.href =
          window.location.origin + "/room.html?room=" + post.link;

        const flexElement = document.createElement("div");
        flexElement.classList.add("recent-post-flex");

        const ctnElement = document.createElement("div");
        ctnElement.classList.add("recent-post-it-ctn");

        const titleElement = document.createElement("h2");
        titleElement.textContent = post.name;

        const codeElement = document.createElement("p");
        codeElement.textContent = "Code: " + post.link;

        // Assemble les éléments HTML
        ctnElement.appendChild(titleElement);
        ctnElement.appendChild(codeElement);
        flexElement.appendChild(ctnElement);
        linkElement.appendChild(flexElement);
        postElement.appendChild(linkElement);

        // Ajoute l'élément à la liste des publications récentes
        recentPostItems.appendChild(postElement);
      });
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données:", error);
    });
}

// Appelle la fonction pour récupérer les publications récentes au chargement de la page
window.onload = fetchRecentPosts;
