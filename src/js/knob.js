import drawSector from './draw-sector.js'
import TweenLite from "gsap/TweenLite";
import Draggable from "gsap/Draggable";

export default function knob(modal) {
    let knob = modal.querySelector(".circle-indicator__control-knob");
    let value = modal.querySelector(".circle-indicator__value");
    let input = modal.querySelector(".range-slider__slider");
    let status = modal.querySelector('.modal-content__status-info-value');
    let svg = modal.querySelector('svg');

    function killTweens() {
        TweenLite.killTweensOf(knob);
    }

    function onRotateKnob() {
        let percent = dragKnob.endRotation / 3; //console.log(percent);
        let lowBound = 0, highBound = 100;
        // limit percent in 0 and 100 range
        percent = Math.max(lowBound, Math.min(percent, highBound)); //console.log(percent);

        svg.dataset.percent = percent;
        drawSector(modal);
        if( percent <= 4) {
            input.value = 0;
            value.textContent = '0';
            status.textContent = value.textContent;
        } else if (percent >= 96) {
            input.value = 30;
            value.textContent = '+30';
            status.textContent = value.textContent;
        } else {
            input.value = ((30 * percent) / 100).toFixed(0);
            value.textContent = '+' + ((30 * percent) / 100).toFixed(0);
            status.textContent = value.textContent;
        }

    }

    //create the knob Draggable
    Draggable.create(knob, {
        type: "rotation",
        throwProps: true,
        edgeResistance: 0.85,
        bounds: {minRotation: 2, maxRotation: 302},
        onDragStart: killTweens,
        onDrag: onRotateKnob,
        onThrowUpdate: onRotateKnob
    });


    let dragKnob = Draggable.get(knob); // for easy access
}

