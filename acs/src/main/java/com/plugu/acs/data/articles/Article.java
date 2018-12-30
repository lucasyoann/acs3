package com.plugu.acs.data.articles;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import com.plugu.acs.data.reservations.Reservation;

import javax.persistence.ManyToMany;


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
	
	@ManyToMany
	@JoinColumn(name = "RESERVATION_ID")
	private List<Reservation> reservations = new ArrayList<>();
	
	
}