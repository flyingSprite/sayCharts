'use strict';


import WebSpider from './components/webspider.js';


class SayCharts{

    constructor(id) {
        this.scene = d3.select('#center-point').append('svg');
    }
}

var scene = d3.select('#center-point').append('svg')
    .style('width', '100%')
    .style('height', '100%')
    .style('color', '#777');
var width = parseInt(scene.style('width').replace('px', ''));
var height = parseInt(scene.style('height').replace('px', ''));

var group = scene.append('g')
    .attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')');

var center = group.append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 5)
    .attr('class', 'node-point');


