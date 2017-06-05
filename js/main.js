// Set up the array artists.
var artists = [
	{
		"name" : "21_pilots",
		"description" : "Twenty-one Pilots",
		"alts" : ["imagine_dragons","shawn_mendes"],
		"plays" : 0
	},
	{
		"name" : "anb",
		"description" : "Agoraphobic Nosebleed",
		"alts" : ["black_metal", "mastodon"],
		"plays" : 0
	},
	{
		"name" : "ariana_grande",
		"description" : "Ariana Grande",
		"alts" : ["selena_gomez","katy_perry"],
		"plays" : 0
	},
	{
		"name" : "bad_brains",
		"description" : "Bad Brains",
		"alts" : ["ice_t","slayer"],
		"plays" : 0
	},
	{
		"name" : "beyonce",
		"description" : "Beyonce",
		"alts" : ["ariana_grande","bruno_mars"],
		"plays" : 0
	},
	{
		"name" : "black_flag",
		"description" : "Black Flag",
		"alts" : ["slayer","lady_gaga"],
		"plays" : 0
	},
	{
		"name" : "bruno_mars",
		"description" : "Bruno Mars",
		"alts" : ["weeknd","drake"],
		"plays" : 0
	},
	{
		"name" : "chainsmokers",
		"description" : "The Chainsmokers",
		"alts" : [],
		"plays" : 0
	},
	{
		"name" : "david_bowie",
		"description" : "David Bowie",
		"alts" : [],
		"plays" : 0
	},
	{
		"name" : "dj_khaled",
		"description" : "DJ Khaled",
		"alts" : [],
		"plays" : 0
	},
	{
		"name" : "drake",
		"description" : "Drake",
		"alts" : ["dj_khaled","selena_gomez"],
		"plays" : 0
	},
	{
		"name" : "eminem",
		"description" : "Eminem",
		"alts" : ["run_the_jewels","miley_cyrus"],
		"plays" : 0
	},
	{
		"name" : "imagine_dragons",
		"description" : "Imagine Dragons",
		"alts" : [],
		"plays" : 0
	},
	{
		"name" : "katy_perry",
		"description" : "Katy Perry",
		"alts" : ["beyonce","miley_cyrus"],
		"plays" : 0
	},
	{
		"name" : "kendrick_lamar",
		"description" : "Kendrick Lamar",
		"alts" : ["machine_gun_kelly","drake"],
		"plays" : 0
	},
	{
		"name" : "lady_gaga",
		"description" : "Lady Gaga",
		"alts" : ["miley_cyrus","anb"],
		"plays" : 0
	},
	{
		"name" : "machine_gun_kelly",
		"description" : "Machine Gun Kelly",
		"alts" : ["eminem","david_bowie"],
		"plays" : 0
	},
	{
		"name" : "mastodon",
		"description" : "Mastodon",
		"alts" : [],
		"plays" : 0
	},
	{
		"name" : "miley_cyrus",
		"description" : "Miley Cyrus",
		"alts" : [],
		"plays" : 0
	},
	{
		"name" : "run_the_jewels",
		"description" : "Run The Jewels",
		"alts" : [],
		"plays" : 0
	},
	{
		"name" : "selena_gomez",
		"description" : "Selena Gomez",
		"alts" : [],
		"plays" : 0
	},
	{
		"name" : "shawn_mendes",
		"description" : "Shawn Mendes",
		"alts" : [],
		"plays" : 0
	},
	{
		"name" : "slayer",
		"description" : "Slayer",
		"alts" : [],
		"plays" : 0
	},
	{
		"name" : "snoop_dogg",
		"description" : "Snoop Doggy Dogg",
		"alts" : ["ice_t","kendrick_lamar"],
		"plays" : 0
	},
	{
		"name" : "kool_keith",
		"description" : "Kool Keith",
		"alts" : ["snoop_dogg","ice_t"],
		"plays" : 0
	}	
];

var audio = document.querySelectorAll('audio')[0];
var source = document.querySelectorAll('audio source')[0];
var artist_playing = '';

