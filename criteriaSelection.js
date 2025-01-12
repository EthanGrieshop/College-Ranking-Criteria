var weights = new Map();
var container = document.getElementById("Set Criteria");

weights.set("Low Acceptance Rate", 0);
weights.set("High Median SAT", 0);
weights.set("Large School Size", 0);
weights.set("Small School Size", 0);
weights.set("Competitive Sports", 0);

var keys = Array.from(weights.keys());
for (var key in keys) {
    var newSelection = document.createElement("div");
    newSelection.id = keys[key] + " container";
    newSelection.className = "selection-text selection-box";
    newSelection.innerHTML = keys[key];
    
    container.append(newSelection);

    var currentContainer = document.getElementById(keys[key] + " container");
    var sliderContainer = document.createElement("div");
    sliderContainer.className = "slide-container";
    sliderContainer.id = keys[key] + " slide container";

    currentContainer.append(sliderContainer);
    currentContainer = document.getElementById(keys[key] + " slide container");

    var slider = document.createElement("input");
    slider.type = "range";
    slider.min = 0;
    slider.max = 10;
    slider.value = 0;
    slider.className = "slider";
    slider.id = keys[key] + " slider";

    slider.oninput = function() {
        var a = this.id.slice(0,this.id.length-7);
        updateWeights(a, this.value);
        rankFrontEnd(computeRankings());
    }

    currentContainer.append(slider);
}

/**
 * @returns A set containing all current weight names and their values 
 */
function getCurrentWeights() {
    return weights;
}

/**
 * Called after an event listener, updates weights based on user input
 */
function updateWeights(weight, value) {
    weights.set(weight, value);
}