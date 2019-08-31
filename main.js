'use strict';

const apiKey = 'BqXB26u0R3l6kp3030J0ZcRuSIl7E6Ksxp6ARAo8';
const searchUrl = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    $('#results-list').empty()
    console.log(responseJson);
    let html = '';
    responseJson.data.forEach((project) =>
    html += `<li><h3>${project.fullName}</h3>
            <p>${project.description}</p>
            <a href="${project.url}">Park website</a>
            <p>${project.latLong}</p>
            </li>`)
        $('#results').append(html).removeClass('hidden');
        console.log(responseJson);
    }

function getParks(query, limit=10) {
    const params = {
        api_key: apiKey,
        stateCode: query,
        limit
    };
    const queryString = formatQueryParams(params)
    const url = searchUrl + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchState = $('#js-search-state').val();
        const maxResults = $('#js-limit').val();
        getParks(searchState, maxResults);
    });
}

$(watchForm);