
function quickSort(arr) {
    if (arr.length <= 1) {
        return { sortedArray: arr, comparisons: { bestCase: 0, averageCase: 0, worstCase: 0 } };
    }

    const pivot = arr[0];
    const left = [];
    const right = [];
    let comparisons = { bestCase: 0, averageCase: 0, worstCase: 0 };

    for (let i = 1; i < arr.length; i++) {
        comparisons.bestCase++;
        comparisons.averageCase++;
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    const leftResult = quickSort(left);
    const rightResult = quickSort(right);

    return {
        sortedArray: [...leftResult.sortedArray, pivot, ...rightResult.sortedArray],
        comparisons: {
            bestCase: comparisons.bestCase + leftResult.comparisons.bestCase + rightResult.comparisons.bestCase,
            averageCase: comparisons.averageCase + leftResult.comparisons.averageCase + rightResult.comparisons.averageCase,
            worstCase: comparisons.worstCase + leftResult.comparisons.worstCase + rightResult.comparisons.worstCase,
        },
    };
}
function updateResult(name, sortedArray, comparisons, timeTaken) {
    const result = {
        name,
        sortedArray,
        bestCaseComparisons: comparisons.bestCase,
        averageCaseComparisons: comparisons.averageCase,
        worstCaseComparisons: comparisons.worstCase,
        timeTaken,
    };

    displayResults(result);

    // Add code here to update the visualization with sortedArray data
}


function bubbleSort(arr) {
    const n = arr.length;
    let comparisons = { bestCase: 0, averageCase: 0, worstCase: 0 };
    let swapped;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;

        for (let j = 0; j < n - i - 1; j++) {
            comparisons.bestCase++;
            comparisons.averageCase++;
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }

        if (!swapped) {
            break;
        }
    }

    comparisons.worstCase = comparisons.averageCase;
    return { sortedArray: arr, comparisons };
}

function mergeSort(arr) {

function merge(left, right) {
    let comparisons = { bestCase: 0, averageCase: 0, worstCase: 0 };
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        comparisons.bestCase++;
        comparisons.averageCase++;
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return {
        sortedArray: result.concat(left.slice(leftIndex), right.slice(rightIndex)),
        comparisons,
    };
}

    if (bubbleSortCheckbox.checked) {
        updateChat("Running Bubble Sort...");
        const bubbleSortResult = runSortingAlgorithm("Bubble Sort", bubbleSort, numbers);
        results.push(bubbleSortResult);
        updateChat("Bubble Sort completed.");
    }

    if (mergeSortCheckbox.checked) {
        updateChat("Running Merge Sort...");
        const mergeSortResult = runSortingAlgorithm("Merge Sort", mergeSort, numbers);
        results.push(mergeSortResult);
        updateChat("Merge Sort completed.");
    }

    displayResults(results);
    updateChat("Comparison completed.");
}

function runSortingAlgorithm(name, algorithm, inputArray) {
    const startTime = performance.now();
    const { sortedArray, comparisons } = algorithm([...inputArray]);
    // Delay the time measurement to ensure the sorting is completed.
    setTimeout(() => {
        const timeTaken = performance.now() - startTime;
        updateResult(name, sortedArray, comparisons, timeTaken);
        visualizeSorting(sortedArray, name);  // Pass algorithm name for color coding
    }, 0);
}

function updateResult(name, sortedArray, comparisons, timeTaken) {
    const result = {
        name,
        sortedArray,
        bestCaseComparisons: comparisons.bestCase,
        averageCaseComparisons: comparisons.averageCase,
        worstCaseComparisons: comparisons.worstCase,
        timeTaken,
    };

    // Display results in the table
    displayResults(result);

    // Visualize the sorting process
    visualizeSorting(sortedArray);
}

function visualizeSorting(sortedArray, algorithmName) {
    // Clear previous visualization
    const visualizationDiv = document.getElementById("sortingGraphVisualization");
    visualizationDiv.innerHTML = "";

    // Set up the SVG container for the graph
    const svg = d3.select("#sortingGraphVisualization")
        .append("svg")
        .attr("width", 500)
        .attr("height", 300);

    // Define color for each algorithm
    const color = getColorForAlgorithm(algorithmName);

    // Create rectangles for each element in the array
    const rects = svg.selectAll("rect")
        .data(sortedArray)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 30)
        .attr("y", (d) => 300 - d * 5)  // Adjusted for better visualization
        .attr("width", 20)
        .attr("height", (d) => d * 5)  // Adjusted for better visualization
        .attr("fill", color);

    // Add text labels
    svg.selectAll("text")
        .data(sortedArray)
        .enter()
        .append("text")
        .text((d) => d)
        .attr("x", (d, i) => i * 30 + 10)
        .attr("y", (d) => 290 - d * 5)  // Adjusted for better visualization
        .attr("text-anchor", "middle")
        .attr("fill", "white");
}

function getColorForAlgorithm(algorithmName) {
    // Define colors for each algorithm
    const colors = {
        "Quick Sort": "blue",
        "Bubble Sort": "green",
        "Merge Sort": "orange",
    };

    // Return the color for the given algorithm
    return colors[algorithmName] || "black";
}


function updateResult(name, sortedArray, comparisons, timeTaken) {
    const result = {
        name,
        sortedArray,
        bestCaseComparisons: comparisons.bestCase,
        averageCaseComparisons: comparisons.averageCase,
        worstCaseComparisons: comparisons.worstCase,
        timeTaken,
    };
    displayResults(result);
}

