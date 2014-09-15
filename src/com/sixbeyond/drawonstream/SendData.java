package com.sixbeyond.drawonstream;

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
		// TODO Auto-generated method stub
		PrintWriter out = response.getWriter();

		x = request.getParameter("paramX");

		String[] xValue = x.split(",");
		for (String a : xValue) {
			posX.add(a);
		}
		out.println("x:" + posX);
		out.println("x.length:" + xValue.length);

		y = request.getParameter("paramY");
		String[] yValue = y.split(",");
		for (String b : yValue) {
			posY.add(b);
		}
		out.println("y:" + posY);
		out.println("y.length:" + yValue.length);

		sendMessage(posX, posY);
	}

	public void sendMessage(ArrayList<String> x, ArrayList<String> y) {

		gtalkChat.sendMessage("receiverid123@gmail.com", x + "&" + y);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

	}

}
