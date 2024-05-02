// dieter whittingham
// apr 30 2024
// feedback.js

/**
 * get stars feedback function
 * @param {int} percentage
 * @returns a string of stars based on percentage
 */
export function getStars(percentage) {
    var output = "";
    const benchmarks = [0, 50, 70, 85, 95];
    for (var val of benchmarks) {
        if (percentage >= val) {
            output += "⭐";
        }
    }
    return output;
}
