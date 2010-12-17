init = function() {
  var c = E.canvas(640, 480);
  var d = E('div', { id: 'container' });
  d.appendChild(c);
  document.body.appendChild(d);
  container = new GameContainer(c);
};
