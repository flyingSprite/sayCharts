
import BasicComponent from './basic';
import StandardLayout from './standardLayout';

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
    d3.xml(CONFIG.svgPath + name, 'image/svg+xml', function(error, xml) {
      if (error) {
        throw error;
      }
      let importedNode = document.importNode(xml.documentElement, true);
      let svgGroup = self.group.append('g');
      // Add svg file in svgGroup
      svgGroup.select(function() {
        this.appendChild(importedNode.cloneNode(true));
      });
      svgGroup.attr('transform', `translate(${dx}, ${dy})`);
      const newName = name + new Date(). getTime();
      self.nodes[newName] = {
        x: dx,
        y: dy,
        name: newName,
        element: svgGroup
      };
      self.addEvents(self.nodes[newName]);
    });
  }

  addEvents(node) {
    const self = this;
    node.element.on('click', function () {
      self.selected(node);
      self.director.touchClickEvent(node);
    });
    const drag = d3.behavior.drag().on('drag', function() {
      // d3.select(this).attr('transform', `translate(${d3.event.x}, ${d3.event.y}`);
    });
    node.element.call(drag);
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
      this.selectedNode.x = dx;
      this.selectedNode.y = dy;
      this.selectedNode.element.attr('transform', `translate(${dx}, ${dy})`);
    }
  }

  draw() {

  }
}

export default NetworkGraph;
