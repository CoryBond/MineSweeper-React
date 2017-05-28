MineSweeper

A project making MineSweeper with React!

Dependencies:

    The only real dependency you will need, is to instal npm/node and then use that to install
    your external dependencies. 
    For Mac users you can type in "brew install node" to get node.
    If your Mac doesn't have "homebrew" installed then follow the instructions on the homebrew website:
    "https://brew.sh/" or use enter "/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    into your terminal.
    For PC users I recommend first downloading a nice CLI tool simular to the one that Visual Studio Code
    has. Once you do you can either install node from Visual Studio Code or manually install it from:
    "https://code.visualstudio.com/." Downloaded it then type in ctr+` to open the cli. 
    To install npm on visual studio code type in ctr+p and enter "ext install npm script runner."

    Once you have node properly installed you have to do is "cd" into the current directory
    in which the project was unziped. Once there you can type npm install and all of the external
    dependencies in package.json will be auto-installed for you.

    A new folder called node_modules should be made and filled with various libraries if you 
    succeeded.
    
Build Instructions:
    
    After you install your dependencies you type in "npm run build" to run the npm script 
    that builds the bundle.js the application uses. If all goes well you should not see
    any errors.

    Note: You can probably skip this step if you run the webpack server as it is set
    to automatically compile bundle.js at runtime.

Run Instructions:
    
    This project was primarily made to work in a server environment so you will
    have to run the webpack server to get the project to work.
    Type in "npm start" to kick off the server and go to url "localhost:8080"
    to begin the project.