# React Notes

## State
1. It is better to pass functions into setState() rather than values. This is because state is Asyncronous and you don't want to directly change it in the component code. Passing a function in is like passing in a command to change the state, but it enters an orderly queue in the setState() function, avoiding corruption.
    2. To better visualize this `onClick="() => setState(state + 1)"` is bad because when `state` is mentioned, the program reads it and then increments it and sends the new value to `setState`. During the time when it reads, increments and sends the value, another function could have changed it, meaning that the value `state + 1` could be outdated.

## eventListeners 
1. Some event listeners exist by default like the `oneClick` attribute. You set these attributes to a function that will be called when said event occurs.

## Components (Basically HTML functions)
1. One of the basic ideas of React are components. These are JSX functions that return HTML. The first parameter of the function is an object that contains all of the attributes of the HTML element. 

**Example**
```
function App(){
    return(
        <MyComponent attribute1="foo" attribute2="bar" />
    )
}

function MyComponent(attributes){
    <p>attributes.attribute1</p>
    <p>attributes.attribute2</p>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

```

## Extra Javascript stuff

#### The javascript console:
1. This is where you log things and it has some useful commands...
    1. console.log(string-to-log, extra-parameters) is useful. You can insert extra parameters with the `%` operator: `%s` for string and `%c` for CSS
    2. `console.time('timer-name')` starts a timer that ends with `console.timeEnd('timer-name')`
    3. `console.count('counter-name')` adds to the 'counter-name' variable and prints the current value (like a debug TRACE statement)

#### Javascript functions
1. Functions in javascript are funny because they don't need to be named. In fact arrow functions (() => ; syntax) are super common. 
2. Javascript functions can access variables from their definition scope using the `this` keyword (this.varNameInDefinition). Super useful for creating mini "global" variables for any anonymous function.
    1. This is called "closure" and is super useful in react since you are passing lots of potentially anonymous functions into HTML contexts far away from their definitions.