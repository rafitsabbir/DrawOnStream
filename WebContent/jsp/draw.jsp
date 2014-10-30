<!doctype html>
<html lang="en">
	<head>   
	<link rel="stylesheet" href="//code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">
	<link rel="stylesheet" href="../CSS/main.css">
	<script src="//code.jquery.com/jquery-1.10.2.js"></script>
	<script src="//code.jquery.com/ui/1.11.0/jquery-ui.js"></script>
	
	<script type="text/javascript" src="../JS/Draw.js"> </script>
	
	<!-- Bistri config start -->
	<script type="text/javascript" src="https://api.bistri.com/bistri.conference.min.js"></script>
	<script type="text/javascript" src="../JS/Bistri-config.js"> </script>

    
    <title>LiveDraw</title>
  
    </head>
    <body  onload="initDraw()">
    <table id="container">
    <tr >
    
    <td   id="drawingtools" align="center">
	<img src="../images/tool-bar.png" />
	<img src="../images/text.png" style="border: 1px solid #ababab" id="1" onClick="TextMode(1);"/> 
	<img src="../images/pencile.png" style="border: 1px solid #ababab" id="2" onClick="SelectPen(2);"/>
	<img src="../images/c1.png" style="border: 1px solid #ababab" id="3" onClick="SmallCircle(3);"/>
	<img src="../images/r1.png" style="border: 1px solid #ababab" id="4" onClick="SmallRect(4);"/>	
	<img src="../images/c2.png" style="border: 1px solid #ababab" id="5" onClick="MediumCircle(5);"/> 
	<img src="../images/r2.png" style="border: 1px solid #ababab" id="6" onClick="MediumRect(6);"/>
	<img src="../images/c3.png" style="border: 1px solid #ababab" id="7" onClick="LargeCircle(7);"/> 
	<img src="../images/r3.png" style="border: 1px solid #ababab" id="8" onClick="LargeRect(8);"/> 
    </td>
    <td id="video-td">
	<table id="videotable">
	<tr >
		<td >
		
		<canvas id="canvas" width="640px" height="360px" style="z-index:2; position:absolute;" ></canvas>
		<div id="video-container" width="640px" height="360px" style="position:relative;"></div>			    
		</td>
	</tr>	
	</table></td> 
	</tr>
	<tr>
		<td width="105px">
		</td>
		<td>
    	<input type="button" value="clear" id="clear" size="30" onclick="erase()" >
    	<input type="button" value="send" id="send" class="send" size="30" onclick="SendData()" >
   		<div id="dialog" >please draw something </div>   
    	<input type="hidden" id="room-name" value="room1"/>
    	<input type="button" id="quit-room" value="Quit Room" size="30" style="display:none;"/>
    	<input type="text" id="text" placeholder="Type here..." style="width: 400px; height: 25px; display:none;"/>
    	<input type="button" value="insert" class="send" id="sendtext" size="30" onclick="SendData()" style="display:none;" />
		</td>
	</tr>
		
	</table>
    
    
    </body> 
 		
</html>