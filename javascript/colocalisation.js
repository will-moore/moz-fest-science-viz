

(function(){
  var width = 530;
  var height = 530;
  var r;
  

  // For every pixel in 'this' image, plot x:red, y:green
  plotImage = function() {

    // reset border color of each thumbnail
    thumbs = document.querySelectorAll("img.thumb");
    for (var t=0; t<thumbs.length; t++) {
      thumbs[t].style['border-color'] = '#fff';
    }

    var imgsrc = this.src;
    this.style['border-color'] = '#ff0000';
    
    var img = new Image();
    
    img.onload = function() {
      var canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      
      var data = ctx.getImageData(0, 0, width, height).data;

      var plotdata = [];
      // want {x:red, y:green} for every pixel
      for (var i = 0; i < data.length; i+=4) {
        plotdata.push({x:data[i], y:data[i + 1]});
      }

      r.plot(plotdata);
    };

    img.src = imgsrc;
  };
  
  domReady = function() {

    var el = document.querySelector("div.ruse");

    r = new ruse(el, 500, 500);
    r.animation = false;

    // Set up 'click' handler for images.
    var posImg = document.querySelector("img.pos");
    posImg.onclick = plotImage;
    document.querySelector("img.neg").onclick = plotImage;

    // Click image to plot data
    posImg.click();

  };
  window.addEventListener('DOMContentLoaded', domReady, false);
})();
