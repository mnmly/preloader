module.exports = function(){

  self.onmessage = function (e) {
    var urls = e.data;
    var len = urls.length;
    var count = 0;

    function load(url, i){
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
        try{
          if (4 !== xhr.readyState) return;
          count++;
          var msg = {
            msg: count < len ? 'next' : 'end',
            value: count / len,
            index: i,
            url: url
          };
          self.postMessage(msg);
        } catch (e){
          console.log(e);
        }
      };
      xhr.open("GET", url, false);
      xhr.send(null);
    }

    urls.forEach(load);

  };
};
