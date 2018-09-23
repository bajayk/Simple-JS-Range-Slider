console.log("range-slider js loaded...");
class RangeSlider {

    // Constructor
    constructor(options) {
        this.id = options.id;
        this.element = document.getElementById(this.id);

        // Get the slider handle
        this.handle = this.element.getElementsByClassName("handle")[0];

        // Add mouse down event to slider handle
        this.handle.addEventListener("mousedown", this.on_handle_pressed.bind(this));

        // Set minimum and maximum bound of moving handle.
        // Minimum bound will be 0. So handle will not go outside of the slider from left side      
        this.minbound = 0;

        // Maximum bound should be set as witdth of the range slider minus handle width. So handle 
        // will not go outside of the slider from right side.
        this.maxbound = this.element.getBoundingClientRect().width - this.handle.getBoundingClientRect().width;
    }

    // Handle pressed handler
    on_handle_pressed(e) {

        // Get the pressed handle DOM
        this.handle = e.currentTarget;
        
        // Bind this class to move and up handlers. So in up handler it can be removable.
        this.binded_on_handle_move = this.on_handle_move.bind(this);
        this.binded_on_handle_up = this.on_handle_up.bind(this);

        // Add mouse move and mouse up event to document to move slider handle and stop handle.
        document.addEventListener("mousemove", this.binded_on_handle_move);
        document.addEventListener("mouseup", this.binded_on_handle_up);

    }

    // Handle move handler
    on_handle_move(e) {

        // Get the movement X of mouse pointer
        var movementX = e.movementX;

        // Get the handle current relative position
        var left = this.handle.offsetLeft;

        // Add mouse x movement and handle left postion
        left = left + movementX;

        // Set the value to handle x position
        if (left >= this.minbound && left <= this.maxbound) {
            this.handle.style.left = left + "px";
        }
    }

    // Handle stop handler
    on_handle_up(e) {
        // Stop handle movement by removing events from document.
        document.removeEventListener("mousemove", this.binded_on_handle_move);
        document.removeEventListener("mouseup", this.binded_on_handle_up);
    }
}