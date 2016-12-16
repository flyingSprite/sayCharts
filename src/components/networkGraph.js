
import BasicComponent from './basic';
import StandardLayout from './standardLayout';
import _ from 'lodash';

import CONFIG from '../config';

class NetworkGraph extends BasicComponent {
  constructor(director) {
    super(director);
    this.nodes = {};
    this.group = undefined;
    this.selectedNode = undefined;
    this.init();
  }

  init() {
    this.group = new StandardLayout(this.director).create();

  }

  addSvg(name, dx=0, dy=0) {
    const self = this;
    this.d3.xml(CONFIG.svgPath + name, function(error, xml) {
      if (error) {
        throw error;
      }
      let importedNode = document.importNode(xml.documentElement, true);
      let svgGroup = self.group.append('g');

      var node = {};

      // Add svg file in svgGroup
      svgGroup.select(function() {
        // console.log(this);
        var svgNode = this.appendChild(importedNode.cloneNode(true));

        // Get width and height from svg element.
        node.width = self.getWidthFromSVG(svgNode);
        node.height = self.getHeightFromSVG(svgNode);
      });
      node.x = dx - node.width / 2;
      node.y = dy - node.height / 2;
      const newName = name + new Date().getTime();
      node.name = newName;
      node.element = svgGroup;
      self.nodes[newName] = node;

      svgGroup.attr('transform', `translate(${node.x}, ${node.y})`);
      self.addEvents(self.nodes[newName]);
    });
  }

  getWidthFromSVG(svg) {
    if (svg && svg.width && svg.width.baseVal && svg.width.baseVal.value) {
      return _.round(svg.width.baseVal.value);
    }
    return 0;
  }

  getHeightFromSVG(svg) {
    if (svg && svg.height && svg.height.baseVal && svg.height.baseVal.value) {
      return _.round(svg.height.baseVal.value);
    }
    return 0;
  }

  addEvents(node) {
    const self = this;

    // Add click event
    node.element.on('click', function () {
      self.selected(node);
      self.director.touchClickEvent(node);
    });

    // Add drag event
    node.element.call(self.d3.drag().on('start', function() {
      self.selected(node);
      function dragged() {
        self.director.touchClickEvent(node);
        node.x = _.round(self.d3.event.x - node.width / 2);
        node.y = _.round(self.d3.event.y - node.height / 2);
        node.element.attr('transform', `translate(${node.x}, ${node.y})`);
      }
      function ended() {
        // Do closed
      }
      self.d3.event.on('drag', dragged).on('end', ended);
    }));
  }

  selected(node) {
    if (this.selectedNode) {
      this.selectedNode.element.attr('class', '');
    }
    this.selectedNode = node;
    this.selectedNode.element.attr('class', 'selected');
  }

  setPosition(dx, dy) {
    if (!!this.selectedNode) {
      this.selectedNode.x = dx - this.selectedNode.width / 2;
      this.selectedNode.y = dy - this.selectedNode.height / 2;
      this.selectedNode.element.attr('transform', `translate(${dx}, ${dy})`);
    }
  }

  draw() {

  }
}

export default NetworkGraph;
