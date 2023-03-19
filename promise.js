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