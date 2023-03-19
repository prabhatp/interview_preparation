//Output based questions.
//1. 
console.log("Start");

const promise1 = new Promise((resolve, reject) => {
    console.log(1);
    resolve(2);
})

promise1.then((res) => {
    console.log(res);
});

console.log("End");

/* 
Output: 
    Start
    1
    End
    2
*/

// reason: synchronous code run first then after asynchronous code.

//2. 
console.log("Start");

const promise2 = new Promise((resolve, reject) => {
    console.log(1);
    resolve(2);
    console.log(3);
})

promise2.then((res) => {
    console.log(res);
});

console.log("End");

/* 
Output: 
    Start
    1
    3
    End
    2
*/

//3.
console.log("Start");

const promise3 = new Promise((resolve, reject) => {
    console.log(1);
    console.log(3);
})

promise3.then((res) => { // Since there is no any resolve inside the Promise so it will not be executed.
    console.log(res);
});

console.log("End");

/*
Output:
    Start
    1
    3
    End
*/

// 4. 
console.log("Start");

const fn = () => {
    return new Promise((resolve, reject) => {
        console.log(1);
        resolve("success");
    })
}
console.log("middle");
fn().then((res) => {
    console.log(res);
})

console.log("End");

/*
Output:
    Start
    middle
    1
    End
    Success
*/

//5.
function job() {
    return new Promise(function(resolve, reject){
        reject();
    });
}

let promise = job();

promise.then(function(){
    console.log("success");
}).then(function(){
    console.log('Success 2');
}).then(function(){
    console.log("Success 3");
}).catch(function() {
    console.log("Error 1");
}).then(function() {
    console.log("Success 4");
})

/* 
Output:
Error 1
Success 4
*/

// 6.
function job(state) {
    return new Promise(function(resolve, reject){
        if (state) {
            resolve("success");
        } else {
            reject("error");
        }
        
    });
}

let promise = job(true);

promise.then(function(data){
    console.log(data);
    return job(false);
}).catch(function(error) {
    console.log(error);
    return "Error caught";
}).then(function(data) {
    console.log(data);
    return job(true);
}).catch(function(error) {
    console.log(error);
})

/*
Output:
success
error
Error caught
*/

// 7.
function job(state) {
    return new Promise(function(resolve, reject){
        if (state) {
            resolve("success");
        } else {
            reject("error");
        }
        
    });
}

let promise = job(true);

promise.then(function(data){
    console.log(data);
    return job(true);
}).then(function(data) {
    if (data !== 'victory') {
        throw "Defeat"; // this is rejected promise
    }
    return job(true);
}).then(function(data) {
    console.log(data);
}).catch(function(error) {
    console.log(error);
    return job(false);
}).then(function(data) {
    console.log(data);
    return job(true);
}).catch(function(error) {
    console.log(error);
    return "Error caught"; // this is not the rejected promise, its just for confused
}).then(function(data) {
    console.log(data);
    return new Error("test");  // this is not the rejected promise, its just for confused
}).then(function(data) {
    console.log('Success:', data.message);
}).catch(function(data) {
    console.log("Error", data.message);
})

/*
Output:
success
Defeat
error
Error caught
Success: test
*/

// 8.

const firstPromise = new Promise((resolve, reject) => {
    resolve("First!");
});

const secondPromise = new Promise((resolve, reject) => {
    resolve(firstPromise);
});

secondPromise.then(res => {
    return res;
}).then(res => console.log(res));

/**
 * Output:
 * First!
 */

//Question 9: Rewrite this example code using 'async/await' instead of 'then/catch'
function loadJson(url) {
    return fetch(url)
        .then((response) => {
            if (response.status == 200) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        });
}

loadJson('https://fakeurl.com/no-such-user.json').catch(err => console.log(err));

async function loadJson(url) {
    let response = await fetch(url);
    if (response.status == 200) {
        return await response.json();
    } 
    return new Error(response.status);
}

await loadJson('https://fakeurl.com/no-such-user.json').catch(err => console.log(err));

// Question 10: Solve Promise Recursively.
function importantAction(username) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve(`Subscribe to ${username}`);
        }, 1000);
    })
}

function likeTheVideo(video) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve(`Like the ${video} video`);
        }, 1000);
    })
}


function shareTheVideo(video) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve(`Share the ${video} video`);
        }, 1000);
    })
}

function promiseRecursive(funcPromises) {
    // Write Implementation Here
    if (funcPromises.length == 0) return;
    const currPromise = funcPromises.shift();
    currPromise.then((res) => {
        console.log(res);
    }).catch((error) => {
        console.log(error);
    })

    promiseRecursive(funcPromises);
}

promiseRecursive([
    importantAction("Roadside Coder"),
    likeTheVideo("Javascript Interview Question"),
    shareTheVideo("Javascript Interview Questions")
]);