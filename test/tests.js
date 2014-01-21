var chai = require('chai');
var should = chai.should();
var Preloader = require('preloader');

describe('Preloader', function(){
  it('should exist', function(){
    should.exist(Preloader);
  });

  it('should check its compatibility when initialized', function(){

    var preloader = new Preloader();
    preloader.should.have.property('isCapable');

    if(window.URL && window.URL.createObjectURL){
      preloader.isCapable.should.be.ok;
    } else {
      preloader.isCapable.should.not.be.ok;
    }

  });
  
  it ('should have origin', function(){
    var preloader = new Preloader();
    preloader.should.have.property('base');
  });

  it ('should have load method', function(){
    var preloader = new Preloader();
    preloader.should.have.property('load');
  });

  it ('should load array of images and emit next / end events', function(done){

    var preloader = new Preloader();
    var urls = ['images/test-01.jpg', 'images/test-02.jpg'];
    preloader.base = window.location.href.replace(/\/$/, '');

    preloader.should.have.property('on');
    preloader.load(urls);

    preloader.on('progress', function(e){
      e.value.should.be.a('number');
      e.index.should.be.a('number');
      e.url.should.be.a('string');
    });
    
    preloader.on('end', function(){
      done();
    });
  });
});

