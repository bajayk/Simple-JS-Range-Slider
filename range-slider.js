console.log("range-slider js loaded...");
class RangeSlider {

    // Constructor
    constructor(options) {
        this.id = options.id;
        this.element = document.getElementById(this.id);
        this.slider_bar = this.element.getElementsByClassName("slider-bar")[0];
        this.handle = this.element.getElementsByClassName("handle")[0];
        this.handle.addEventListener("mousedown", this.on_handle_pressed.bind(this));
        this.minbound = 0;
        this.maxbound = this.element.getBoundingClientRect().width - this.handle.getBoundingClientRect().width;
    }

    // Handle pressed handler
    on_handle_pressed(e) {

        this.handle = e.currentTarget;
        this.binded_on_handle_move = this.on_handle_move.bind(this);
        this.binded_on_handle_up = this.on_handle_up.bind(this);
        document.addEventListener("mousemove", this.binded_on_handle_move);
        document.addEventListener("mouseup", this.binded_on_handle_up);

    }

    on_handle_move(e) {
        var movementX = e.movementX;
        var left = this.handle.offsetLeft;
        left = left + movementX;

        if (left >= this.minbound && left <= this.maxbound) {
            this.handle.style.left = left + "px";
        }
    }

    on_handle_up(e) {
        document.removeEventListener("mousemove", this.binded_on_handle_move);
        document.removeEventListener("mouseup", this.binded_on_handle_up);
    }
}