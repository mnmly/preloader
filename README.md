# preloader

  Worker based preloader based on [this post](http://blog.bouze.me/1246) by [@bouze](http://twitter.com/bouze)

## Installation

  Install with [component(1)](http://component.io):

    $ component install mnmly/preloader

## Usage

```javascript

  var Preloader = require('preloader');
  var preloader = new Preloader();
  var urls = ['http://localhost:3000/test/images/test-01.jpg', 'http://localhost:3000/images/test-02.jpg'];
  
  // ** urls has to be absolute paths so either do the following by modifying the base.**

  var urls = ['images/test-01.jpg', 'images/test-02.jpg'];
  preloader.base = window.location.href.replace(/\/$/, '');
  preloader.load(urls);

  preloader.on('progress', function(e){
    console.log(e);
    // => {
    //  index: 0,
    //  url: 'http://localhost:3000/images/test-01.jpg',
    //  value: 0.5,
    //  msg: 'next'
    // }
  });
  
  preloader.on('end', function(){
    console.log('DONE');
  });

```

## API
  
  - [Preloader.load()](#preloaderloadurlsarray)

### Preloader.load(urls:Array)

  Load array of urls

## Events
  - ['progress'](#progress)
  - ['end'](#end)

### progress

  Emit when a url is loaded

### end
  Emit when all the urls are fetched
  


## License

  MIT
