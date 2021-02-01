var base_url = "https://api.thingspeak.com/channels/1293773/";
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getArticles() {
  if ('caches' in window) {
    caches.match(base_url + "feeds.json?results=2").then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var articlesHTML = "";
          var hujan = " ";
          var fog = " ";
          var valve = " ";

          if(data.feeds[1].field1 == 1 ){
            hujan = "Tidak Hujan"
          } else {
            hujan = "Hujan"
          }
          if(data.feeds[1].field2 == 1 ){
            fog = "Berkabut"
          } else {
            fog = "Tidak berkabut"
          }
          if(data.feeds[1].field3 == 1 ){
            valve = "Mengalir"
          } else {
            valve = "Tidak mengalir"
          }

          articlesHTML += `
            <h3>Keadaan</h3>
            <a href="./datas.html?fields=1">
              <div class="card green accent-2">
              <h5 class="jarak">Apakah dalam keadaan hujan?</h5>
              <div class="card-content">
                <span>${hujan}</span>
              </div>
              </div>
            </a>
            <a href="./datas.html?fields=2">
            <div class="card light-blue accent-4 white-text">
            <h5 class="jarak">Apakah dalam keadaan berkabut?</h5>
              <div class="card-content">
                <span>${fog}</span>
              </div>
            </div>
            </a>
            <a href="./datas.html?fields=4">
            <div class="card red">
            <h5 class="jarak white-text">Keadaan Valve</h5>
              <div class="card-content white-text">
                <span>${valve}</span>
              </div>
            </div>
            </a>
                `;
          document.getElementById("body-content").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetch(base_url + "feeds.json?results=2")
    .then(status)
    .then(json)
    .then(function (data) {
      var articlesHTML = "";
      var hujan = " ";
      var fog = " ";
      var valve = " ";

      if(data.feeds[1].field1 == 1 ){
        hujan = "Tidak Hujan"
      } else {
        hujan = "Hujan"
      }
      if(data.feeds[1].field2 == 1 ){
        fog = "Berkabut"
      } else {
        fog = "Tidak berkabut"
      }
      if(data.feeds[1].field3 == 1 ){
        valve = "Mengalir"
      } else {
        valve = "Tidak mengalir"
      }

          articlesHTML += `
          <h3>Keadaan</h3>
            <a href="./datas.html?fields=1">
              <div class="card green accent-2">
              <h5 class="jarak">Apakah dalam keadaan hujan?</h5>
              <div class="card-content">
                <span>${hujan}</span>
              </div>
              </div>
            </a>
            <a href="./datas.html?fields=2">
            <div class="card light-blue accent-4 white-text">
            <h5 class="jarak">Apakah dalam keadaan berkabut?</h5>
              <div class="card-content">
                <span>${fog}</span>
              </div>
            </div>
            </a>
            <a href="./datas.html?fields=4">
            <div class="card red white-text">
            <h5 class="jarak">Keadaan Valve</h5>
              <div class="card-content white-text">
                <span>${valve}</span>
              </div>
            </div>
            </a>
                `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getArticleById() {
  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("fields");

  fetch(base_url + "feeds.json?results=20")
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data.feeds[0]);
      var articleHTML = ``;
      articleHTML += `
      var trace1 = {
        x: [`
      data.feeds.forEach(function (feeds) {
        articleHTML += `"${feeds.created_at}",`;
      })

      articleHTML += `],
        y: [`;
      data.feeds.forEach(function (feeds) {
        if (idParam == 1) {
          articleHTML += `${feeds.field1},`;
        } else if (idParam == 2) {
          articleHTML += `${feeds.field2},`;
        } else if (idParam == 3) {
          articleHTML += `${feeds.field3},`;
        } else if (idParam == 4) {
          articleHTML += `${feeds.field4},`;
        } else if (idParam == 5) {
          articleHTML += `${feeds.field5},`;
        };
      })

      articleHTML += `],
        type: 'scatter'
      };
      
      var data = [trace1];
      Plotly.newPlot('myDiv', data);
        `;
      console.log(articleHTML);
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("a").innerHTML = articleHTML;
    });
}