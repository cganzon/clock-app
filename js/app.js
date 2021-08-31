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

const displayTime = (unixTime) => {
    let date = new Date(unixTime * 1000);
    let hours = date.getHours();
    let convertedHours = ((date.getHours() + 11) % 12 + 1);
    let minutes = `0${date.getMinutes()}`;
    let am_pm = (hours >= 12) ? 'pm' : 'am';
    let convertedTime = `${convertedHours}:${minutes.substr(-2)}`;
    $('.time-left').text(convertedTime);
    $('.am-pm').text(am_pm);
    displayIcon(hours);
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

const displayIcon = hours => {
    if(hours >= 5 && hours < 18) {
        $('.sun').addClass('show');
        $('.moon').removeClass('show');
    } else {
        $('.moon').addClass('show');
        $('.sun').removeClass('show');
    };
};

$('.refresh').click(() => getRandQuote());

getRandQuote();
getTimeData();
setInterval(() => getTimeData(), 1000);