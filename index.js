/**
 * Module Dependencies
 */

var each = require('each');
var map = require('map');
var Emitter = require('emitter');
var workerify = require('workerify');
var workerScript = require('./worker-script');

/**
 * Expse `Preloader`
 */

module.exports = Preloader;

function Preloader(){

  this.isCapable = this.checkCapability();

}


Preloader.prototype.origin = window.location.origin;

/**
 * Install Emitter
 */

Emitter(Preloader.prototype);


/**
 * Load array of urls
 *
 * @param {Array} urls
 */

Preloader.prototype.load = function(urls){

  if(!urls.length) return;

  var self = this;

  // URL has to have absolute path
  urls = map(urls, function(url){
    if(!/^http/.test(url)){
      url = self.origin + (/^\//.test(url) ? '' : '/') + url;
    }
    return url;
  });

  if(this.isCapable){
    this.worker = workerify(workerScript);
    this.worker.onmessage = this.onmessage.bind(this);
    this.worker.postMessage(urls);
  } else {
    this.loadAsUsual(urls);
  }

};

/**
 * On recieve messgae from Worker
 *
 * @param {Object} e
 *
 * @api private
 */

Preloader.prototype.onmessage = function(e){
  this._next(e.data);
  if('end' === e.data.msg) return this._end();
};


/**
 * Emit `next` event with progress
 *
 * @param {Number} progress
 *
 * @api private
 */

Preloader.prototype._next = function(e){
  this.emit('next', e);
};


/**
 * Emit `end` event when load completes
 *
 * @api private
 */

Preloader.prototype._end = function(){
  this.emit('end');
};

/**
 * Load as usual for older browser
 *
 * @param {Array} urls
 *
 * @api private
 */

Preloader.prototype.loadAsUsual = function(urls){

  var self = this;
  var len = urls.length;
  var count = 0;

  each(urls, function(url){
    var img = new Image();
    img.src = url;
    img.onload = function(){
      count++;
      if(count <= len){
        self._next(count / len);
        if(count === len) self._end();
      }
    };
  });
};

/**
 * Check if `Worker` and `createObjectURL` is available
 *
 * @api public
 */

Preloader.prototype.checkCapability = function(){
  return 'Worker' in window && 'URL' in window && 'createObjectURL' in window.URL;
};
