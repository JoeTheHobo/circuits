# Circuits V2
A cool little program that allows you to play with circuits. Though they are not normal circuits, or else you might as well you any other program. I hope you have fun, send any cool projects you made to johnjonesma@gmail.com.

The Program includes in game instructions just in case you need help understanding the game.

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

# Tips and Tricks
The Control Key:
The Control key has many uses like saving and loading your work. But it can also do more to make your life easier.
Ctrl-D : Delete. Press the keys then press two points on the grid. Everything between them (including them) will be deleted.
Ctrl-X : Cut. Press the keys then press two points. Those two points will delete, then then press a third point. The cutted section will go there.
Ctrl-C : Copy. Press two points, then press anywhere you want. What you copied will go there.
Ctrl-Z : Undo. Missed up your circuit? Press the keys and it will take you back a step.

The Alt Key:
Pressing the alt key is very nice. It allows you to sraw circuits with the mouse, but you don't need to switch directions. It does that for you!

The Space Key:
Press one point, then press space. Now press a final point. Between the two points will fill with whatever type is selected.

The '`' Key:
Press it and then press another cell. Nothing happens. Just kidding, what happened is that now you have selected that cell. So instead of pressing the number you can now just place and it will be what you want!

# Thank you
If anyone plays around with this I would be super happy. I am a new developer and still is learning a lot to do with JavaScript. If you have any feedback please let me know, I'm trying to learn everything to do with Programming/Computer Science.

Thank You,
JoeTheHobo (John Jones)

# Known Bugs
-Placing Different Cells on the edge doesn't work.
