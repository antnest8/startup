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