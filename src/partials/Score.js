import {SVG_NS} from '../settings';
//showing the score
export default class Score {
    constructor(x, y, size, anchor = 'middle') {
      this.x = x;
      this.y = y;
      this.size = size;
      this.anchor = anchor;
    }

  render(svg, score){
      let text = document.createElementNS(SVG_NS, 'text');
      text.setAttributeNS(null, 'x', this.x);
      text.setAttributeNS(null, 'y', this.y);
      text.setAttributeNS(null, 'font-family', '"Silkscreen Web", monotype');
      text.setAttributeNS(null, 'font-size', this.size);
      text.setAttributeNS(null, 'text-anchor', this.anchor);
      text.setAttributeNS(null, 'fill', 'white');
      text.textContent = score;

      svg.appendChild(text);
  }
} 