Connect 4
Author: Vernon Reis
Livesite: www.vernonreis.com
Installation Instructions: Simply navigate to the livesite URL in your web browser.


Technologies Utilized:
-HTML
-CSS
	-Media Queries
	-Dynamic Resizing
	-Mobile Optimization
	-Modals
	-Keyframe Animation
-Javascript
-JQuery
-JQuery UI
	-Animations


The first step I took when constructing my game was to create a game board that had the basic layout I wanted before getting into any of the javacript.
In order to do this I created a basic layout of a top div containing the title of the game and a container that would house the gameboard and
a sidebar which would have planned dificulty menu and board reset buttons.  To determine the success of my stying I created a basic div layout and using css
applied a differend colored border styling to each like div element.  From there on it was a simply trial and error process of tweaking the size stylings 
for each of the divs.  The one major hurdle I encountered during this section of the design process was that I wanted my web page to scale to different window
sizes, restricted to desktop viewing at this point.  The solution I found was to define the heights and/or widths of div elements using the vh css value.
The benefit of using vh as opposed to % is that you can have div elements scale based on the viewwindow height instead of %size of parent div.  Ultimately
this use of vh as a parameter would prove problematic for mobile viewing but this was eventually resolved using media queries and the complementary value vw.

Once the web page was structured to a satisfactory level I began to work on the javascript portion of the design process.  The first task I tackled was to 
create an event handler capable of adding alternating black and red pieces to the gameboard when clicked on.  At this point I was less concerened with