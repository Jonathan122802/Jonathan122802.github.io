let sptTree = new Set([0]);
let distances = new Map([[0, 0]])
let currentNeighbors = new Map();
const neighbors = new Map([[0, [1, 2, 3]], [1, [2, 4]], [2, [1, 3, 5]], [3, [2, 6]], [4, [5, 7]], [5, [4, 6, 7]], [6, [5, 7]]]);
let currentNode = 0;
let tmpNeighbors = 0;

randomText();

function randomText() {
    for (let i = 1; i < 8; i++) {
        document.getElementById(i).innerHTML = Math.floor(Math.random() * 9) + 1;
    }
    run();
}

function dijkstra() {
    currentNode = Array.from(sptTree)[sptTree.size - 1];
    if (currentNode == 7) {
        return;
    }
    tmpNeighbors = neighbors.get(currentNode);

    for (let i = 0; i < tmpNeighbors.length; i++) {
        if (!sptTree.has(tmpNeighbors[i])) {
            let distance = distances.get(currentNode) + parseInt(document.getElementById(tmpNeighbors[i]).innerHTML);
            if (currentNeighbors.has(tmpNeighbors[i])) {
                if (distance < currentNeighbors.get(tmpNeighbors[i])) {
                    currentNeighbors.set(tmpNeighbors[i], distance);
                }
            }
            else {
                currentNeighbors.set(tmpNeighbors[i], distance);
            }
        }
    }

    let smallestDistance = [0, 10000];
    for (const d of currentNeighbors.entries()) {
        if (smallestDistance[1] > d[1]) {
            smallestDistance = d;
        }
    }

    currentNeighbors.delete(smallestDistance[0]);

    distances.set(smallestDistance[0], smallestDistance[1]);
    sptTree.add(smallestDistance[0]);
}

function run() {
    while (true) {
        dijkstra();
        if (currentNode == 7) {
            break;
        }
    }
    document.getElementById("result").innerHTML = "The length of the shortest path is " + distances.get(7);

    sptTree = new Set([0]);
    distances = new Map([[0, 0]])
    currentNeighbors = new Map();
}
