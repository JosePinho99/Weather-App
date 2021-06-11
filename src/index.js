class Info {
    constructor(temp, hum, clouds) {
      this.temp = temp;
      this.hum = hum;
      this.clouds = clouds;
    }
  }

//Standardizes input from user
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

//Initilize city for display and temperature
const current_city = '';
let temperature = 0;
let temp_measure = 'f';
//Add event listener to the search button
let search = document.querySelector('#search-button');
search.addEventListener("click", searchData);

//Function that connects the API query and the loading effect timer
function searchData() {
    var elemento = document.getElementById("space");
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }

    let input = document.querySelector('#city').value;
    input = capitalizeFirstLetter(input);
    let data = getData(input).then(function(data) {
        temperature = data.temp;
        const space = document.getElementById('space');
        let content = document.createElement('div');
            content.setAttribute('id', 'content');

        let id = '';
        let icon = '';
        if (data.clouds < 50) {id = 'content-data-green'; icon = 'wb_sunny';}
        else {id = 'content-data-gray'; icon = 'cloud';}

            const switcher = document.createElement("div");
                switcher.setAttribute('id', 'grau-switcher');
                let labone = document.createElement("label");
                    labone.setAttribute('for', 'frh');
                    labone.textContent = 'Fº';
                switcher.appendChild(labone);

                let inputone = document.createElement('input');
                    inputone.checked = true;
                    inputone.addEventListener('click', change_measure);
                    inputone.setAttribute('id', 'frh');
                    inputone.setAttribute('class', 'radi');
                    inputone.setAttribute('name', 'type');
                    inputone.setAttribute('type', 'radio');
                    inputone.setAttribute('value', 'Fahrenheit');
                switcher.appendChild(inputone);


                let labtwo = document.createElement("label");
                    labtwo.setAttribute('for', 'cls');
                    labtwo.textContent = 'Cº';
                switcher.appendChild(labtwo);

                let inputtwo = document.createElement('input');
                    inputtwo.setAttribute('id', 'cls');
                    inputtwo.addEventListener('click', change_measure);
                    inputtwo.setAttribute('class', 'radi');
                    inputtwo.setAttribute('name', 'type');
                    inputtwo.setAttribute('type', 'radio');
                    inputtwo.setAttribute('value', 'Celsius');
                switcher.appendChild(inputtwo);
        
            const card  = document.createElement('div');
                card.setAttribute('id', id);
                let span = document.createElement('span');
                    span.setAttribute('id', 'met-icon');
                    span.setAttribute('class', 'material-icons');
                    span.setAttribute('style', 'color:black; font-size:5rem;');
                    span.textContent = icon;
                card.appendChild(span);

                let info = document.createElement('div');
                    info.setAttribute('id', 'content-info');
                    let hone = document.createElement('h2');
                        hone.setAttribute('id', 'temp-value');
                        hone.setAttribute('class', 'right-border');
                        hone.textContent = Math.round(temperature).toString()+'º';
                    info.appendChild(hone);

                    let htwo = document.createElement('h2');
                        htwo.innerHTML = `${data.hum}<span class="material-icons">water_drop</span>`;
                    info.appendChild(htwo);
                card.appendChild(info);

                let city = document.createElement('h2');
                    city.setAttribute('id', 'name-city');
                    city.textContent = input;
                card.appendChild(city);
            content.appendChild(card);
            content.appendChild(switcher);
        space.appendChild(content);
        console.log(data.clouds, data.temp, data.hum);
    });
}

//Extracts information from API and returns it in the form of a object
async function getData(input) {
    //Inducing a loading effect (Not active since querys are very fast)
    //let spinner = document.querySelector('.loader');
    //spinner.classList.add('spin');

    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=e4b36fff7ca8346527a52918a2fca24a`, {mode: 'cors'});
        const data = await response.json();

        let temp = data.main.temp;
        let hum = data.main.humidity;
        let clouds = data.clouds.all;
        const weather_data = new Info(temp, hum, clouds);

        //spinner.classList.remove('spin');
        return weather_data

    } catch (error) {
        //spinner.classList.remove('spin');
        alert('RIP program');
        //Lead with error
    }
}

//Toggle between celsius and fahrenheit
function change_measure() {
    if (this.id === 'frh') {
        if (temp_measure === 'c') {temperature = temperature * 17.2222222;}
        temp_measure = 'f';
    } else {
        if (temp_measure === 'f') {temperature = temperature / 17.2222222;}
        temp_measure = 'c';
    }
    let hone = document.getElementById('temp-value');
        hone.textContent = Math.round(temperature).toString()+'º';
}