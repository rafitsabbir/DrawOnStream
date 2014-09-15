package com.sixbeyond.drawonstream; 

import org.jivesoftware.smack.ConnectionConfiguration;
import org.jivesoftware.smack.XMPPConnection;
import org.jivesoftware.smack.XMPPException;
import org.jivesoftware.smack.packet.Message;

public class GtalkChat {
	private static String username = "transmitterid@gmail.com";
	private static String password = "transmitter123";
	ConnectionConfiguration connConfig;
	XMPPConnection connection;

	public GtalkChat() throws XMPPException {
		connConfig = new ConnectionConfiguration("talk.google.com", 5222,
				"gmail.com");
		connection = new XMPPConnection(connConfig);
		connection.connect();
		connection.login(username, password);
	}

	public void sendMessage(String to, String message) {
		Message msg = new Message(to, Message.Type.chat);
		msg.setBody(message);
		connection.sendPacket(msg);
	}

	public void disconnect() {
		connection.disconnect();
	}
}