 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;

      var $row = $(template);

      var clickHandler = function() {

    var songNumber = $(this).attr('data-song-number');
     if (currentlyPlayingSongNumber !== null) {
              var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
              currentlyPlayingCell.html(currentlyPlayingSongNumber);
    }

     if (currentlyPlayingSongNumber !== songNumber) {

        $(this).html(pauseButtonTemplate);
         currentlyPlayingSongNumber = songNumber;
         currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
     } else if (currentlyPlayingSongNumber === songNumber) {

        $(this).html(playButtonTemplate);
         currentlyPlayingSongNumber = null;
         currentSongFromAlbum = null;
    }

};

var onHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = songNumberCell.attr('data-song-number');

     if (songNumber !== currentlyPlayingSongNumber) {
        songNumberCell.html(playButtonTemplate);
    }
};

var offHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = songNumberCell.attr('data-song-number');

      if (songNumber !== currentlyPlayingSongNumber) {
       songNumberCell.html(songNumber);
    }
};

      $row.find('.song-item-number').click(clickHandler);
           // #2
           $row.hover(onHover, offHover);
           // #3
           return $row;
 };

   var $albumTitle = $('.album-view-title');
   var $albumArtist = $('.album-view-artist');
   var $albumReleaseInfo = $('.album-view-release-info');
   var $albumImage = $('.album-cover-art');
   var $albumSongList = $('.album-view-song-list');

  var setCurrentAlbum = function(album) {
    currentAlbum = album;

   $albumTitle.text(album.title);
   $albumArtist.text(album.artist);
   $albumReleaseInfo.text(album.year + ' ' + album.label);
   $albumImage.attr('src', album.albumArtUrl);

     // #3
     $albumSongList.empty();

     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };

  var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
  var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
  var currentAlbum = null;
  var currentlyPlayingSongNumber = null;
  var currentSongFromAlbum = null;

  $(document).ready(function() {
     setCurrentAlbum(albumPicasso);
 });


     var albums = [albumPicasso, albumMarconi, albumKitties];
     var index = 1;

     $albumImage.click(function(event) {
       setCurrentAlbum(albums[index]);
       index++;
       if (index == albums.length) {
         index = 0;
     };
 });
