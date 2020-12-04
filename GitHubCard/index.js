import axios from "axios";

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

axios
  .get("https://api.github.com/users/imjeremiah")
  .then((res) => {
    console.log(res);
    const myCard = cardMaker(res);
    cards.appendChild(myCard);
  })
  .catch(err => {
    debugger;
  });

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

let cards = document.querySelector(".cards");

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [ "tetondan", "dustinmyers", "justsml", "luishrd", "bigknell"];


followersArray.forEach(link => {
  axios
  .get(`https://api.github.com/users/` + link)
  .then((res) => {
    console.log(res);
    let newCard = cardMaker(res);
    cards.appendChild(newCard);
  });
});


/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function cardMaker(object) {
  let card = document.createElement("div");
  let image = document.createElement("img");
  let cardInfo = document.createElement("div");
  let name = document.createElement("h3");
  let userName = document.createElement("p");
  let location = document.createElement("p");
  let profile = document.createElement("p");
  let pageLink = document.createElement("a");
  let followers = document.createElement("p");
  let following = document.createElement("p");
  let bio = document.createElement("p");

  image.src = object.data.avatar_url;
  name.textContent = object.data.name;
  userName.textContent = object.data.login;
  location.textContent = `Location: ${object.data.location}`;
  pageLink.href = object.data.html_url;
  profile.textContent = `Profile: \n ${pageLink}`;
  followers.textContent = `Followers: ${object.data.followers}`;
  following.textContent = `Following: ${object.data.following}`;
  bio.textContent = `Bio: ${object.data.bio}`;

  card.classList.add("card");
  cardInfo.classList.add("card-info");
  name.classList.add("name");
  userName.classList.add("username");

  card.appendChild(image);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);
  profile.appendChild(pageLink);

  return card;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
