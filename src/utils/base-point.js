

class WebSpiderPoint{

    constructor(segments, r, tierR, tiers){
        this.segments = segments;
        this.r = r;
        this.defaultTiers = 50;
        this.tierR = tierR;
        this.tiers = tiers;
    }

    posititionGenerator () {
        var segments = this.segments,
          r = this.r,
          defaultTiers = this.defaultTiers,
          tierR = this.tierR,
          tiers = this.tiers;
        // Default posititions
        var posititions = {
            center : {x: 0, y: 0},
            branchs : [],
            nodes: []
        };

        // Get branch top positition
        for (var i = 0; i < segments; i ++) {
            var theta = ((2 * Math.PI) / segments) * i;
            var branchPosi = {
              x: r * Math.cos(theta),
              y: r * Math.sin(theta),
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
        for (var i = 0; i < tiers; i ++) {
            var tierPosi = [];
            var newTierR = tierR * i + defaultTierR;
            for (var j = 0; j < segments; j ++) {
              var theta = ((2 * Math.PI) / segments) * j;
              var nodePosi = {
                x: newTierR * Math.cos(theta),
                y: newTierR * Math.sin(theta),
              };
              tierPosi.push(nodePosi);
            }
            posititions.nodes.push(tierPosi);
        }
        return posititions;
    }
}


export default WebSpiderPoint;
