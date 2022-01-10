self.addEventListener(
  "message",
  function (e) {
    var b = 0;
    for (var i = 0; i < 1000000000; i++) {
      b += i;
    }
    self.postMessage("You said: " + e.data + "look" + b);
  },
  false
);
