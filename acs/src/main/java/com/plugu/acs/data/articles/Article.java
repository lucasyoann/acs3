package com.plugu.acs.data.articles;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import com.plugu.acs.data.reservationarticle.ReservationArticle;
import com.plugu.acs.data.reservations.Reservation;

import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;


@Entity
@Table(name="ARTICLE")
public class Article {

	@Column(name = "ID")
	@Id
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
	
	@OneToMany(
	        mappedBy = "RESERVATION",
	        cascade = CascadeType.ALL,
	        orphanRemoval = true
	    )
	private List<ReservationArticle> reservations = new ArrayList<>();

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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((destinataire == null) ? 0 : destinataire.hashCode());
		result = prime * result + id;
		result = prime * result + ((intitule == null) ? 0 : intitule.hashCode());
		result = prime * result + quantite;
		result = prime * result + ((reservations == null) ? 0 : reservations.hashCode());
		result = prime * result + ((type == null) ? 0 : type.hashCode());
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
		Article other = (Article) obj;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (destinataire == null) {
			if (other.destinataire != null)
				return false;
		} else if (!destinataire.equals(other.destinataire))
			return false;
		if (id != other.id)
			return false;
		if (intitule == null) {
			if (other.intitule != null)
				return false;
		} else if (!intitule.equals(other.intitule))
			return false;
		if (quantite != other.quantite)
			return false;
		if (reservations == null) {
			if (other.reservations != null)
				return false;
		} else if (!reservations.equals(other.reservations))
			return false;
		if (type == null) {
			if (other.type != null)
				return false;
		} else if (!type.equals(other.type))
			return false;
		return true;
	}
	
	
	
	
}