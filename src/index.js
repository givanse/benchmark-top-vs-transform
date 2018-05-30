var Benchmark = require('benchmark');
var suite = new Benchmark.Suite('Scrolling');

var el = document.createElement('div');
el.style = 'position: absolute; width: 100px; height: 20px; background-color: blue;';

var body = document.querySelector('body');
body.appendChild(el);

var ticking = false;
function executeUpdate(callback) {
  if (ticking) {
    return;
  }

  window.requestAnimationFrame(function() {
    callback();
    ticking = false;
  });
   
  ticking = true;
}

suite
.add('style.top', function() {
  var pos = 0;
  el.style.top = pos + 'px';

  for (var i = 0; i < 30; i++) {
    el.style.top = pos + 'px';
    pos += 5;
  }

})
.add('style.top - requestAnimationFrame', function() {
  var pos = 0;
  el.style.top = pos + 'px';

  for (var i = 0; i < 30; i++) {
    executeUpdate(function() {
      el.style.top = pos + 'px';
    });
    pos += 5;
  }

})
.add('style.transform', function() {
  var pos = 0;
  el.style.top = pos + 'px';

  for (var i = 0; i < 30; i++) {
    el.style.transform = 'translate(' + pos + ', 0)';
    pos += 5;
  }
})
.add('style.transform - requestAnimationFrame', function() {
  var pos = 0;
  el.style.top = pos + 'px';

  for (var i = 0; i < 30; i++) {
    executeUpdate(function() {
      el.style.transform = 'translate(' + pos + ', 0)';
    });
    pos += 5;
  }
});

// add listeners
suite.on('cycle', function(event) {
  console.log(String(event.target));
});

suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({async: true});
