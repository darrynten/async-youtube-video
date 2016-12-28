asyncYoutubeVideo = (function() {
  return {
    // The video player object
    videoPlayer: null,

    // Required
    videoId: null,
    targetElement: null,
    origin: null,

    // Optionals that have defaults
    controls: 1,
    autoplay: 1,
    disablekb: 0,
    fs: 1,
    rel: 0,
    modestbranding: 0,
    playsinline: 1,
    showinfo: 1,

    additionalClasses: null,

    // Mute the video?
    mute: 0,

    // Loop it?
    loop: 1,

    /**
     * Init
     *
     * Options 
     *
     * [Required]
     * videoId - The YouTube video ID
     * targetClass - The div you want to become the video
     * origin - Your domain, required by google for this to work
     *
     * [Optional]
     * controls - Show the video controls. Default 1
     * autoplay - Autoplay the video? Default 1
     * disablekb - Disable keyboard interaction with video? Default 0
     * fs - Start the video in fullscreen? Default 0
     * rel - Show related videos? 
     * modestbranding - Use minimal YouTube branding? Default 0
     * playsinline - Play the video inline. Default 1
     * showinfo - Show the video information. Default 1
     *
     * additionalClasses - A string of classes to add to the element
     * muteVideo - Start muted? Default 0
     * loopVideo - Loop it? Default 1
     */
    init: function(options) {
      // basic checks
      if (!(options || options.videoId || options.targetClass || options.origin)) {
        throw 'Async YouTube Video is not properly configured. Requires a videoId, a targetClass, and an origin.';
      }

      // required
      this.videoId = options.videoId;
      this.targetElement = options.targetClass;
      this.origin = options.origin;

      // optional
      this.controls = options.controls ? options.controls : this.controls;
      this.autoplay = options.autoplay ? options.autoplay : this.autoplay;
      this.disablekb = options.disablekb ? options.disablekb : this.disablekb;
      this.fs = options.fs ? options.fs : this.fs;
      this.rel = options.rel ? options.rel : this.rel;
      this.modestbranding = options.modestbranding ? options.modestbranding : this.modestbranding;
      this.playsinline = options.playsinline ? options.playsinline : this.playsinline;
      this.showinfo = options.showinfo ? options.showinfo : this.showinfo;
      this.mute = options.mute ? options.mute : this.mute;
      this.loop = options.loop ? options.loop : this.loop;

      if (options.additionalClasses) {
        this.additionalClasses = options.additionalClasses;
      }

      // Make an iframe
      this.createElement();

      // Setup the API
      this.loadApiAsync();

      // Listen for the callback
      window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady;
    },

    // Creates the iframe element and replaces the target element
    createElement: function() {
      // We put an iframe in the dom, replacing the target element
      var frame = document.createElement('iframe');
      frame.id = 'async-youtube-video';

      var sourceString = '//www.youtube.com/embed/' + this.videoId;
      // Always keep jsapi enabled
      sourceString += '?enablejsapi=1';

      /**
       * These are also passed into the YouTube object upon init.
       *
       * TODO check to see if this really is needed
       */
      sourceString += '&controls=' + this.controls;
      sourceString += '&autoplay=' + this.autoplay;
      sourceString += '&disablekb=' + this.disablekb;
      sourceString += '&fs=' + this.fs;
      sourceString += '&rel=' + this.rel;
      sourceString += '&modestbranding=' + this.modestbranding;
      sourceString += '&playsinline=' + this.playsinline;
      sourceString += '&showinfo=' + this.showinfo;
      sourceString += '&loop=' + this.loop;
      sourceString += '&origin=' + this.origin;

      // Bind the source
      frame.src = sourceString;

      // Don't show a border ever
      frame.setAttribute('frameborder', 0);

      // Standard attributes
      frame.setAttribute('type', 'text/html');

      // Any extra classes?
      if (this.additionalClasses) {
        frame.setAttribute('class', this.additionalClasses + ' async-youtube-video');
      } else {
        frame.setAttribute('class', 'async-youtube-video');
      }

      // Put it in its place
      document.querySelector('.' + this.targetElement).replaceWith(frame);
    },

    // https://developers.google.com/youtube/iframe_api_reference#Events
    loadApiAsync: function() {
      // A new tag
      var tag = document.createElement('script');
      tag.src = "//www.youtube.com/iframe_api";

      // The first script tag in the document
      var firstScriptTag = document.getElementsByTagName('script')[0];
      // Insert the new sript
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    },

    // Load and configure the player
    loadPlayer: function() {
      // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5#autoplay
      this.videoPlayer = new YT.Player('async-youtube-video', {
        playerVars: {
          enablejsapi: 1,
          controls: this.controls,
          autoplay: this.autoplay,
          disablekb: this.disablekb,
          fs: this.fs,
          rel: this.rel,
          modestbranding: this.modestbranding,
          playsinline: this.playsinline,
          showinfo: this.showinfo,
          origin: this.origin,
          videoId: this.videoId,
          loop: this.loop
        },
        events: {
          'onReady': this.onPlayerReady,
          'onStateChange': this.onPlayerStateChange
        }
      });
    },

    // API is loaded
    onYouTubeIframeAPIReady: function() {
      // Load the player when the callback fires
      asyncYoutubeVideo.loadPlayer();
    },

    // once we're good to go
    onPlayerReady: function(event) {
      event.target.playVideo();

      if (asyncYoutubeVideo.mute) {
        event.target.mute();
      }
    },

    // Restart when video ends if needed
    onPlayerStateChange: function(event) {
      if (event.data == 0) {
        if (asyncYoutubeVideo.loop) {
          event.target.playVideo();

          if (asyncYoutubeVideo.mute) {
            event.target.mute();
          }
        }
      }
    }
  }
})();
