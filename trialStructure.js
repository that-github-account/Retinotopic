function getRandomIntInclusive(min, max) { //generates random integers inclusive of range values
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

function genAngles(n_angles) { //generates a semi-random list of angles with as little repetition as possible 
    var angles = [];

    var sets_to_run = Math.floor(n_angles / 360);
    var remainder = n_angles - (360 * sets_to_run);


    while (angles.length < remainder) {
        var angle = getRandomIntInclusive(0, 360);
        if (!(angle in angles)) {
            angles.push(angle);
        };
    };

    if (sets_to_run > 0) {
        for (let sets = 0; sets < sets_to_run; sets++) {
            var set = angles360();
            for (let items = 0; items < set.length; items++) {
                angles.push(set[items]);
            };
        };
    };
    return angles;
};

function angles360() { //generates a random, non-repetative list of 360 angles
    var angles = [];
    while (angles.length < 360) {
        var angle = getRandomIntInclusive(0, 360);
        if (!(angle in angles)) {
            angles.push(angle);
        };
    };
    return angles;
};

function generateRangeOverlap(increments) { //generates a range of overlap according to specified increments, resulting array is in percentiles
    let sequence = [0];
    let n = 1 / increments;
    for (let i = 0; i < n; i++) {
        sequence.push(sequence[sequence.length - 1] + increments);
    }
    return sequence;
};

function generateRangeLocation(blockSize) {
    if (blockSize % 2 !== 0) {
        return "The block size is not even so cannot run the experiment!";
    };

    let positions = [];
    while (positions.length < blockSize) {
        if (positions.length < blockSize / 2) {
            positions.push("left");
        } else {
            positions.push("right");
        };
    };
    return positions;
};

function compileTrialStructure(increments, nBlocks, blockSize) {
    var trialDict = {};

    for (let n = 0; n < nBlocks; n++) { //repeat the following for each block of trials
        var positions = generateRangeLocation(blockSize);
        var rangeOverlapLeft = generateRangeOverlap(increments);
        var rangeOverlapRight = generateRangeOverlap(increments);

        for (let i = 0 + (((1 / increments + 1) * 2) * n); i < blockSize + (((1 / increments + 1) * 2) * n); i++) {

            var locationIndex = Math.floor(Math.random() * positions.length);
            var location = positions[locationIndex];
            positions.splice(locationIndex, 1);

            if (location === "left") {
                var overlapIndex = Math.floor(Math.random() * rangeOverlapLeft.length);
                var overlap = rangeOverlapLeft[overlapIndex];
                rangeOverlapLeft.splice(overlapIndex, 1);
            };

            if (location === "right") {
                var overlapIndex = Math.floor(Math.random() * rangeOverlapRight.length);
                var overlap = rangeOverlapRight[overlapIndex];
                rangeOverlapRight.splice(overlapIndex, 1);
            };

            trialDict[i] = { overlap: overlap, location: location };
        };
    };

    return trialDict;
};
