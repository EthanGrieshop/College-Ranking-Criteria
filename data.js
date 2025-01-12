var colleges = new Map();

fetch("data.csv")
    .then((res) => res.text())
    .then((text) => {
        console.log("Success");
        console.log(text);
    })
    .catch((e) => console.error(e));

colleges.set("University of Toledo", {"Acceptance Rate": 90, "Median SAT": 1200, "School Size": 2000, "Competitive Sports": 1});
colleges.set("Stanford", {"Acceptance Rate": 3, "Median SAT": 1560, "School Size": 4000, "Competitive Sports": 6});
colleges.set("Ohio State", {"Acceptance Rate": 40, "Median SAT": 1400, "School Size": 30000, "Competitive Sports": 9});

/**
 * @returns The map containing all colleges and their attributes
 */
function getColleges() {
    return colleges;
}

/**
 * @param {String} currentWeight 
 * @returns A multiplier that causes almost all schools to fall on a 0-10 scale for this attribute
 */
function getWeightMultiplier(currentWeight) {
    switch (currentWeight) {
        case "Acceptance Rate": 
            return 1/10;
        case "Median SAT":
            return 4*10/1600;
        case "School Size":
            return 10/30000;
    }
    return 1;
}