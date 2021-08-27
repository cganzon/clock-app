const getRandQuote = () => {
    $.getJSON('https://api.quotable.io/random', data => {
        $('.quote').text(`\"${data.content}\"`);
        $('.author').text(data.author);
    });
};

$('.refresh').click(() => getRandQuote());

getRandQuote();