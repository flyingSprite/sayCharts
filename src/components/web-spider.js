
import WebSpiderPoint from './../utils/base-point.js'
import MultiLayout from './multi-layout.js';

class WebSpider{

    constructor(director){
        this.director = director;
        this.center = {
          x: this.director.width / 2,
          y: this.director.height / 2
        };
        this.scale = 1;
        this.dx = this.center.x;
        this.dy = this.center.y;
        this.segments = 12;
        this.r = (this.center.x > this.center.y) ? this.center.y : this.center.x;
        this.defaultTierR = 40;
        this.tierR = 30;
        this.tiers = ( this.r - this.defaultTierR) / this.tierR;
        this.layout = new MultiLayout().centerLayout(this.director);
        this.initPositions();
        this.dashedBranchCreator(this.posititions, this.segments, this.tiers);
        this.dashedTierCreator(this.posititions);
        this.dashedPointCreator(this.posititions);
        this.zoom();
        this.drag();
    }

    drag () {
        var dx = this.center.x, dy = this.center.y;
        var drag = d3.behavior.drag()
            .on('drag', (d) => {
                this.dx += d3.event.dx;
                this.dy += d3.event.dy;
                this.layout.attr('transform',
                  'translate(' + this.dx  + ', ' + this.dy + ')scale(' + this.scale + ')');
            });
        this.director.scene.call(drag);
    }

    zoom () {
        var zoom = d3.behavior.zoom()
            .scaleExtent([0.1, 10])
            .on('zoom', () => {
                this.scale = d3.event.scale;
                this.layout.attr('transform',
                  'translate(' + this.dx  + ', ' + this.dy + ')scale(' + this.scale + ')');
            });
        this.director.scene.call(zoom);
    }

    // 获取绘制一个虚拟的蜘蛛网🕸️所需要的点
    initPositions () {
        var posititions = {
            center : {x: 0, y: 0},
            branchs : [],
            nodes: []
        };

        // Get branch top positition
        for (var i = 0; i < this.segments; i ++) {
            var theta = ((2 * Math.PI) / this.segments) * i;
            var branchPosi = {
              x: this.r * Math.cos(theta),
              y: this.r * Math.sin(theta),
            };
            posititions.branchs.push(branchPosi);
        }

        /**
        * Get node from net.
        *
        *   [
        *       [{}, {}, {}, {}, {}, {}, {}, {}]
        *
        *       this.info.defaultTiers
        *
        *       [{}, {}, {}, {}, {}, {}, {}, {}]
        *   ]
        */
        for (var i = 0; i < this.tiers; i ++) {
            var tierPosi = [];
            var newTierR = this.tierR * i + this.defaultTierR;
            for (var j = 0; j < this.segments; j ++) {
              var theta = ((2 * Math.PI) / this.segments) * j;
              var nodePosi = {
                x: newTierR * Math.cos(theta),
                y: newTierR * Math.sin(theta),
              };
              tierPosi.push(nodePosi);
            }
            posititions.nodes.push(tierPosi);
        }
        this.posititions = posititions;
    }

    dashedBranchCreator (posititions, segments, tiers) {
        var branchPosititions = posititions.branchs;
        var nodePosititions = posititions.nodes;
        var lines = [];

        for ( var i = 0; i < tiers; i ++ ) {
          for (var pos = 0; pos < segments; pos ++) {
            var prevPositition = (i === 0) ? {x: 0, y: 0}
              : nodePosititions[i - 1][pos];
            var positition = nodePosititions[i][pos];
            var line = this.dashednetBeelineCreator(prevPositition, positition);
            lines.push(line);
          }
        }

        var lastTier = nodePosititions[nodePosititions.length - 1];
        for (var pos = 0; pos < segments; pos ++) {
          var prevPositition = lastTier[pos];
          var positition = branchPosititions[pos];
          var line = this.dashednetBeelineCreator(prevPositition, positition);
          lines.push(line);
        }
    }

    dashednetBeelineCreator(prevPositition, positition) {
      var line = {
        one: prevPositition,
        two: positition,
        path: this.layout.append('polyline')
                .attr('points', [[prevPositition.x, prevPositition.y],
                                 [positition.x, positition.y]])
      };
      return line;
    }

    dashedTierCreator(posititions) {
        var nodePosititions = posititions.nodes;
        var lines = [];
        for(var i = 0; i < nodePosititions.length; i ++){
          var tierPosititions = nodePosititions[i];
          var prevPositition = tierPosititions[0];
          var isFisrt = true;
          //for (var positition in tierPosititions) {
          for(var j = 0; j < tierPosititions.length; j ++){
            var positition = tierPosititions[j];
            if (!isFisrt) {
              var line = this.dashednetBeelineCreator(prevPositition, positition);
              prevPositition = positition;
              lines.push(line);
            } else {
              isFisrt = false;
            }
          }
          var line = this.dashednetBeelineCreator(tierPosititions[0], tierPosititions[tierPosititions.length - 1]);
        }
    }

    dashedPointCreator (posititions) {
        var nodePosititions = posititions.nodes;
        var allPosititions = [];
        for(var i = 0; i < nodePosititions.length; i ++ ){
          allPosititions = allPosititions.concat(nodePosititions[i]);
        }
        var nodes = [];
        for(var i = 0; i < allPosititions.length; i ++ ){
          var node = this.dashednetNodeCreator(allPosititions[i]);
          nodes.push(node);
        }
    }

    dashednetNodeCreator (positition) {
        var node = {
          positition: positition,
          point: this.layout.append('circle')
            .attr('class', 'node-dashednet')
            .attr('cx', positition.x)
            .attr('cy', positition.y)
            .attr('r', 5)
        };
        return node;
    }

}

export default WebSpider;