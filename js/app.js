const getRandQuote = () => {
    $.getJSON('https://api.quotable.io/random', data => {
        $('.quote').text(`\"${data.content}\"`);
        $('.author').text(data.author);
    });
};

const getTimeData = () => {
    $.getJSON("http://worldtimeapi.org/api/ip", data => {
        // console.log(data);
        let timeZone = data.abbreviation;
        $('.timezone').text(timeZone);
        displayTime(data.unixtime);
    });
};

const getLocationData = () => {
    $.getJSON('https://freegeoip.app/json/', data => {
        console.log(data);
        if(data.country_code === 'US') {
            $('.city-state').text(`${data.city}, ${data.region_code}`);
        } else {
            $('.city-state').text(`${data.city}, ${data.country_code}`);
        };
    });
};

const displayTime = (unixTime) => {
    let date = new Date(unixTime * 1000);
    let hours = date.getHours();
    let convertedHours = ((date.getHours() + 11) % 12 + 1);
    let minutes = `0${date.getMinutes()}`;
    let am_pm = (hours >= 12) ? 'pm' : 'am';
    let convertedTime = `${convertedHours}:${minutes.substr(-2)}`;
    $('.time-left').text(convertedTime);
    $('.am-pm').text(am_pm);
    changeTheme(hours);
    displayGreeting(hours);
};

const displayGreeting = hours => {
    if(hours >= 5 && hours < 12) {
        $('.greeter').text('Good morning');
    } else if(hours >= 12 && hours < 18) {
        $('.greeter').text('Good afternoon');
    } else {
        $('.greeter').text('Good evening');
    };
};

const changeTheme = hours => {
    if(hours >= 5 && hours < 18) {
        $('.sun').addClass('show');
        $('.moon').removeClass('show');
        $('.bg-img-day').addClass('show-bg');
        $('.details').addClass('details-bg-day');
        $('.bg-img-night').removeClass('show-bg');
        $('.details').removeClass('details-bg-night');
    } else {
        $('.moon').addClass('show');
        $('.sun').removeClass('show');
        $('.bg-img-night').addClass('show-bg');
        $('.details').addClass('details-bg-night');
        $('.bg-img-day').removeClass('show-bg');
        $('.details').removeClass('details-bg-day');
    };
};

$('.refresh').click(() => getRandQuote());

$('.details-btn').click(() => {
    $('.quote-container').toggleClass('hide-quote');
    $('.main-content').toggleClass('move-up');
    $('.arrow').toggleClass('rotate');
    $('.details').toggleClass('move-up');
    if($('.more-less').text() === 'More') {
        $('.more-less').text('Less');
    } else {
        $('.more-less').text('More');
    };
});

getRandQuote();
getTimeData();
getLocationData();
setInterval(() => getTimeData(), 1000);