// Listen for artist image click.
var images = document.querySelectorAll('ul li img');
for(var i=0; i<images.length; i++){
	images[i].addEventListener('click', function(e){
		// Get the name of the artist in the image.
		var artist_selected = this.src;

		// Check to see if the user got it right.
		if(artist_selected.indexOf(artist_playing.name) > -1){
			showSuccess();
		} else {
			showMiss();
		}

	}, false);
}

initd = function(){
	clearMessage();
	// Shuffle the artist list.
	artists.sort(function(){
		return 0.5 - Math.random()
	});

	//Select random artist
	var artists_to_show = [];
	var random_index = Math.floor(Math.random()*artists.length);
	artist_playing = artists[random_index];
	artists_to_show.push(artist_playing.name);
	if(artist_playing.alts.length >0)
	{
		artists_to_show = artists_to_show.concat(artist_playing.alts);
	} else {
		// grab 2 other randoms
		while(artists_to_show.length < 3){
			var idx = Math.floor(Math.random()*artists.length);
			if(idx == random_index||artists_to_show.includes(artists[idx].name))
				continue;
			artists_to_show.push(artists[idx].name);
		}
	}

	// Update the artist images.
	artists_to_show.sort(function(){
		return 0.5 - Math.random()
	});
	for(var i=0; i<3; i++){
		document.querySelectorAll('ul li img')[i].src = './images/' + artists_to_show[i] + '.png';		
		if(artists_to_show[i]==artists[random_index].name)
		{
			document.querySelectorAll('ul li img')[i].className = "correct";
			document.querySelectorAll('ul li img')[i].setAttribute("alt",artists[random_index].description);
		}
	}
	
	source.src = './audio/' + artist_playing.name + '.ogg';
	audio.load();
	audio.play();
}
// Listen for 'Start Game' click.
document.querySelector('button').addEventListener('click', initd, false);

showSuccess = function(){
	var img = document.querySelector('img.correct');
	var artist = img.alt;
	document.getElementById('message').innerHTML = "Nice Job! The song is by "+artist+"!";
	document.querySelector('.audio_trigger').innerHTML = "Click to play again.";
	document.getElementById('message').className = "message success";
}

showMiss = function(){
	var img = document.querySelector('img.correct');
	var artist = img.alt;
	document.getElementById('message').innerHTML = "Whoops! The song is actually by "+artist+"!";
	document.querySelector('.audio_trigger').innerHTML = "Click to play again.";
	document.getElementById('message').className = "message fail";
}

clearMessage = function()
{
	document.getElementById('message').innerHTML = "";
	document.getElementById('message').removeAttribute("class");
	document.querySelector('.audio_trigger').innerHTML = "Select one.";
	var imgs = document.getElementsByTagName('img');
	for(var j = 0; j < imgs.length; j++){
		imgs[j].removeAttribute("class");
		imgs[j].removeAttribute("alt");
	}
}

/* Game movement demonstration */
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var frameWidth;
var frameHeight;
image = new Image();
image.onload = function() {
	imageWidth = this.width;
	imageHeight = this.height;
	frameWidth = image.width / 4;
	frameHeight = image.height / 4;
};
image.src = "images/walking.png";
var current_state = 'down';
var current_frame = 0;
var hero = {
	position: {x: 0, y: 0}
};
var animations = {
	down: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}],
	left: [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}],
	right: [{x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}],
	up: [{x: 0, y: 3}, {x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}]
};
setInterval(function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(image, animations[current_state][current_frame].x * frameWidth, animations[current_state][current_frame].y * frameHeight, frameWidth, frameHeight, hero.position.x, hero.position.y, frameWidth, frameHeight);
	current_frame += 1;
	if (current_frame > 3) {
		current_frame = 0;
	}
}, 1000/10);

document.addEventListener('keydown', function(e){
	switch(e.keyCode) {
		case 39:
			current_state = 'right';
			hero.position.x += 1;
			break;
		case 37:
			current_state = 'left';
			hero.position.x -= 1;
			break;
		case 38:
			current_state = 'up';
			hero.position.y -= 1;
			break;
		case 40:
			current_state = 'down';
			hero.position.y += 1;
			break;
	}
});

document.getElementById('secret').addEventListener('click', function(){
	document.getElementById('canvas').className = "show";
	return false;
}, false);