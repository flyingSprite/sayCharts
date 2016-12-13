import Director from './components/director.js';
import $ from 'jquery';

let director = new Director('center-point');
// director.centerPoint();

const dx = $('#dx');
const dy = $('#dy');
const set = $('#set');

director.addEvent(function (node) {
  dx.val(node.x);
  dy.val(node.y);
});

let networkGraph = director.createNetworkGraph();
networkGraph.addSvg('ax.svg', -150, -200);
networkGraph.addSvg('ax-adp.svg', -150, 100);

networkGraph.addSvg('unlock.svg', -50, -100);
networkGraph.addSvg('locked.svg', -340, 20);
networkGraph.addSvg('locked.svg', 220, 20);

networkGraph.addSvg('router.svg', 350, 80);
networkGraph.addSvg('laptop.svg', -600, 90);
networkGraph.addSvg('cloud.svg', 500, 80);

set.on('click', function() {
  networkGraph.setPosition(dx.val(), dy.val());
});
