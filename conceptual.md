### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
Call backs, Promises, Async/Await, Event Listeners, Observables
- What is a Promise?
 A promise is an object that may produce a single value some time in the future: either a resolved value or a reason that it’s not resolved. A promise may be in one of three possible states: fulfilled, rejected, or pending.
- What are the differences between an async function and a regular function?
Syntax: Async functions are defined using async keyword before the function declaration. This makes the function return a promise.
Behavior: Inside an async function, you can use the await keyword, which pauses the execution of the function until a promise is resolved or rejected.
Error Handling: In async functions, error handling can be done using try/catch blocks, unlike regular functions where callbacks and error-first patterns are common.
- What is the difference between Node.js and Express.js?
Node.js is a runtime environment for executing JavaScript code outside a web browser, essentially running JavaScript on the server-side.
Express.js is a framework that runs within a Node.js environment to simplify the process of building server-side applications. Express provides mechanisms to route HTTP requests, handle middleware, and more.
- What is the error-first callback pattern?
In Node.js, the error-first callback pattern is a convention where callbacks provided to asynchronous functions accept an error object as the first parameter and the response data as the second parameter. If an error occurs during the execution of the function, the error parameter is filled, otherwise, it is null.
- What is middleware?
Middleware are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. These functions can execute any code, make changes to the request and the response objects, end the request-response cycle, and call the next middleware function.
- What does the `next` function do?
The next function is a part of the middleware chain in frameworks like Express.js. When called, it passes control to the next middleware function in the stack.
- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
Performance: The function is inefficient because it waits for each HTTP request to complete before starting the next one. This increases the total time required to resolve all the requests. It would be faster to initiate all the requests simultaneously and then wait for all of them to complete.
Error Handling: There is no error handling. If any of the $.getJSON calls fail, the entire function will fail with an unhandled promise rejection.
Order in Return Array: The order of users in the returned array is [elie, matt, joel], which does not match the order in which requests were initiated. This might be intentional but could also be a mistake or cause confusion.
Hardcoding: The function hardcodes the usernames, which reduces reusability. It could be made more flexible by accepting usernames as parameters.