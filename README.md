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
create an event handler capable of adding alternating black and red pieces to the gameboard when clicked on.  Once I had accomplished this I made its so
that instead of putting the pieces on the slot clicked, it would go to the bottom of that column.  The next task was win condition and this was one of the
tougher problems to solve.  The strategy was that, given the slot last played, a function would check home many contiguous tokens were to the left/right
up/down and diagonal and return true if any of those values was 4 or above.  Next was constructing the easy version of the cpu difficulty, a random token dropper.
This was actually pretty easy, but I did have to account for the edge case that the computer randomly selected a column already filled.  Also I had some
logic errors in there and sometimes the computer would drop pieces on top of an empty space and that was an issue.

The final tackle before I had met the goals I set out for was to make a hard mode cpu that would actually employ some level of strategy with its moves.
I devised a simple 3 step control logic that was to first check to see if it could win this turn.  If not then it would see if it could prevent the player
from winning next turn.  Finally if neither of those conditions existed the default behavior is to mimic the easy mode cpu and place a random token and wait
for an opportunity to win/block again next turn.  The tricky part here was how to figure out when a winning move was played before making the play, but
as luck would have it my isWinningMove function had been design such that when calculating the contiguous tokens, it assumed the slot parameter already had
a token in it so that was a breeze.

From here there wasn't much resistance as far as implementing my other features.  I used JQuery UI to add a nice little drop animation to tokens when
players make a move and I used keyframe animations to make the arrows above the columns bounce.  The final piece to complete was to make some modals to
display on win conditions.  From here I began research into how to make a 3d version of connect 4 which despite several hours of research, I was unable
to find a way to make a 3d game board display on my page to a degree I felt left the game in a playable state, that is without investing hours of 
time learning how to use a 3d html5 canvas.  So I turned my focus to optomizing the game for mobile which was actually quite easy.  My page was currently 
displaying very well on a landscape sized screen due to the utilization of the vh variable for defining div dimensions.  The problem arrose when portrait mode
was used to display the page.  The solution was to use a media query that would revise every css style line that used vh to vw if the page was viewed in portrait mode.
This was a perfect fix and the game now scales amazingly to a variety of mobile screen sizes.