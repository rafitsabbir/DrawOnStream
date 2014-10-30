package com.sixbeyond.sharestream;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jivesoftware.smack.XMPPException;

@WebServlet(urlPatterns = { "/senddata" })
public class SendData extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public ArrayList<String> posX = new ArrayList<String>();
	public ArrayList<String> posY = new ArrayList<String>();
	GtalkChat gtalkChat;
	String x = "";
	String y = "";
	String roomName = "";
	String text = "";
	String circlePos = "";
	String rectPos = "";
	HttpServletResponse resp;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public SendData() {
		super();
		// TODO Auto-generated constructor stub
		try {
			gtalkChat = new GtalkChat();
		} catch (XMPPException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		posX.clear();
		posY.clear();
		circlePos = "";
		rectPos = "";
		resp = response;

		// TODO Auto-generated method stub
		PrintWriter out = response.getWriter();

		x = request.getParameter("paramX");

		String[] xValue = x.split(",");
		for (String a : xValue) {
			posX.add(a);
		}
		// out.println("x:" + posX);
		// out.println("x.length:" + xValue.length);

		y = request.getParameter("paramY");
		String[] yValue = y.split(",");
		for (String b : yValue) {
			posY.add(b);
		}
		// out.println("y:" + posY);
		// out.println("y.length:" + yValue.length);

		roomName = request.getParameter("roomName");
		// out.println("roomName " + roomName);

		circlePos = request.getParameter("circles");
		// out.println("circles " + circlePos);

		rectPos = request.getParameter("rects");
		// out.println("rects " + rectPos);
		
		text = request.getParameter("text");

		if (posX.size() == 0)
			posX.add("0");
		if (posY.size() == 0)
			posY.add("0");

		// out.print("circlePos.length "+ circlePos.length());
		// out.print("rectPos.length "+ rectPos.length());
		if (circlePos.length() < 2)
			circlePos = "0,0,0";
		if (rectPos.length() < 2)
			rectPos = "0,0,0,0";
		if (text.length() < 1)
			text = "notext";

		sendMessage(response, roomName, posX, posY, circlePos, rectPos, text);
	}

	public void sendMessage(HttpServletResponse response, String roomName,
			ArrayList<String> x, ArrayList<String> y, String circles,
			String rects, String text) {
		PrintWriter out = null;
		try {
			out = response.getWriter();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		out.println(roomName + x + "&" + y + "#" + circles + ":" + rects + "#" + text);

		try {
			gtalkChat.sendMessage("receiverid123@gmail.com", roomName + x + "&"
					+ y + "#" + circles + ":" + rects + "#" + text);
			out.print("success   ");
			out.print("  connection " + gtalkChat.connection.isConnected());
			out.print("  user " + gtalkChat.connection.getUser());
			out.print("  host " + gtalkChat.connection.getHost());
			out.print("  saslauth "
					+ gtalkChat.connection.getSASLAuthentication());
		} catch (Exception e) {
			out.println("Error msg is :-" + e.getMessage() + " and    "
					+ e.getCause());
		}

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

	}

	public void destroy() {
		gtalkChat.disconnect();
		PrintWriter out = null;
		try {
			out = resp.getWriter();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		out.println("disconnected in send data");
	}
}
