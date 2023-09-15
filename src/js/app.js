import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the url of the image that will used as background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "left", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastname: null,
        role: null,
        country: null,
        city: null
    }
 */
function redirectToSocialMediaProfile(socialMedia, username) {
  const socialMediaUrls = {
    twitter: `https://twitter.com/${username}`,
    github: `https://github.com/${username}`,
    linkedin: `https://linkedin.com/in/${username}`,
    instagram: `https://instagram.com/${username}`
  };

  if (socialMediaUrls[socialMedia]) {
    window.location.href = socialMediaUrls[socialMedia];
  } else {
    alert("Red social no válida"); // Manejar caso no válido
  }
}

function render(variables = {}) {
  console.log("These are the current variables: ", variables);

  const socialMediaFields = {
    twitter: document.querySelector('.picker[for="twitter"]'),
    github: document.querySelector('.picker[for="github"]'),
    linkedin: document.querySelector('.picker[for="linkedin"]'),
    instagram: document.querySelector('.picker[for="instagram"]')
  };

  for (const socialMedia in socialMediaFields) {
    socialMediaFields[socialMedia].onkeydown = function(event) {
      if (event.key === "Enter") {
        const username = this.value.trim();
        if (username) {
          redirectToSocialMediaProfile(socialMedia, username);
        }
      }
    };
  }

  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";
  const ulClass =
    variables.socialMediaPosition === "position-left"
      ? "position-left"
      : "position-right";

  document.querySelector("#widget_content").innerHTML = `<div class="widget">
                ${cover}
              <img src="${variables.avatarURL}" class="photo" />
              <h1>${variables.name == null ? "Name" : variables.name} ${
    variables.lastname == null ? "Lastname" : variables.lastname
  }</h1>
              <h2>${variables.role == null ? "Role" : variables.role}</h2>
              <h3>${variables.city == null ? "City" : variables.city} ${
    variables.country == null ? "Country" : variables.country
  }</h3>
              <ul class="${ulClass}">
                <li><a href="https://twitter.com${
                  variables.twitter == null ? "" : variables.twitter
                }"><i class="fab fa-twitter"></i></a></li>
                <li><a href="https://github.com${
                  variables.github == "alesanchezr" ? "" : variables.github
                }"><i class="fab fa-github"></i></a></li>
                <li><a href="https://linkedin.com${
                  variables.linkedin == null ? "" : variables.linkedin
                }"><i class="fab fa-linkedin"></i></a></li>
                <li><a href="https://instagram.com${
                  variables.instagram == null ? "" : variables.instagram
                }"><i class="fab fa-instagram"></i></a></li>
              </ul>
            </div>
        `;
}

window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "position-left",
    twitter: null,
    github: "alesanchezr",
    linkedin: null,
    instagram: null,
    name: null,
    lastname: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables);

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for");
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values));
    });
  });
};
