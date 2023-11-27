# Accessible Assistant
Accessible Assistant is a website that expands the usability of ChatGPT to those with various disabilities such as dyslexia.

# Code Structure
The code is structured with frontend and backend systems. The backend uses Flask (Python) and the frontend uses React.

## Frontend Structure
As with any React program, there is a `src` folder containing all the relevant code. A `components` folder will be for
storing different React components, such as a navbar, footer, side panel, chat boxes, forms, etc.

There is also a `pages` folder which will contain JSX files representing different pages. If you are designing
a particular page (i.e. a `Signup` page, `Login` page, etc.), define the page files in here. Try to use
components as much as possible, which will be stored in `components`, to improve reusability and scalability.

The only global content (as of now) is the navbar and footer, to prevent rerendering components.

There is also a `public` directory at the same level as the `src` directory. This will contain static assets.

## Backend Structure
This shall be done one day!