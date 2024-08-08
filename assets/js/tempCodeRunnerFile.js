// script.js

const CLIENT_ID = '55754fb8d3614b9aa541c96d340ef2dc'; // Thay thế bằng Client ID của bạn
const CLIENT_SECRET = 'acee4e70e09147128829c916ef03527a'; // Thay thế bằng Client Secret của bạn

// Hàm để lấy access token từ Spotify API
async function getToken() {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
}

// Hàm để lấy thông tin bài hát
async function getTracks(token) {
    const result = await fetch('https://api.spotify.com/v1/playlists/{playlist_id}/tracks', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data.items;
}

// Hàm chính để gọi các hàm trên và hiển thị dữ liệu
async function main() {
    const token = await getToken();
    const tracks = await getTracks(token);

    tracks.forEach(track => {
        console.log(track.track.name);
    });
}

main();
