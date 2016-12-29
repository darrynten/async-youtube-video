## async-youtube-video
#### Simple async youtube video loading

Attach a YouTube video to an element asynchronously.

## Usage

`npm install --save-dev async-youtube-video`

Include the script on your page

Insert an element with class `youtube-iframe-video` into your DOM

**NB** This element will be replaced with the iframe, so ensure you have a wrapping
element in your DOM so you can control it.

```html
<div class="video-container">
  <div class="youtube-iframe-video"></div>
</div>
```

Then initialise

```js
window.onload = function() {
  asyncYoutubeVideo.init({
    targetClass: 'youtube-iframe-video',
    videoId: 'Srmdij0CU1U',
    controls: 1,
    autoplay: 1,
    disablekb: 1,
    fs: 0,
    modestbranding: 1,
    playsinline: 1,
    showinfo: 0,
    origin: 'example.com',
    additionalClasses: 'test-video some-class',
    rel: 0,
    mute: 1,
    loop: 1
  });
}
```

Required options are `videoId`, `origin` and `targetClass`.

`targetClass` must match the class of the replacement element in the DOM

Will render

```html
<iframe id="async-youtube-video" src="//www.youtube.com/embed/Srmdij0CU1U?enablejsapi=1&amp;controls=1&amp;autoplay=1&amp;disablekb=1&amp;fs=1&amp;rel=0&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=1&amp;loop=1&amp;origin=http://example.com" frameborder="0" type="text/html" class="test-video some-class async-youtube-video"></iframe>
```

The options map to [YouTube API](https://developers.google.com/youtube/player_parameters) names for ease of reference.

The names of the variables are somewhat confusing though, so here is a brief
rundown.

## Youtube API Parameters

Valid values are `1` or `0` unless otherwise stated

* autoplay - automatically start? optional, default `1`
* controls - whether or not to show controls. optional, default `1`
  * 0 - no controls rendered
  * 1 - automatic control rendering
  * 2 - controls always shown
* disablekb - whether or not to respond to keyboard controls. optional, default `0`
* fs - whether or not to *show* fullscreen **controls** (does not start in fs)
optional, default `1`
* loop - whether or not to loop the video. optional, default `1`
* modestbranding - whether or not to show a youtube logo. optional, default `0`
* origin - your domain. **required**
* playsinline - inline or fullscreen on ios. optional, default `1`
* rel - show related videos? optional, default `0`
* showinfo - show info about the video? optional, default `1`

#### YouTube API parameters not yet supported

* cc_load_policy - 1 causes subtitles to be shown by default
* color - colour of the video progress bar
* end - when to end the video
* hl - player interface language, ISO 2 letter or full locale *en* or *en-za*
* iv_load_policy - show video annotations?
* list - type of content to be loaded
* listType - used with `list`
* playlist - comma seperated list of videos
* start - the time to start the video playback at

#### Additional parameters not part of the YouTube API

* mute - whether or not to start the video muted. optional, default `0`
* loop - whether or not to loop the video. optional, default `1`

## Note

The `enablejsapi` option is always enabled, and there are no plans to allow
that to be configurable.

Width and height iframe attributes are not supported yet

## Todo

* Width and height configuration
* Start and end time configuration
* Frameborder configuration (if required)
* Video controls
* Playlists
* The rest of the as-yet unsupported variables described above
  * cc_load_policy
  * color
  * end
  * hl
  * iv_load_policy
  * list
  * listType
  * playlist
  * start

Contributions welcome
