 var roomName;

 onBistriConferenceReady = function() {

 	// Browser's WebRTC compatibility is tested
 	if (BistriConference.isCompatible()) {
 		// if the browser is WebRTC compatible

 		/***********************************************************************
 		 * DOM binding part *
 		 **********************************************************************/

 		function hideShow(hide, show) {
 			document.querySelector(hide).style.display = "none";
 			document.querySelector(show).style.display = "block";
 		}

 		/*
 		 * document.querySelector( "#join-room" ).addEventListener( "click",
 		 * function(){ BistriConference.startStream( "1280×720", function(){
 		 * roomName = document.querySelector( "#room-name" ).value;
 		 * BistriConference.joinRoom( roomName ); } ); } );
 		 */

 		document.querySelector("#quit-room").addEventListener("click",
 				function() {
 					BistriConference.quitRoom(roomName);
 				});

 		/***********************************************************************
 		 * Bistri API part *
 		 **********************************************************************/

 		// api is initialize with the application id & key
 		BistriConference.init({
 			appId : "862ac595",
 			appKey : "bec8330aeaaec89b3b2b3669bd4c8a75",
 			debug : true,
 			userName : "room1"
 		});

 		// set handler for "onError" event: an error occured
 		BistriConference.signaling.addHandler("onError",
 				function(error /* Object: error properties */) {
 					// an error popup is displayed
 					alert(error.text + " " + error.code);
 				});

 		// set handler for "onConnected" event: user is successfully connected
 		// to the signalling server
 		BistriConference.signaling.addHandler("onConnected",
 				function(data /* Object: session data */) {
 					// hide/show DOM nodes

 					BistriConference.startStream("640×360:5", function() {
 						roomName = document.querySelector("#room-name").value;
 						BistriConference.joinRoom(roomName);
 						// hideShow( "#connecting", "#home" );
 						console.log("auto connection to room");
 					});

 				});

 		// set handler for "onJoinedRoom" event: user has successfully joined
 		// the room
 		BistriConference.signaling.addHandler("onJoinedRoom",
 				function(data /* Object: room properties */) {

 					var options = {
 						"audio-codec" : "ISAC/16000"
 					};

 					// if there is no stream to send, set receiveonly mode to
 					// true
 					if (!BistriConference.getLocalStreams().length) {
 						options.receiveonly = true;
 					}

 					// hide/show DOM nodes
 					// hideShow( "#home", "#room" );
 					// loop on all room members
 					for ( var i = 0; i < data.members.length; i++) {
 						// send a call request to the room member
 						BistriConference.call(data.members[i].id, data.room,
 								options);
 					}
 				});

 		// set handler for "onJoinRoomError" event: an error occured when user
 		// tried to join room
 		BistriConference.signaling.addHandler("onJoinRoomError",
 				function(error /* Object: error properties */) {
 					// an error popup is displayed
 					alert(error.text + " " + error.code);
 				});

 		// set handler for "onQuittedRoom" event: user has successfully quitted
 		// the room
 		BistriConference.signaling.addHandler("onQuittedRoom", function() {
 			// hide/show DOM nodes
 			// hideShow( "#room", "#home" );

 			var localStreams = BistriConference.getLocalStreams();

 			for ( var i = 0; i < localStreams.length; i++) {
 				BistriConference.stopStream(localStreams[i], function() {
 				});
 			}

 		});

 		// set handler for "onQuitRoomError" event: an error occured when user
 		// tried to quit room
 		BistriConference.signaling.addHandler("onQuitRoomError",
 				function(error /* Object: error properties */) {
 					// an error popup is displayed
 					alert(error.text + " " + error.code);
 				});

 		// set handler for "onStreamAdded" event: the call negociation succed,
 		// we start to receive a remote stream
 		BistriConference.streams
 				.addHandler(
 						"onStreamAdded",
 						function(stream/* Object: remote stream */, pid/*
 																		 * String:
 																		 * remote
 																		 * user
 																		 * id
 																		 */) {
 							// insert the remote stream into the body node
 							BistriConference.attachStream(stream, document
 									.querySelector("#video-container"), {
 								autoplay : true,
 								fullscreen : true
 							});
 						});

 		// set handler for "onStreamClosed" event: the local or a remote strean
 		// has been closed
 		BistriConference.streams.addHandler("onStreamClosed", function(
 				stream/* Object: stream */, pid/* String: user id */) {
 			// remove the stream from the page
 			BistriConference.detachStream(stream);
 			window.location.assign(location.href);
 			
 		});

 		// we connect the user to the signaling server, event "onConnected" is
 		// triggered when user is connected
 		BistriConference.connect();

 	} else {
 		// if the browser is WebRTC compatible
 		alert("Sorry, your browser is not WebRTC compatible");
 	}
 }