
  import(/* webpackPrefetch: true */ 'reveal.js/css/reset.css');
  import(/* webpackPrefetch: true */ 'reveal.js/css/reveal.css');
  import(/* webpackPrefetch: true */ 'highlight.js/styles/tomorrow.css');

  
  import(/* webpackPrefetch: true */ 'sfeir-school-theme/dist/css/sfeir-school-theme.css');
  import (/* webpackMode: "eager" */ 'sfeir-school-theme/dist/js/sfeir-theme');

  import(/* webpackPrefetch: true */ '../scss/xxx.scss');

  require.context('sfeir-school-theme/dist/images', false, /\.(png|jpe?g|svg)$/);

  //import(/* webpackPrefetch: true */ 'highlight.js');
  //const hljs = require('highlight.js');

  // Full list of configuration options available here:
  // https://github.com/hakimel/reveal.js#configuration
  Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    center: false,
    width: 1920,
    height: 1080,

    theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
    transition: Reveal.getQueryHash().transition || 'none', // default/cube/page/concave/zoom/linear/fade/none

    keyboard: {
      32: function () {
        var video = document.querySelector('.present video');
        if (video.paused == true) {
          video.play();
        } else {
          video.pause();
        }
      }
    },

    slideNumber: 'c/t',
    showSlideNumber: 'speaker',

    // Optional libraries used to extend on reveal.js
    dependencies: [
      //{ src: require('reveal.js/plugin/markdown/marked.js'), condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
      { src: require('reveal.js/plugin/markdown/markdown.js'), condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
       // TODO: plugin borked, workaround is to use hljs directly
      //{ src: require('reveal.js/plugin/highlight/highlight.js') },
      { src: require('reveal.js/plugin/search/search.js'), async: true },
      { src: require('reveal.js/plugin/zoom-js/zoom.js'), async: true },
      { src: require('reveal.js/plugin/notes/notes.js'), async: true },
    ]
  });

  // NOTE: The highlight plugin above is not working, so load highlight.js directly
//hljs.initHighlightingOnLoad();
