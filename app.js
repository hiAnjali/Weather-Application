const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '85ff80eccb88931410750ed1e5b93268';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
        if (json.cod === '404') {
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const img = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                img.src = 'https://cdn-icons-png.flaticon.com/128/10484/10484062.png';
                break;

            case 'Rain':
                img.src = 'https://cdn-icons-png.flaticon.com/128/2469/2469994.png';
                break;

            case 'Snow':
                img.src = 'https://cdn-icons-png.flaticon.com/128/14377/14377577.png';
                break;

            case 'Clouds':
                img.src = 'https://cdn-icons-png.flaticon.com/128/414/414927.png';
                break;

            case 'Mist':
                img.src = 'https://cdn-icons-png.flaticon.com/128/4005/4005817.png';
                break;

            case 'Haze':
                img.src = 'https://cdn-icons-png.flaticon.com/128/13882/13882920.png';
                break;

            default:
                img.src = 'https://cdn-icons-png.flaticon.com/128/2698/2698213.png';
        }
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    });
});
