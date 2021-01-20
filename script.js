// navigation
let hamburger = document.querySelector('.nav__hamburger');
let mobileNav = document.querySelector('.mob-nav');
let btn = document.getElementById('submit');
let errorText = document.getElementById('error-text');
let urlField = document.getElementById('url-field');
let mockup = document.querySelector('.intro__container__mockup');
let apiResults = document.querySelector('.api-results');
let hashArr = [];

// regex
const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
let regex = new RegExp(expression);

// read text from the input field
function readLink() {
  let link = {
    url: urlField.value
  };
  return link;
}

// checks if the link follows a valid pattern
function verifyLink(link) {
  if (link.match(regex)) {
    return true;
  } else {
    return false;
  }
}

function update(json) {
  if (hashArr.indexOf(json.code) === -1) {
    apiResults.innerHTML += `<div class="result">
    <div class="normal-url">
      <a href="${json.original_link}" target="_blank">${json.original_link}</a>
    </div>
    <div class="shortened-url">
      <div id="short-url"><a href="https://${json.short_link}" target="_blank" id="url">${json.short_link}</a></div>
      <button class="copy btn">Copy</button>
    </div>`;
  } else {
    return;
  }
}
// fetch url hash from api
async function getLink(data) {
  const URL = `https://api.shrtco.de/v2/shorten?url=${data.url}`;
  axios.get(URL)
    .then((res) => {
      update(res.data.result);
      hashArr.push(res.data.result.code);
    })
    .catch((err) => {
      alert('Failed to Fetch, check your internet connection');
    })
}

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  mockup.classList.toggle('close');
});


btn.addEventListener('click', function () {
  if (urlField.value) {
    errorText.innerText = '';
    urlField.style.border = 'none';
    urlField.style.color = 'hsl(257, 27%, 26%)'
    if (verifyLink(urlField.value)) {
      let data = readLink();
      getLink(data);
    } else {
      errorText.innerText = 'Please enter a valid url format e.g https://www.google.com';
      urlField.style.border = '3px solid hsl(0, 87%, 67%)';
    }
  } else {
    errorText.innerText = 'Please add a link';
    urlField.style.border = '3px solid hsl(0, 87%, 67%)';
    urlField.style.color = 'hsl(0, 87%, 67%)'
  }
});

// copy funcionality
// functon that writes to the clipboard
function updateClipboard(newClip) {
  navigator.clipboard.writeText(newClip).then(function () {
    alert('Clipboard Updated');
  }, function () {
    alert('Failed to update the clipboard');
  })
}

window.addEventListener('click', (event) => {
  if (event.target.classList.contains("copy")) {
    let text = event.target.previousElementSibling.textContent;
    updateClipboard(text);
  }
});
