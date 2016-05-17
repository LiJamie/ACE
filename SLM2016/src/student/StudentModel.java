package student;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StudentModel {

	private String id = "";
	private String name = "";
	private String nickname = "";
	private String email = "";
	private String phone = "";
	private String company = "";
	private String apartment = "";
	private String title = "";
	private String ticketType = "";
	private String ticketPrice = "";
	private String receiptType = "";
	private String receiptCompanyName = "";
	private String fkCourseInfoId = "";
	private String receiptCompanyEIN = "";
	private String receiptEIN = "";
	private String teamMembers = "";
	private String comment = "";
	private String vegeMeat = "";
	private String timestamp = "";
	private String studentStatus = "";
	private String paymentStatus = "";
	private String receiptStatus = "";
	private String certificationImg = "";
	private String certificationPdf = "";

	public String getCertificationImg() {
		return certificationImg;
	}

	public void setCertificationImg(String certificationImg) {
		this.certificationImg = certificationImg;
	}

	public String getCertificationPdf() {
		return certificationPdf;
	}

	public void setCertificationPdf(String certificationPdf) {
		this.certificationPdf = certificationPdf;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getReceiptEIN() {
		return receiptEIN;
	}

	public void setReceiptEIN(String receiptEIN) {
		this.receiptEIN = receiptEIN;
	}

	public String getFkCourseInfoId() {
		return fkCourseInfoId;
	}

	public void setFkCourseInfoId(String fkCourseInfoId) {
		this.fkCourseInfoId = fkCourseInfoId;
	}

	public String getStudentStatus() {
		return studentStatus;
	}

	public void setStudentStatus(String studentStatus) {
		this.studentStatus = studentStatus;
	}

	public String getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public String getReceiptStatus() {
		return receiptStatus;
	}

	public void setReceiptStatus(String receiptStatus) {
		this.receiptStatus = receiptStatus;
	}

	public StudentModel() {

	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getApartment() {
		return apartment;
	}

	public void setApartment(String apartment) {
		this.apartment = apartment;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTicketType() {
		return ticketType;
	}

	public void setTicketType(String ticketType) {
		this.ticketType = ticketType;
	}

	public String getReceiptType() {
		return receiptType;
	}

	public void setReceiptType(String receiptType) {
		this.receiptType = receiptType;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getVegeMeat() {
		return vegeMeat;
	}

	public void setVegeMeat(String vegeMeat) {
		this.vegeMeat = vegeMeat;
	}

	public String getReceiptCompanyName() {
		return receiptCompanyName;
	}

	public void setReceiptCompanyName(String receiptCompanyName) {
		this.receiptCompanyName = receiptCompanyName;
	}

	public String getReceiptCompanyEIN() {
		return receiptCompanyEIN;
	}

	public void setReceiptCompanyEIN(String receiptCompanyEIN) {
		this.receiptCompanyEIN = receiptCompanyEIN;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public String getTeamMembers() {
		return teamMembers;
	}

	public void setTeamMembers(String teamMembers) {
		this.teamMembers = teamMembers;
	}

	public String getTicketPrice() {
		return ticketPrice;
	}

	public void setTicketPrice(String ticketPrice) {
		this.ticketPrice = ticketPrice;
	}

	public void setTicketTypeAndPrice(String ticketTypeAndPrice) {
		// String priceReg = "\\d+[,]*\\d+";
		String priceReg = "(\\d+,*)+";
		String ticketTypeReg = ".*[票|券]";

		String ticketType = "";
		String ticketPrice = "";

		Pattern pricePattern = Pattern.compile(priceReg);
		Pattern ticketPattern = Pattern.compile(ticketTypeReg);

		Matcher matcher = ticketPattern.matcher(ticketTypeAndPrice);

		if (matcher.find()) {
			ticketType = ticketTypeAndPrice.substring(matcher.start(), matcher.end());
			this.setTicketType(ticketType);
		}

		Matcher priceMatcher = pricePattern.matcher(ticketTypeAndPrice);

		if (priceMatcher.find()) {
			ticketPrice = ticketTypeAndPrice.substring(priceMatcher.start(), priceMatcher.end());
			// System.out.println(ticketPrice);
			this.setTicketPrice(ticketPrice);
		}
	}

}