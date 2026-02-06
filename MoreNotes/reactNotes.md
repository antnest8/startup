# React Notes

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