Change++ Coding Challenge 2023 - ekreb
Author: Steven Yi
Email: siyuan.yi@vanderbilt.edu

PREREQUISITES
-------------
Node.js - download at https://nodejs.org/en

INSTALLATION
------------
1. Clone this repository
	git clone https://github.com/ChangePlusPlusVandy/change-coding-challenge-2023-stevenysy.git
2. Navigate to the project directory
	cd change-coding-challenge-2023-stevenysy
3. Navigate to the backend directory and install the backend Node dependencies
	cd ekreb-backend
	npm install
4. Start the backend development server
	npm run dev
5. In a NEW terminal, navigate to the frontend directory and install the frontend Node dependencies
	cd change-coding-challenge-2023-stevenysy
	cd ekreb-frontend
	npm install
6. Start the frontend development server
	npm run start
7. Navigate to http://localhost:3000 in your browser
8. Happy unscrambling!

DETAILS ABOUT THE APP
---------------------
1. The score for each word is calculated as 2^(number of letters in the word - number of hints the user got)
2. The max length of words fetched by the backend can be configured in config.js in the backend. The time limit for each guess and the hint frequency can be configured in config.js in the frontend.

REFLECTION
----------
I learned a lot and had a lot of fun from building this small game! I have never built an API using Node and Express and have never built a frontend using React before, and using these tools to build an actual project was a really different experience compared to the past class assignment programs I wrote and even the vanilla javascript apps I made. In the beginning, I was overwhelmed by this difference in the beginning of development and didn't know how to get things started. However, as I saw some tutorials and understood the basic code that got the backend and the frontend running, the coding experience became more familiar and I was able to progress much quicker. The biggest challenge I encountered when completing this project is definitely getting the data flowing between components and styling the components, and it took a lot of googling for me to get them working. Thus, other than react and express, another big thing that this project taught me is utilizing online resources and documentation to solve problems I encounter during development.

If given more time and experience I would also love to implement these features:
1. handling the few words with spaces or apostrophes fetched from the Words API, either by a new scrambling function that scrambles the letters separated by the spaces or apostrophes separately, a new fetching function that makes sure words fetched have no spaces or apostrophes (I didn't figure out how to do this with the Words API), or just using a new API to fetch words.
2. change how the hint is rendered: instead of simply displaying that the word starts with a certain letter, I wanted an animation that shows the hint letter swapping with the first letter in the scrambled word and being highlighted to display the hint.
3. adopting a more organized architecture for the frontend so that not everything is cramming in App.js :,)
4. automatically focusing on the guessing textfield after clicking the hint button to improve UX.
5. asking the user to confirm they're giving up when there is already a scrambled word rendered and they click the get new word button to improve UX.
6. adding background music to the app.

Finally, I have no idea whether ekreb is a real word or not but my guess would be that it unscrambles to berke :)