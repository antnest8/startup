# CSS Notes
1. Css is kind of like a json file that determines rules for a certain classes or elements in HTML
2. You can either create local CSS styling with the `style` attribute inside any HTML element, or better yet add css normally at the head of the document either through the `<style>` element or linking an external file.
3. In CSS everything is boxes, but there are even boxes inside of those boxes (hahaha). Every element has the content box, the padding box, the border box and the margins box. I think that all of these can completely overlap eachother  but each one has certain properties tied to it...
    1. The content box has all the text and other content
    2. The padding box has the background color
    3. The border box has the borders and generally represents the edge of the content
    4. The margins is an external box that defines whitespace around the element.
4. Colors can use both hex `#ffa892` or rgb function `rgb(43, 208, 46)`!

## Bootstrap and Tailwind
1. Bootstrap basically gives a premade CSS file that you can use (by just adding the classes to HTML elements)
2. Tailwind has a compiler sort of thing (a toolchain?) that generates CSS files based on html attributes added.
    1. Tailwind is much lower-level coding so it is more efficient and flexible (like c++ compared to Python) but is not as "out of the box" as bootstrap is.