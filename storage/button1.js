const btn1 = document.getElementById("btn-1");
const result = document.getElementById("result");

const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const gender = document.getElementsByName("gender");
const address = document.getElementById("address");
const storageType = document.getElementsByName("storage-type");

export function btn1Click() {
  btn1.addEventListener("click", () => {
    localStorage.clear();
    sessionStorage.clear();

    if (document.cookie.length > 0) {
      let cookies = document.cookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
        let cookieName = cookies[i].split("=")[0].trim();
        document.cookie =
          cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      }
    }

    result.innerHTML = "";

    let item;

    for (let i = 0; i < storageType.length; i++) {
      if (storageType[i].checked) {
        if (storageType[i].value == "Local") {
          let obj = {
            firstname: firstname.value,
            lastname: lastname.value,
            address: address.value,
            gender,
            storageType: storageType[i].value,
          };

          for (let i = 0; i < gender.length; i++) {
            if (gender[i].checked) obj["gender"] = gender[i].value;
          }

          localStorage.setItem("data", JSON.stringify(obj));

          item = JSON.parse(localStorage.getItem("data"));
        } else if (storageType[i].value == "Session") {
          let obj = {
            firstname: firstname.value,
            lastname: lastname.value,
            address: address.value,
            gender,
            storageType,
          };

          for (let i = 0; i < gender.length; i++) {
            if (gender[i].checked) obj["gender"] = gender[i].value;
          }

          for (let i = 0; i < storageType.length; i++) {
            if (storageType[i].checked)
              obj["storageType"] = storageType[i].value;
          }

          sessionStorage.setItem("data", JSON.stringify(obj));
          item = JSON.parse(sessionStorage.getItem("data"));
        } else if (storageType[i].value == "Cookie") {
          let obj = {
            firstname: firstname.value,
            lastname: lastname.value,
            address: address.value,
            gender,
            storageType,
          };

          for (let i = 0; i < gender.length; i++) {
            if (gender[i].checked) obj["gender"] = gender[i].value;
          }

          for (let i = 0; i < storageType.length; i++) {
            if (storageType[i].checked)
              obj["storageType"] = storageType[i].value;
          }

          for (const [key, value] of Object.entries(obj)) {
            document.cookie = `${key}=${value}; expires=Thu, 20 Apr 2023 23:59:00`;
          }

          let decodedCookie = decodeURIComponent(document.cookie);
          let getItems = decodedCookie.split(";");

          let temp = {};

          for (let i = 0; i < getItems.length; i++) {
            var cookie = getItems[i].split("=");
            var cookieName = cookie[0].trim();
            var cookieValue = cookie[1];
            temp[cookieName] = cookieValue;
          }

          item = temp;
        }
      }
    }

    let html = "";

    for (const [key, value] of Object.entries(item)) {
      html = html + `<li>${value}</li>`;
    }

    result.innerHTML = `<p><ul>${html}</ul></p>`;
  });
}
