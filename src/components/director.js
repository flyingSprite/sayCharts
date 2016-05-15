
import CenterPoint from './center-point.js';
import WebSpider from './web-spider.js';

class Director{

    constructor(id) {
        // 创建一个SVG，占据整个div
        this.scene = d3.select('#' + id).append('svg')
                .style('width', '100%')
                .style('height', '100%');
        // 获取SVG的宽
        this.width = parseInt(this.scene.style('width').replace('px', ''));
        // 获取SVG的高
        this.height = parseInt(this.scene.style('height').replace('px', ''));
    }

    centerPoint () {
        // 创建一个中心点
        this.centerPoint = new CenterPoint(this);
    }

    webSpider () {
        // 创建一个虚拟的蜘蛛网🕸️
        this.webSpider = new WebSpider(this);
    }
}

export default Director;
