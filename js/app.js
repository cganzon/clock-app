// Function that generates a random quote from the quotable api
const getRandQuote = () => {
    $.getJSON('https://api.quotable.io/random', data => {
        $('.quote').text(`\"${data.content}\"`);
        $('.author').text(data.author);
    });
};

// Function that gets time data from the world time api based on the user's ip address
const getTimeData = () => {
    $.getJSON("http://worldtimeapi.org/api/ip", data => {
        // console.log(data);
        let timeZone = data.abbreviation;
        $('.timezone').text(timeZone);
        displayTime(data.unixtime);
        displayDetails(data.timezone, data.day_of_year, data.day_of_week, data.week_number);
    });
};

// Function that gets the user's location using the freegeoip api
const getLocationData = () => {
    $.getJSON('https://freegeoip.app/json/', data => {
        // console.log(data);
        if(data.country_code === 'US') {
            $('.city-state').text(`${data.city}, ${data.region_code}`);
        } else {
            $('.city-state').text(`${data.city}, ${data.country_code}`);
        };
    });
};

// Function that converts the timestamp from the world time api into a readable time
const displayTime = (unixTime) => {
    let date = new Date(unixTime * 1000);
    let hours = date.getHours();
    
    // Converts the 24 hour time format to 12 hour time format
    let convertedHours = ((date.getHours() + 11) % 12 + 1);
    let minutes = `0${date.getMinutes()}`;
    let am_pm = (hours >= 12) ? 'pm' : 'am';
    let convertedTime = `${convertedHours}:${minutes.substr(-2)}`;
    $('.time-left').text(convertedTime);
    $('.am-pm').text(am_pm);
    changeTheme(hours);
    displayGreeting(hours);
};

// Function that uses the calculated military to display the correct greeting
const displayGreeting = hours => {
    if(hours >= 5 && hours < 12) {
        $('.greeter').text('Good morning');
    } else if(hours >= 12 && hours < 18) {
        $('.greeter').text('Good afternoon');
    } else {
        $('.greeter').text('Good evening');
    };
};

// Function that uses the data from the world time api to show additional time details to the user
const displayDetails = (timezone, dayOfYear, dayOfWeek, weekNumber) => {
    $('.current-timezone').text(timezone);
    $('.day-of-year').text(dayOfYear);
    $('.day-of-week').text(dayOfWeek + 1);
    $('.week-number').text(weekNumber);
};

// Function that uses the military hour from the displayTime function to change the theme of the page between day and night
const changeTheme = hours => {
    if(hours >= 5 && hours < 18) {
        $('.sun').addClass('show');
        $('.moon').removeClass('show');
        $('.bg-img-day').addClass('show-bg');
        $('.details').addClass('details-bg-day');
        $('.detail-title, .detail-value').addClass('detail-text-day');
        $('.bg-img-night').removeClass('show-bg');
        $('.details').removeClass('details-bg-night');
        $('.detail-title, .detail-value').removeClass('detail-text-night');
    } else {
        $('.moon').addClass('show');
        $('.sun').removeClass('show');
        $('.bg-img-night').addClass('show-bg');
        $('.details').addClass('details-bg-night');
        $('.detail-title, .detail-value').addClass('detail-text-night');
        $('.bg-img-day').removeClass('show-bg');
        $('.details').removeClass('details-bg-day');
        $('.detail-title, .detail-value').removeClass('detail-text-day');
    };
};

// Generates a new random quote whenever the refresh button is clicked
$('.refresh').click(() => getRandQuote());

// Moves the quote and clock sections of the page up and down whenever the More/Less button is clicked
// Also makes the additional time details section visible or hidden
$('.details-btn').click(() => {
    $('.quote-container').toggleClass('hide-quote');
    if(!$('.main-content').hasClass('move-up') && $('.details').hasClass('hide-details')) {
        $('.main-content').addClass('move-up');
        setTimeout(() => {
            $('.details').removeClass('hide-details');
            $('.details').addClass('show-details');
        }, 400);
    } else {
        setTimeout(() => {
            $('.main-content').removeClass('move-up');
        }, 400);
        $('.details').removeClass('show-details');
        $('.details').addClass('hide-details');
    }
    $('.arrow').toggleClass('rotate');
    if($('.more-less').text() === 'More') {
        $('.more-less').text('Less');
    } else {
        $('.more-less').text('More');
    };
});

getRandQuote();
getTimeData();
getLocationData();

// Calls the getTimeData function every second so the time and additional details can update automatically
setInterval(() => getTimeData(), 1000);