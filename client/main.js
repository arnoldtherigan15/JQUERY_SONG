const baseUrl = 'http://localhost:3000'
let currentId = null

$( document ).ready(function() {
    auth()
});

function auth() {
    if(localStorage.token) {
        $('#home-page').show()
        $('#form-page').hide()
        $('#login').hide()
        fetchSongs()
    } else {
        $('#home-page').hide()
        $('#form-page').hide()
        $('#login').show()
    }
}

function toEditPage(id) {
    currentId = id
    $('#form-page').show()
    $('#home-page').hide()
    $.ajax({
        url: `${baseUrl}/songs/${id}`,
        method: 'get',
        headers: {
            token: localStorage.token
        }
    })
        .done(data => {
            $('#title').val(data.song.title)
            $('#artist').val(data.song.artist)
            $('#genre').val(data.song.genre)
            $('#url').val(data.song.url)
        })
        .fail(err => {
            console.log(err.responseJSON.errors, '>>>>>>>>>>>>> error')
        })
}

function editSong(event) {
    let title = $('#title').val()
    let artist = $('#artist').val()
    let genre = $('#genre').val()
    let url = $('#url').val()
    event.preventDefault()
    $.ajax({
        url: `${baseUrl}/songs/${currentId}`,
        method: 'put',
        headers: {
            token: localStorage.token
        },
        data: {
            title,
            artist,
            genre,
            url
        }
    })
        .done(_ => {
            toHomePage()
            fetchSongs()
        })
        .fail(err => {
            console.log(err.responseJSON.errors, '>>>>>>>>>>>>> error')
        })
}

function toHomePage() {
    $('#form-page').hide()
    $('#home-page').show()
}

function logout() {
    localStorage.clear()
    auth()
}

function login(event) {
    event.preventDefault()
    let email = $('#email').val()
    let password = $('#password').val()
    $.ajax({
        url: `${baseUrl}/users/login`,
        method: 'post',
        data: {
            email,
            password
        }
    })
        .done(data => {
            localStorage.setItem('token', data.token)
            auth()
        })
        .fail(err => {
            console.log(err.responseJSON.errors, '>>>>>>>>>>>>> error')
        })
        .always(_ => {
            $('#email').val('')
            $('#password').val('')
        })
}

function fetchSongs() {
    $.ajax({
        method: 'get',
        url: `${baseUrl}/songs`,
        headers: {
            token: localStorage.token
        }
    })
        .done(data => {
            $('.home-contanier').empty()
            data.songs.forEach(song => {
                $('.home-contanier').append(`
                    <div onclick="toEditPage(${song.id})" class="card" style="cursor:pointer;">
                        <div class="card-img">
                            <img src="${song.url}" alt="album">
                        </div>
                        <div class="card-title">
                            <h3>${song.title}</h3>
                        </div>
                        <div class="card-body">
                            <p><i class="fas fa-user" style="margin-right: 10px;"></i>${song.artist}</p>
                            <p><i class="fas fa-hashtag" style="margin-right: 5px;"></i>${song.genre}</p>
                        </div>
                    </div>
                `)
            });
        })
        .fail(err => {
            console.log(err.responseJSON.errors, '>>>>>>>>>>>>> error')
        })
}