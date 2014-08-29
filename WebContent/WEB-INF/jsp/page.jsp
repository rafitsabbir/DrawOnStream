<!doctype html>
<html lang="en">
	<head>   
	<link rel="stylesheet" href="//code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">
	<link rel="stylesheet" href="CSS/video.css">
	<script src="//code.jquery.com/jquery-1.10.2.js"></script>
	<script src="//code.jquery.com/ui/1.11.0/jquery-ui.js"></script>
	
	<script type="text/javascript" src="JS/Draw.js"> </script>
	
	<!-- Bistri config start -->
	<script type="text/javascript" src="https://api.bistri.com/bistri.conference.min.js"></script>
	<script type="text/javascript" src="JS/Bistri-config.js"> </script>

    
    <title>LiveDraw</title>
  
    </head>
    <body  onload="initDraw()">
    
	<table id="videotable">
	<tr>
		<td  id="video-td">
		<video id="video-container" ></video>
		
		<canvas id="canvas" width="640px" height="360px" style="position:relative;"></canvas>	    
		</td>
	</tr>
	<tr>
		<td>
		<input type="button" id="quit-room" value="Quit Room" size="30" style="display:none;"/>&nbsp;&nbsp;&nbsp;
    	<input type="button" value="clear"  size="30" onclick="erase()" >&nbsp;&nbsp;&nbsp;
    	<input type="button" value="send" id="send"  size="30" onclick="SendData()" >
   		<div id="dialog" >please draw something </div>   
    	<input type="hidden" id="room-name" value="conference-room"/>
		</td>
	</tr>
	</table>
    
    
    </body> 
 
</html>