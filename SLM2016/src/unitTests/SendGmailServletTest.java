package unitTests;

import static org.junit.Assert.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.Reader;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import servlets.SendGmailServlet;

public class SendGmailServletTest {

	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void testDoGet() throws ServletException, IOException {
		HttpServletRequest requestMock = Mockito.mock(HttpServletRequest.class);
		HttpServletResponse responseMock = Mockito.mock(HttpServletResponse.class);
		SendGmailServlet tag = new SendGmailServlet() {
			private static final long serialVersionUID = 1L;
		};

		Writer output = new StringWriter();
		Mockito.when(responseMock.getWriter()).thenReturn(new PrintWriter(output));
		tag.doGet(requestMock, responseMock);
		assertTrue(output.toString().contains("Scurm敏捷方法實作班"));
		assertTrue(output.toString().contains("軟體重構入門實作班"));
		assertTrue(output.toString().contains("Design Patterns這樣學就會了–入門實作班"));
	}

	@Test
	public void testDoPostClassIndex() throws ServletException, IOException {
		HttpServletRequest requestMock = Mockito.mock(HttpServletRequest.class);
		HttpServletResponse responseMock = Mockito.mock(HttpServletResponse.class);

		Mockito.when(requestMock.getHeader("isSend")).thenReturn("false");
		Reader data = new StringReader("0");
		Mockito.when(requestMock.getReader()).thenReturn(new BufferedReader(data));
		SendGmailServlet tag = new SendGmailServlet() {
			private static final long serialVersionUID = 1L;
		};

		Writer output = new StringWriter();
		Mockito.when(responseMock.getWriter()).thenReturn(new PrintWriter(output));
		tag.doPost(requestMock, responseMock);
		assertTrue(output.toString().contains("Scurm敏捷方法實作班"));
	}

	@Test
	public void testDoPostSendMail() throws ServletException, IOException {
		HttpServletRequest requestMock = Mockito.mock(HttpServletRequest.class);
		HttpServletResponse responseMock = Mockito.mock(HttpServletResponse.class);

		Reader data = new StringReader("{\"classIndex_\":\"2\",indexes_: [0],\"ccAddresses_\":\"\"}");
		Mockito.when(requestMock.getReader()).thenReturn(new BufferedReader(data));
		SendGmailServlet tag = new SendGmailServlet() {
			private static final long serialVersionUID = 1L;
		};

		Writer output = new StringWriter();
		Mockito.when(responseMock.getWriter()).thenReturn(new PrintWriter(output));
		tag.doPost(requestMock, responseMock);
		String except = "\"寄送email結束.\"";
		assertEquals(except, output.toString());
	}
}
