package com.plugu.acs.data.reservations;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.plugu.acs.data.articles.Article;

@Entity
@Table(name="RESERVATION")
public class Reservation {
	
	@Column(name="ID")
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
	@Column (name="DATE_EMPRUNT")
	private Date dateEmprunt;
	
	@Column (name="DATE_RESTITUTION")
	private Date dateRestitution;
	
	@Column (name="CREER_LE")
	private Date creerLe;
	
	@Column (name = "CREER_PAR")
	private String creerPar;
	
	@Column (name = "VALIDE_LE")
	private Date valideLe;
	
	@Column (name="VALIDE_PAR")
	private String validePar;
	
	@Column(name="NOM")
	private String nom;
	
	@Column(name="PRENOM")
	private String prenom;
	
	@Column(name="ASSO")
	private String asso;

	
	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getAsso() {
		return asso;
	}

	public void setAsso(String asso) {
		this.asso = asso;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getCreerLe() {
		return creerLe;
	}

	public void setCreerLe(Date creerLe) {
		this.creerLe = creerLe;
	}

	public String getCreerPar() {
		return creerPar;
	}

	public void setCreerPar(String creerPar) {
		this.creerPar = creerPar;
	}

	public Date getValideLe() {
		return valideLe;
	}

	public void setValideLe(Date valideLe) {
		this.valideLe = valideLe;
	}

	public String getValidePar() {
		return validePar;
	}

	public void setValidePar(String validePar) {
		this.validePar = validePar;
	}

	public List<Article> getArticles() {
		return articles;
	}

	public void setArticles(List<Article> articles) {
		this.articles = articles;
	}

	public Date getDateEmprunt() {
		return dateEmprunt;
	}

	public void setDateEmprunt(Date dateEmprunt) {
		this.dateEmprunt = dateEmprunt;
	}

	public Date getDateRestitution() {
		return dateRestitution;
	}

	public void setDateRestitution(Date dateRestitution) {
		this.dateRestitution = dateRestitution;
	}

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "ARTICLE_ID")
	private List<Article> articles = new ArrayList<>();
	
}
