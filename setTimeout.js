function mySetTimeout(cb, wait) {
  let timer = null;
  let now = +new Date();
  const loop = () => {
    timer = window.requestAnimationFrame(loop);
    if (+new Date() - now >= wait) {
      cb.call(this);
      window.cancelAnimationFrame(timer);
    }
  };
  window.requestAnimationFrame(loop);
}

mySetTimeout(() => {
  console.log("ddd");
}, 2000);
