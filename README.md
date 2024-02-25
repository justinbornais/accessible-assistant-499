# Accessible Assistant
Accessible Assistant is a website that expands the usability of ChatGPT to those with various disabilities such as dyslexia.

## Prerequisites
Be sure to install [Node JS](https://nodejs.org/) and [Python](https://www.python.org/downloads/), but make sure you have anywhere from versions 3.9 to 3.11. No older than 3.9 and no newer than 3.11.

To get TTS working, be sure to also install [C++14 or newer from Visual Studio](https://visualstudio.microsoft.com/downloads/).

## Setup Code
After cloning this repository, install all dependencies for the frontend and backend systems.

### Frontend
Simply run the following commands in the terminal to install the dependencies:
```cmd
cd frontend
npm ci
```

### Backend
To install everything without a virtual environment (this may or may not work depending on your setup), run the following in the terminal:
```cmd
cd backend
pip install -r requirements.txt
```

To install with a virtual environment, run the following in the terminal **in the root directory** (not in the `backend` directory, or VSCode intellisense won't work):
```cmd
pip install virtualenv # If you have Python 3.11.0 installed (recommended), run py -3.11 -m pip install virtualenv instead.
venv ./venv # Similarly, py -3.11 -m venv ./venv
.\venv\Scripts\activate # Run in command prompt, not in Powershell.

cd backend
pip install -r requirements.txt # Installs all dependencies.
pip install -e ./TTS # Installs the TTS submodule.
```

Errors about "conflicting dependencies" should not cause runtime issues. However, if you're using the incorrect version of Python (specified above), or if you're missing C++14 or higher, then you may get a more serious error that prevents TTS from being installed.

## Run Project
You will need two terminals open to run the project. The first should be in the `frontend` directory, the second being in the `backend` directory (and in your virtual environment if you have one set).

In the `frontend` terminal, run `npm run start`. In the `backend` terminal, run `python main.py`.
- **Note:** The first time running `main.py` may take some time in order to download the voice model.

## Code Structure
The code is structured with frontend and backend systems. The backend uses Flask (Python) and the frontend uses React.

### Frontend Structure
As with any React program, there is a `src` folder containing all the relevant code. A `components` folder will be for
storing different React components, such as a navbar, footer, side panel, chat boxes, forms, etc.

There is also a `pages` folder which will contain JSX files representing different pages. If you are designing
a particular page, define the page files in here. Try to use components as much as possible, which will be stored
in `components`, to improve reusability and scalability.

The only global content (as of now) is the navbar and footer, to prevent rerendering components.

There is also a `public` directory at the same level as the `src` directory. This will contain static assets.

### Backend Structure
This shall be done one day!