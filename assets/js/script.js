const CLIENT_ID = "55754fb8d3614b9aa541c96d340ef2dc"; // Replace with your Client ID
const CLIENT_SECRET = "acee4e70e09147128829c916ef03527a"; // Replace with your Client Secret
const PLAYLIST_ID = "37i9dQZF1DXcBWIGoYBM5M"; // Replace with a valid Playlist ID

// Function to get access token from Spotify API
async function getToken() {
	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
		},
		body: "grant_type=client_credentials",
	});

	const data = await response.json();
	return data.access_token;
}

// Function to get track information
async function getTracks(token) {
	const response = await fetch(
		`https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`,
		{
			method: "GET",
			headers: { Authorization: "Bearer " + token },
		}
	);

	const data = await response.json();
	return data.items.map((item) => item.track); // Extract the track object
}

// Function to render tracks to the interface
// function renderTracks(tracks) {
//     const playlist = document.getElementById('playlist');
//     playlist.innerHTML = ''; // Clear old content

//     tracks.forEach(track => {
//         const trackElement = document.createElement('div');
//         trackElement.classList.add('track');
//         trackElement.innerHTML = `
//          <img src="${track.album.images[0].url}" alt="${track.name} album cover">
//             <h2>${track.name}</h2>
//             <p>Album: ${track.album.name}</p>
//             <p>Artist: ${track.artists.map(artist => artist.name).join(' /n ')}</p>
//             <p>Popularity: ${track.popularity}</p>
//             <audio controls src="${track.preview_url}"></audio>
//             <p><a href="${track.external_urls.spotify}" target="_blank">Listen on Spotify</a></p>
//         `;
//         playlist.appendChild(trackElement);
//     });
// }
function renderTracks(tracks) {
	const swipeWrapper = document.querySelector(".swipeWrapper");
	swipeWrapper.innerHTML = ""; // Clear old content

	tracks.forEach((track) => {
		const trackElement = document.createElement("div");
		trackElement.classList.add("swipe-item");
		trackElement.innerHTML = `
        <div class="swipe-item">
            <img src="${track.album.images[0].url}" alt="${
			track.name
		} - ${track.artists.map((artist) => artist.name).join(" ")}">
            <p class="swipe-title">${track.name}</p>
            <p class="swipe-text">${track.artists
							.map((artist) => artist.name)
							.join(", ")}</p>
            </div>
        `;
		swipeWrapper.appendChild(trackElement);
	});
}

// Main function to call the above functions and display data
async function main() {
	try {
		const token = await getToken();
		const tracks = await getTracks(token);
		renderTracks(tracks);
	} catch (error) {
		console.error("Error:", error);
	}
}

// Call the main function when the script loads
main();
//  {
//     added_at: '2024-04-12T04:00:00Z',
//     track: {
//       preview_url: 'https://p.scdn.co/mp3-preview/4cb51b19221d76ecd319faec63c4221c96d7fdd0?cid=55754fb8d3614b9aa541c96d340ef2dc',
//       name: "I Don't Wanna Wait",
//       popularity: 90,
//       album: { name: "I Don't Wanna Wait" },
//       artists: [{ name: 'John Doe' }],
//       external_urls: { spotify: 'https://open.spotify.com/track/331l3xABO0HMr1Kkyh2LZq' }
//     }

// tạo màu sác
document.addEventListener('DOMContentLoaded', function() {
  // Hàm tạo màu ngẫu nhiên
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Lấy tất cả các phần tử song-list
  const songLists = document.querySelectorAll('.song-list');

  // Áp dụng gradient cho mỗi song-list
  songLists.forEach((songList, index) => {
    const randomColor = getRandomColor();
    songList.style.background = `linear-gradient(10deg, #121212 70%, ${randomColor} 100%)`;
  });
});