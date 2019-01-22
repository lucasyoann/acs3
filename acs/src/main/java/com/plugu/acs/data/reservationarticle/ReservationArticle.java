package com.plugu.acs.data.reservationarticle;

import javax.persistence.AssociationOverride;
import javax.persistence.AssociationOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.plugu.acs.data.articles.Article;
import com.plugu.acs.data.reservations.Reservation;

@Entity
@Table(name = "RESERVATION_ARTICLE")
@AssociationOverrides({
    @AssociationOverride(name = "primaryKey.reservation",
        joinColumns = @JoinColumn(name = "ID_RESERVATION")),
    @AssociationOverride(name = "primaryKey.article",
        joinColumns = @JoinColumn(name = "ID_ARTICLE")) })
public class ReservationArticle {
	
	@EmbeddedId
	private ReservationArticleId primaryKey = new ReservationArticleId();
	
	@Column(name = "QUANTITE")
	private int quantite;
	
	public ReservationArticleId getPrimaryKey() {
        return primaryKey;
    }
 
    public void setPrimaryKey(ReservationArticleId primaryKey) {
        this.primaryKey = primaryKey;
    }
	
	@Transient
	public Reservation getReservation() {
		return getPrimaryKey().getReservation();
	}
	
	public void setReservation(Reservation reservation) {
		getPrimaryKey().setReservation(reservation);
	}
	
	@Transient
    public Article getArticle() {
        return getPrimaryKey().getArticle();
    }
 
    public void setArticle(Article article) {
        getPrimaryKey().setArticle(article);
    }

	public int getQuantite() {
		return quantite;
	}

	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}
}
