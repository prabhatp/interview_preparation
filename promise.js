//Output based questions
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