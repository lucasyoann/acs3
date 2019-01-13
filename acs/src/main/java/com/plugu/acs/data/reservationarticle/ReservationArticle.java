package com.plugu.acs.data.reservationarticle;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import com.plugu.acs.data.articles.Article;
import com.plugu.acs.data.reservations.Reservation;

@Entity
@Table(name="RESERVATION_ARTICLE")
public class ReservationArticle {

	@EmbeddedId
	private ReservationArticlePK reservationArticlePk;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @MapsId("reservationId")
    private Reservation reservation;
 
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("articleId")
    private Article article;
 
    @Column(name = "quantite")
    private int quantite;
    
    public ReservationArticle() {
    	
    }
    
    public ReservationArticle(Reservation reservation, Article article) {
    	this.reservation=reservation;
    	this.article=article;
    	this.reservationArticlePk= new ReservationArticlePK(reservation.getId(),article.getId());
    }

	public ReservationArticlePK getReservationArticlePk() {
		return reservationArticlePk;
	}

	public void setReservationArticlePk(ReservationArticlePK reservationArticlePk) {
		this.reservationArticlePk = reservationArticlePk;
	}

	public Reservation getReservation() {
		return reservation;
	}

	public void setReservation(Reservation reservation) {
		this.reservation = reservation;
	}

	public Article getArticle() {
		return article;
	}

	public void setArticle(Article article) {
		this.article = article;
	}

	public int getQuantite() {
		return quantite;
	}

	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((article == null) ? 0 : article.hashCode());
		result = prime * result + quantite;
		result = prime * result + ((reservation == null) ? 0 : reservation.hashCode());
		result = prime * result + ((reservationArticlePk == null) ? 0 : reservationArticlePk.hashCode());
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
		ReservationArticle other = (ReservationArticle) obj;
		if (article == null) {
			if (other.article != null)
				return false;
		} else if (!article.equals(other.article))
			return false;
		if (quantite != other.quantite)
			return false;
		if (reservation == null) {
			if (other.reservation != null)
				return false;
		} else if (!reservation.equals(other.reservation))
			return false;
		if (reservationArticlePk == null) {
			if (other.reservationArticlePk != null)
				return false;
		} else if (!reservationArticlePk.equals(other.reservationArticlePk))
			return false;
		return true;
	}
    
    
}
