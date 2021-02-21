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

          if(data.feeds[1].field1 == 0 ){
            hujan = "Tidak Hujan"
            hujan_url = "https://image.flaticon.com/icons/png/512/252/252035.png"
          } else {
            hujan = "Hujan <div class='show-on-small hid-green'>A</div>"
            hujan_url = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-512.png"
          }
          if(data.feeds[1].field2 == 1 ){
            fog = "Berkabut <div class='show-on-small hid-blue'>A</div>"
            fog_url = "https://static.vecteezy.com/system/resources/previews/000/583/433/non_2x/cloud-and-fog-icon-vector.jpg"
          } else {
            fog = "Tidak berkabut"
            fog_url = "http://cdn.onlinewebfonts.com/svg/img_542346.png"
          }
          if(data.feeds[1].field3 == 1 ){
            valve = "Mengalir"
          } else {
            valve = "Tidak mengalir"
          }
    
          var str = data.feeds[1].created_at;
          var time = str.split("Z");
          var datetime = moment(time[0]).add(7, 'hours').format('LLL');
    
          articlesHTML += `
          <div class="dt">
            <h5>${datetime}</h5>
          </div>
          <div class="row">
            <a href="./datas.html?fields=1">
              <div class="card-panel hoverable col s6 card green accent-2">
                <div class="card-content">
                  <img class="responsive-img" src="${hujan_url}">
                  <h5>${hujan}</h5>
                </div>
              </div>
            </a>
            <a href="./datas.html?fields=2">
              <div class="card-panel hoverable col s6 card light-blue accent-4 white-text">
                <div class="card-content">
                  <img class="responsive-img" src="${fog_url}">
                  <h5>${fog}</h5>
                </div>
              </div>
            </a>
            <div class="card-panel hoverable col s12 card red">
              <div class="card-content white-text">
                <div class="row valign-wrapper">
                  <div class="col s4"><h5>${valve}</h5></div>
                  <div class="col s8"><img class="responsive-img" src="https://images.vexels.com/media/users/3/152689/isolated/preview/3a5bb70416239ee25c89a33d7bd190b2-water-shut-off-valve-icon-by-vexels.png" width="125vw"></div>
                </div>
              </div>
            </div>
          </div>
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

      if(data.feeds[1].field1 == 0 ){
        hujan = "Tidak Hujan"
        hujan_url = "https://image.flaticon.com/icons/png/512/252/252035.png"
      } else {
        hujan = "Hujan <div class='show-on-small hid-green'>A</div>"
        hujan_url = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-512.png"
      }
      if(data.feeds[1].field2 == 1 ){
        fog = "Berkabut <div class='show-on-small hid-blue'>A</div>"
        fog_url = "https://static.vecteezy.com/system/resources/previews/000/583/433/non_2x/cloud-and-fog-icon-vector.jpg"
      } else {
        fog = "Tidak berkabut"
        fog_url = "http://cdn.onlinewebfonts.com/svg/img_542346.png"
      }
      if(data.feeds[1].field3 == 1 ){
        valve = "Mengalir"
      } else {
        valve = "Tidak mengalir"
      }

      var str = data.feeds[1].created_at;
      var time = str.split("Z");
      var datetime = moment(time[0]).add(7, 'hours').format('LLL');

      articlesHTML += `
      <div class="dt">
        <h5>${datetime}</h5>
      </div>
      <div class="row">
        <a href="./datas.html?fields=1">
          <div class="card-panel hoverable col s6 card green accent-2">
            <div class="card-content">
              <img class="responsive-img" src="${hujan_url}">
              <h5>${hujan}</h5>
            </div>
          </div>
        </a>
        <a href="./datas.html?fields=2">
          <div class="card-panel hoverable col s6 card light-blue accent-4 white-text">
            <div class="card-content">
              <img class="responsive-img" src="${fog_url}">
              <h5>${fog}</h5>
            </div>
          </div>
        </a>
        <div class="card-panel hoverable col s12 card red">
          <div class="card-content white-text">
            <div class="row valign-wrapper">
              <div class="col s4"><h5>${valve}</h5></div>
              <div class="col s8"><img class="responsive-img" src="https://images.vexels.com/media/users/3/152689/isolated/preview/3a5bb70416239ee25c89a33d7bd190b2-water-shut-off-valve-icon-by-vexels.png" width="125vw"></div>
            </div>
          </div>
        </div>
      </div>
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