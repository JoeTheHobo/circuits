# circuits V1
A cool little program that allows you to play with circuits. Though they are not normal circuits, or else you might as well you any other program. I hope you have fun, send any cool projects you made to johnjonesma@gmail.com

# What to do?
Load up the main.html file and you'll see a 30x30 grid ontop of a gradient background.
You are able to press on the different cells in the grid. When you press on one cell it will become whatever 'type' is currently selected. The different cells will then interact with eachother, for example: One cell might power another which then goes on to power a light. Power moves between cells depending on there arrow sign. 

# What is selected?
When the site loads the selected 'type' is set to '1' or 'empty'. Pressing on a cell with a 'empty' type will erase the cell.
Switching between the different 'types' is easy. Just press the numbers 1-8 on your keyboard. Here is what they all do:

1: Empty Cell. Has no properties, just erases cells.
2: Power Cell. Gives off power.
3: String Cell. Takes power and moves it.
4: Jump Cell. Takes power and moves it 2 cells away.
5: And Gate. Requires two inputs of power to send off power.
6: Reverse Cell. Reverses the power it takes. If it reseives power on then it outputs power off.
7: Senser. Checks all cells around and see if they are powered, if one or more is powered then this cell becomes powered.
8: Light. A black cell that when powered turns yellow. Like a light.

Pressing shift and then any letter key will also select that key type.
A Key type is a cell that when placed produces no power, but whe the lowercase version of the key is pressed it will power on and produce power.

# Rotating the direction
Press the arrow keys to switch the rotation of the cell. Then click on the grid to place it. Default rotation is facing right.

# Saving and Loading Grids
To save a grid press Ctrl-S or CMD-S. A new window opens up, copy that code and save it wherever you want.
To Load a grid press Ctrl-V or CMD-V. Then paste in the code you saved and press enter.

# Thank you
If anyone plays around with this I would be super happy. I am a new developer and still is learning a lot to do with JavaScript. If you have any feedback please let me know, I'm trying to learn everything to do with Programming/Computer Science.

Thank You,
JoeTheHobo (John Jones)


# Extras
Here are some fun little projects I made to show you what is possible with this.
Just copy paste these into your grid. (Just copy the numbers)

Numbers+ (Press the keys 'asdfghjkl;' and see what happens!)
1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,3,4,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,3,4,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,3,3,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,3,4,1,0,1,0,1,0,3,4,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,1,0,3,3,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,3,4,1,0,1,0,1,0,3,1,3,1,3,4,7,1,3,4,1,0,1,0,1,0,3,4,3,2,3,2,3,2,3,2,1,0,3,3,1,0,3,3,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,3,4,7,4,1,0,1,0,7,1,4,0,4,0,4,0,3,2,1,0,1,0,7,4,3,4,1,0,1,0,1,0,3,3,1,0,3,3,1,0,3,3,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,3,4,3,4,7,1,3,1,4,0,1,0,1,0,1,0,4,0,3,2,7,2,3,4,3,4,1,0,1,0,1,0,3,3,1,0,3,3,1,0,3,3,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,3,4,3,1,3,1,3,1,4,0,1,0,1,0,1,0,4,0,3,2,3,2,3,2,3,4,1,0,1,0,1,0,3,3,1,0,3,3,1,0,3,3,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,3,1,3,1,3,1,3,1,4,0,1,0,1,0,1,0,4,0,3,2,3,2,3,2,3,2,1,0,1,0,1,0,3,3,1,0,3,3,1,0,3,3,1,0,1,0,1,0,1,0,1,0,1,0,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,4,0,4,0,4,0,3,2,3,2,3,2,3,2,3,2,3,2,3,2,1,0,3,3,1,0,3,3,1,0,3,3,1,0,1,0,1,0,1,0,1,0,1,0,3,3,7,3,1,0,3,1,3,1,3,1,3,1,4,0,1,0,1,0,1,0,4,0,3,2,3,2,3,2,3,2,1,0,3,3,1,0,3,3,1,0,3,3,1,0,3,3,1,0,1,0,1,0,1,0,1,0,1,0,3,3,1,0,1,0,3,3,3,1,3,1,3,1,4,0,1,0,1,0,1,0,4,0,3,2,3,2,3,2,3,3,1,0,3,3,1,0,3,3,1,0,3,3,1,0,3,3,1,0,1,0,1,0,1,0,1,0,1,0,3,3,1,0,1,0,3,3,3,3,7,1,3,1,4,0,1,0,1,0,1,0,4,0,3,2,7,2,3,3,3,3,1,0,3,3,1,0,3,3,1,0,3,3,1,0,3,3,1,0,1,0,1,0,1,0,1,0,1,0,3,3,1,0,1,0,3,3,7,3,1,0,1,0,7,1,4,0,4,0,4,0,3,2,1,0,1,0,7,3,3,3,1,0,3,3,1,0,3,3,1,0,3,3,1,0,3,3,1,0,1,0,1,0,1,0,1,0,1,0,3,3,1,0,1,0,3,3,1,0,1,0,1,0,3,1,3,1,3,3,7,1,3,3,1,0,1,0,1,0,3,3,1,0,3,3,1,0,3,3,1,0,3,3,1,0,3,3,1,0,1,0,1,0,1,0,1,0,1,0,3,3,1,0,1,0,3,3,1,0,1,0,1,0,3,3,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,3,3,2,3,3,1,0,3,3,1,0,3,3,1,0,3,3,1,0,1,0,1,0,1,0,1,0,1,0,3,3,7,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,1,0,3,3,1,0,3,3,1,0,3,3,1,0,1,0,1,0,1,0,1,0,1,0,3,3,1,0,1,0,8,3,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,8,3,3,2,8,3,3,2,1,0,3,3,1,0,3,3,1,0,3,3,1,0,1,0,1,0,1,0,1,0,1,0,3,3,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,1,0,3,3,1,0,3,3,1,0,3,3,1,0,3,3,1,0,3,3,1,0,3,3,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,3,3,8,2,7,3,8,2,7,3,8,2,7,3,8,2,7,3,8,2,7,3,8,2,7,3,8,2,:,2,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,7,3,8,2,3,3,8,2,3,3,8,2,7,3,8,2,7,3,8,2,7,3,8,2,7,3,8,2,L,2,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,7,3,8,2,7,3,8,2,7,3,8,2,7,3,8,2,7,3,8,2,7,3,8,2,7,3,8,2,K,2,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,3,3,8,2,3,3,8,2,3,3,8,2,7,3,8,2,7,3,8,2,7,3,8,2,3,3,8,2,J,2,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,7,3,8,2,7,3,8,2,7,3,8,2,7,3,8,2,3,3,8,2,7,3,8,2,7,3,8,2,H,2,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,7,3,8,2,3,3,8,2,7,3,8,2,7,3,8,2,3,3,8,2,7,3,8,2,7,3,8,2,G,2,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,7,3,8,2,3,3,8,2,3,3,8,2,7,3,8,2,7,3,8,2,3,3,8,2,7,3,8,2,F,2,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,7,3,8,2,3,3,8,2,7,3,8,2,7,3,8,2,7,3,8,2,7,3,8,2,3,3,8,2,D,2,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,7,3,8,2,7,3,8,2,7,3,8,2,3,3,8,2,7,3,8,2,7,3,8,2,3,3,8,2,S,2,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,3,3,8,2,3,3,8,2,3,3,8,2,7,3,8,2,7,3,8,2,3,3,8,2,3,3,8,2,A,2,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0

# Known Bugs
-Placing Different Cells on the edge doesn't work.
