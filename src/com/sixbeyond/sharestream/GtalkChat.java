package com.sixbeyond.sharestream;

import org.jivesoftware.smack.ConnectionConfiguration;
import org.jivesoftware.smack.SASLAuthentication;
import org.jivesoftware.smack.XMPPConnection;
import org.jivesoftware.smack.XMPPException;
import org.jivesoftware.smack.packet.Message;




public  class GtalkChat {
	private static String username = "transmitterid";
	private static String password = "transmitter123";
	ConnectionConfiguration connConfig;
	XMPPConnection connection;
	
	public GtalkChat() throws XMPPException {
		
		// turn on the enhanced debugger
//	    XMPPConnection.DEBUG_ENABLED = true;
	    
		connConfig = new ConnectionConfiguration("talk.google.com", 5222,
				"gmail.com");
		
//		connConfig.setSASLAuthenticationEnabled(true);
		connConfig.setSecurityMode(ConnectionConfiguration.SecurityMode.enabled);
		
//		connConfig.setSASLAuthenticationEnabled(false);
//		connConfig.setSecurityMode(SecurityMode.disabled);
		
		
//		connConfig.setCompressionEnabled(true);
//		connConfig.setSASLAuthenticationEnabled(false);
		
		
		
		connection = new XMPPConnection(connConfig);
		connection.connect();
		
		
		
		connConfig.setSASLAuthenticationEnabled(false);
		SASLAuthentication.supportSASLMechanism("PLAIN", 0);
		
		
		try {
			connection.login(username, password);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
	
	

	public void sendMessage(String to, String message) {
		Message msg = new Message(to, Message.Type.chat);
		msg.setBody(message);
		connection.sendPacket(msg);
	}

	public void disconnect() {
		connection.disconnect();
	}



	public void logIn() throws XMPPException {
		// TODO Auto-generated method stub
		connConfig = new ConnectionConfiguration("talk.google.com", 5222,
				"gmail.com");
		connConfig.setSecurityMode(ConnectionConfiguration.SecurityMode.enabled);
		connection = new XMPPConnection(connConfig);
		connection.connect();	
		
		
		connConfig.setSASLAuthenticationEnabled(false);
		SASLAuthentication.supportSASLMechanism("PLAIN", 0);
		
		
		try {
			connection.login(username, password);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}