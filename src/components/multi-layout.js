

class MultiLayout {

    centerLayout(director) {
        let width = director.width / 2;
        let height = director.height / 2;
        return director.scene.append('g')
           .attr('transform', 'translate(' + width + ', ' + height + ')');
    }
}

export default MultiLayout;