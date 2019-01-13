package com.plugu.acs.data.reservationarticle;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class ReservationArticlePK implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	@Column(name="ID_RESERVATION")
	private int reservationId;
	
	@Column(name="ID_ARTICLE")
	private int articleId;
	
	public int getReservationId() {
		return reservationId;
	}

	public void setReservationId(int reservationId) {
		this.reservationId = reservationId;
	}

	public int getArticleId() {
		return articleId;
	}

	public void setArticleId(int articleId) {
		this.articleId = articleId;
	}

	public ReservationArticlePK() {
		
	}
	
	public ReservationArticlePK(int reservationId, int articleId) {
		this.articleId=articleId;
		this.reservationId=reservationId;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + articleId;
		result = prime * result + reservationId;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ReservationArticlePK other = (ReservationArticlePK) obj;
		if (articleId != other.articleId)
			return false;
		if (reservationId != other.reservationId)
			return false;
		return true;
	}
	
	
}
