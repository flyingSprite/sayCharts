
import MultiLayout from './multi-layout.js';
import BasicComponent from './basic';


class CenterPoint extends BasicComponent{

  constructor(director){
    super(director);
    this.draw();
  };

  draw () {
    // 创建一个坐标原点为中心点的layout
    this.layout = new MultiLayout().centerLayout(this.director);
    // 创建一个中心点
    this.center = this.layout.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 5)
        .attr('class', 'node-point');
  };

  reCreate () {
    // 删除中心点layout
    this.layout.remove();
    // 重新创建中心点
    this.draw();
  };

  toFront () {
    this.reCreate();
  }

}

export default CenterPoint;
