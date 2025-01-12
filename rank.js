var rankDiv = document.getElementById("Rankings");
var colleges = getColleges();

/**
 * Orders the colleges in the given set based on their total points from prior evauation
 * @param {Set} sortingSet 
 * @returns An array with colleges in the correct order
 */
function sort(sortingSet) {
    return Array.from(sortingSet.keys()).sort((a,b) => {return sortingSet.get(a)["Score"]-sortingSet.get(b)["Score"];});
}

/**
 * @returns Schools ranked by the weights given by the user in an array
 */
function computeRankings() {
    var weights = getCurrentWeights();
    var rankedSet = colleges;
    var rankedKeys = Array.from(rankedSet.keys());

    for (var collegeNumber in rankedKeys) {
        rankedSet.get(rankedKeys[collegeNumber])["Score"] = 0;
    }

    var weightKeys = Array.from(weights.keys());
    for (var weight in weightKeys) {
        var doesInvertAttribute = false;
        var currentWeight = weightKeys[weight];
        switch (currentWeight) {
            case "Low Acceptance Rate":
                doesInvertAttribute = true;
                currentWeight = "Acceptance Rate";
                break;
            case "High Median SAT":
                currentWeight = "Median SAT";
                break;
            case "Large School Size":
                currentWeight = "School Size";
                break;
            case "Small School Size":
                currentWeight = "School Size";
                doesInvertAttribute = true;
                break;
        }

        for (var collegeNumber in rankedKeys) {
            var currentCollege = rankedKeys[collegeNumber];
            var multiply = 1
            if (doesInvertAttribute) {
                multiply = -1;
            }
            rankedSet.get(currentCollege)["Score"]+=rankedSet.get(currentCollege)[currentWeight]*weights.get(weightKeys[weight])*getWeightMultiplier(currentWeight)*multiply;
        }
    }

    return sort(rankedSet).reverse();
}

/**
 * Adds ranked colleges in order to the screen
 * @param {Array} rankedColleges Colleges in the correct order for presentation
 */
function rankFrontEnd(rankedColleges) {
    rankDiv.innerHTML = '';

    for (var i = 1; i <= rankedColleges.length; i++) {
        var collegeDiv = document.createElement("div");
        collegeDiv.id = rankedColleges[i-1];
        collegeDiv.className = "ranking-text ranking-box";
        collegeDiv.innerHTML = i + ". " + rankedColleges[i-1];

        rankDiv.appendChild(collegeDiv);
    }
}