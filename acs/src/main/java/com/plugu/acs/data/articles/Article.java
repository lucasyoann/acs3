package com.plugu.acs.data.articles;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.plugu.acs.data.reservationarticle.ReservationArticle;
import com.plugu.acs.data.reservations.Reservation;


@Entity
@Table(name="ARTICLE")
public class Article {

	@Column(name = "ID")
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
	@Column(name = "TYPE")
	private String type;
	
	@Column(name="INTITULE")
	private String intitule;

	@Column(name="DESCRIPTION")
	private String description;
	
	@Column(name="QUANTITE")
	private int quantite;
	
	@Column(name="DESTINATAIRE")
	private String destinataire;
	
	@OneToMany(mappedBy = "primaryKey.article",
            cascade = CascadeType.ALL)
	private Set<ReservationArticle> reservationArticles = new HashSet<ReservationArticle>();

	public int getId() {
		return id;
	}

	public String getDestinataire() {
		return destinataire;
	}

	public void setDestinataire(String destinataire) {
		this.destinataire = destinataire;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getQuantite() {
		return quantite;
	}

	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}

	public String getIntitule() {
		return intitule;
	}

	public void setIntitule(String intitule) {
		this.intitule = intitule;
	}

	
    public Set<ReservationArticle> getReservationArticles() {
        return reservationArticles;
    }
 
    public void setUserGroups(Set<ReservationArticle> articles) {
        this.reservationArticles = articles;
    }
	
	public void addReservationArticle(ReservationArticle reservationArticle) {
		this.reservationArticles.add(reservationArticle);
	}
	
}