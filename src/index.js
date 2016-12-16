import * as d3 from 'd3';

import Director from './components/director.js';
import $ from 'jquery';

let director = new Director(d3, 'center-point');
// director.centerPoint();

const dx = $('#dx');
const dy = $('#dy');
const set = $('#set');

director.addEvent(function (node) {
  dx.val(node.x + node.width / 2);
  dy.val(node.y + node.height / 2);
});

let networkGraph = director.createNetworkGraph();
networkGraph.addSvg('security_device.svg', -94, -220);
networkGraph.addSvg('ax.svg', -104, 88);

networkGraph.addSvg('unlock.svg', -94.5, -135.5);
networkGraph.addSvg('locked.svg', -340, -5.5);
networkGraph.addSvg('locked.svg', 155, 4);

networkGraph.addSvg('router.svg', 287, 61);
networkGraph.addSvg('laptop.svg', -493, 91);
networkGraph.addSvg('cloud.svg', 460, 45);

set.on('click', function() {
  networkGraph.setPosition(dx.val(), dy.val());
});
