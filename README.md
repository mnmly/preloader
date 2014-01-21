# preloader

  Worker based preloader based on [this post](http://blog.bouze.me/1246) by [@bouze](http://twitter.com/bouze)

## Installation

  Install with [component(1)](http://component.io):

    $ component install mnmly/preloader

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
