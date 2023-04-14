# JS WEB STORAGE

_Tugas Kak Tata - Skilvul_

---

## 1. **index.html**

```html
<body>
  <div>
    <label for="firstname">Nama Depan</label>
    <input type="text" id="firstname" />
  </div>
  <div>
    <label for="lastname">Nama Belakang</label>
    <input type="text" id="lastname" />
  </div>
  <div>
    <span>Gender</span>
    <input type="radio" value="Laki-laki" name="gender" />
    <label for="gender">Laki-laki</label>
    <input type="radio" value="Perempuan" name="gender" />
    <label for="gender">Perempuan</label>
  </div>
  <div>
    <label for="address">Alamat</label>
    <input type="text" id="address" />
  </div>
  <div>
    <span>Tipe Penyimpanan</span>
    <input type="radio" value="Session" name="storage-type" />
    <label for="storage-type">Session Storage</label>
    <input type="radio" value="Local" name="storage-type" />
    <label for="storage-type">Local Storage</label>
    <input type="radio" value="Cookie" name="storage-type" />
    <label for="storage-type">Cookie Storage</label>
  </div>
  <div>
    <button id="btn-1">Button 1</button>
    <button id="btn-2">Button 2</button>
  </div>

  <div id="result"></div>
  <script type="module" src="script.js"></script>
</body>
```

Pada bagian tag _body_, saya mulai menyusun form secara sederhana yang mencakup seluruh perintah dari tugas. Di dalam tag _body_ tersebut terdapat beberapa _input_ yang terdiri dari "nama depan", "nama belakang", "gender", "alamat", dan "tipe penyimpanan". Serta ada dua _button_ dengan _button_ pertama berfungsi untuk menghapus data dan memunculkan data baru, sedangkan _button_ kedua berfungsi untuk menambah data baru tanpa menghilangkan data yang ada sebelumnya.

## 2. **script.js**

```javascript
import { btn1Click } from "./storage/button1.js";
import { btn2Click } from "./storage/button2.js";

btn1Click();
btn2Click();
```

File ini hanya berfungsi sebagai tempat untuk melakukan impor banyak file javascript sehingga kode bersifat modular.

## 3. **button1.js**

```javascript
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
            storageType: storageType[i].value,
          };

          for (let i = 0; i < gender.length; i++) {
            if (gender[i].checked) obj["gender"] = gender[i].value;
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
```

Karena file diatas memiliki baris kode yang sangat panjang,
mari kita bedah bagian demi bagian...

### **Bagian Pertama**

```javascript
const btn1 = document.getElementById("btn-1");
const result = document.getElementById("result");

const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const gender = document.getElementsByName("gender");
const address = document.getElementById("address");
const storageType = document.getElementsByName("storage-type");
```

Pada bagian ini, saya mengambil semua element yang saya butuhkan dalam proses. Mulai dari _button_, _input_, dan _div_ sebagai penampung hasilnya nanti.

### **Bagian Kedua**

```javascript
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

  ....
```

Di bagian kedua ini, saya membuat sebuah fungsi bernama _btn1Click_ yang saya _export_ untuk membuatnya modular. Di dalamnya, saya membuat sebuah _event click_ untuk tag _button_ dengan nama _btn1_ yang jika di "klik" akan menjalankan beberapa fungsi seperti,

```javascript
localStorage.clear();
```

Untuk membersihkan _local storage_ pada browser

```javascript
sessionStorage.clear();
```

Untuk membersihkan _session storage_ pada tab browser

```javascript
if (document.cookie.length > 0) {
  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookieName = cookies[i].split("=")[0].trim();
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  }
}
```

Untuk membersihkan _cookie_ pada browser

```javascript
result.innerHTML = "";
```

Untuk membersihkan elemen _html_ pada browser

### **Bagian Ketiga**

```javascript
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

  ....
```

Pada bagian ini saya membuat sebuah variabel bernama _let item_ untuk menampung hasil output yang akan ditampilkan di browser.

Selanjutnya saya membuat sebuah perulangan untuk mencari manakah input penyimpanan tipe _radio_ yang di pilih sehingga saya bisa menentukan manakah tipe penyimpanan mana yang harus dijalankan.

Jika yang dipilih adalah _Local_, maka akan menjalankan kode dibawah ini,

```javascript
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

  ....
```

Di sana saya membuat sebuah variabel objek bernama _obj_, untuk menampung hasil untuk disimpan ke _local storage_.

Khusus untuk bagian "gender", karena ada lebih dari 1 pilihan mirip seperti "tipe penyimpanan", maka harus dibuat perulangan dulu untuk menemukan mana yang dipilih. Setelah ditemukan baru ditambahkan ke variabel _obj_.

Setelah semua data telah siap untuk disimpan, maka dilakukan baris kode berikut,

```javascript
localStorage.setItem("data", JSON.stringify(obj));
```

Sehingga data bisa disimpan ke _local storage_ browser.

Setelah itu, semua data yang telah disimpan saya ambil dan kirim ke variabel _item_ dengan baris berikut,

```javascript
item = JSON.parse(localStorage.getItem("data"));
```

Dengan begitu menyimpan data dengan _local storage_ telah selesai.

### **Bagian Keempat**

```javascript
else if (storageType[i].value == "Session") {
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

  sessionStorage.setItem("data", JSON.stringify(obj));
  item = JSON.parse(sessionStorage.getItem("data"));
```

Pada bagian penyimpana _session_ ini kurang lebih sama dengan penyimpanan _local_ karena sintaksnya sangat mirip sekali.

### **Bagian Keempat**
