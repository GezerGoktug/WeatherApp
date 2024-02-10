//! BURAYA KENDİ APİ ANAHTARINIZI GİRİNİZ.
const apiKey="";
//! DOM ACCESS
const search = document.getElementById("search");
const weatherdate = document.getElementsByClassName("weather-date");
const badge = document.getElementsByClassName("badge");
const situationİcon = document.getElementById("situation-icon");
const weatherDetails = document.getElementsByClassName("weather-detail-info");
const fahrenheit = document.getElementById("fahrenheit");
const celcius = document.getElementById("celcius");
//! DOM ACCESS
let month = "";
let day = "";
let heat;
let maxheat;
let minheat;
let realheat;
let celciusClick = false;
let fahrenheitClick = false;
//! Aldığı parametreye göre sıcaklık birim dönüşümü yapar
const converterHeat = (type) => {
  if (type == "celcius") {
    if (!celciusClick) {
      heat = ((5 / 9) * (heat - 32)).toFixed(2);
      maxheat = ((5 / 9) * (maxheat - 32)).toFixed(2);
      minheat = ((5 / 9) * (minheat - 32)).toFixed(2);
      realheat = ((5 / 9) * (realheat - 32)).toFixed(2);
      celciusClick = true;
      fahrenheitClick = false;
      weatherDetails[0].childNodes[1].textContent = `${realheat} °C `;
      document.getElementsByClassName("weather-heats")[0].innerHTML = `${heat}°C <br>Min:${minheat}°C      Max:${maxheat}°C`;
    }
    else {
      fahrenheitClick = false;
      celciusClick = true;
    }
    celcius.style.backgroundColor = "green";
    fahrenheit.style.backgroundColor = "grey";
  } 
  else {
    if (!fahrenheitClick) {
      heat = (32 + 1.8 * heat).toFixed(2);
      maxheat = (32 + 1.8 * maxheat).toFixed(2);
      minheat = (32 + 1.8 * minheat).toFixed(2);
      realheat = (32 + 1.8 * realheat).toFixed(2);

      fahrenheitClick = true;
      celciusClick = false;
      weatherDetails[0].childNodes[1].textContent = `${realheat} °F `;
      document.getElementsByClassName("weather-heats")[0].innerHTML = `
      ${heat}°F <br>Min:${minheat}°F      Max:${maxheat}°F
      `;
    } 
    else {
      celciusClick = false;
      fahrenheitClick = true;
    }
    fahrenheit.style.backgroundColor = "green";
    celcius.style.backgroundColor = "grey";
  }
};
//! Celsiusa tıklandığında sıcaklık birimini celciusa dönüştürür
celcius.addEventListener("click", () => {
  converterHeat("celcius");
});
//! Fahrenheita tıklandığında sıcaklık birimini fahrenheita dönüştürür
fahrenheit.addEventListener("click", () => {
  converterHeat("fahrenheit");
});
//! Arama yapıldığı zamanı alır gün ay saat cinsinden veriye dönüştürür.
function time() {
  let date = new Date();
  switch (date.getMonth()) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;
  }
  switch (date.getDay()) {
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    case 0:
      day = "Sunday";
      break;
  }
  if (date.getMinutes() < 10) {
    weatherdate[0].innerHTML = `${day},${month} ${date.getDate()} ${date.getFullYear()} at  ${date.getHours()}:0${date.getMinutes()}  `;
  } else {
    weatherdate[0].innerHTML = `${day},${month} ${date.getDate()} ${date.getFullYear()} at  ${date.getHours()}:${date.getMinutes()}  `;
  }
}
//! Apiden aldığı durum verisine göre arayuzdeki durum iconunu(fontawesome'dan) günceller 
function weathersituation(situation) {
  badge[0].innerHTML = `${situation}`;
  switch (situation) {
    case "Snow":
      situationİcon.classList = "fa-regular fa-snowflake";
      break;
    case "Rain":
      situationİcon.classList = "fa-solid fa-cloud-rain";
      break;
    case "Clouds":
      situationİcon.classList = "fa-solid fa-cloud";
      break;
    case "Clear":
      situationİcon.classList = "fa-solid fa-sun";
      break;
    case "Fog":
      situationİcon.classList = "fa-solid fa-smog";
      break;
  }
}
//! Api ye bir hava durumu verisi için istek yollanır.
//! Eğer başarılı şekilde veri alınırsa dönüştürme işlemleri başlar .
//! Gelen veri JSON formatındadır.Bu veri json() ile JSON formatında işlenir javascript nesnesine dönüştürülür.
//! Daha sonra bu veri uzerinden ilgili değerlere atamalar UI güncellemeleri yapılır.
//! Eğer veri alınmazsa catch bloğu ile hata verilir.
//! Ya da yapılan döüştürme işlemleri arayüz işlemlerinden birinde hata çıkarsa yine hata verir.
//? Kullanılan Api: OpenWeatherMap Api
const getResult = async (city) => {
 
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(apiurl)
    .then((response) => response.json())
    .then((data) => {
      heat = data.main.temp;
      minheat = data.main.temp_min;
      maxheat = data.main.temp_max;
      realheat = data.main.feels_like;
      celciusClick = true;
      fahrenheitClick = false;
      celcius.style.backgroundColor = "green";
      fahrenheit.style.backgroundColor = "grey";
      document.getElementsByClassName("weather-location")[0].innerHTML = `
      ${data.name},${data.sys.country}`;
      document.getElementsByClassName("weather-heats")[0].innerHTML = `
      ${data.main.temp}°C <br>Min:${data.main.temp_min}°C      Max:${data.main.temp_max}°C
      `;
      weatherDetails[0].childNodes[1].textContent = `${data.main.feels_like} °C `;
      weatherDetails[1].childNodes[1].textContent = `${data.wind.speed} m/s `;
      weatherDetails[2].childNodes[1].textContent = `${data.main.humidity} % `;
      weatherDetails[3].childNodes[1].textContent = `${data.main.pressure} bar `;
      time();
      weathersituation(data.weather[0].main);
    })
    .catch((error) => {
      console.error("Hava durumu getirme hatası:", error);
    });
};
//! Eğer enter tuşuna basılırsa inputtaki şehir bilgisine göre apidan veri çeker ve arayüzü günceller.
const querry = (e) => {
  if (e.keyCode == "13") {
    getResult(search.value);
  }
};
search.addEventListener("keypress", querry);

//! Ekran İlk açıldığında apidan mevcut olarak londra için hava durumu verisi çekilir.
window.addEventListener("load", () => {
  time();
  getResult("London");
});
  