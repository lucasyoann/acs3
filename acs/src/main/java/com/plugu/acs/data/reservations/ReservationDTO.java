package com.plugu.acs.data.reservations;

import java.util.Date;
import java.util.List;
import java.util.Set;

import com.plugu.acs.data.articles.ArticleDTO;
import com.plugu.acs.data.articles.ArticleResaDTO;

public class ReservationDTO {
	
	private int id;
	private Date dateEmprunt;
	private Date dateRestitution;
	private Date creerLe;
	private String creerPar;
	private Date valideLe;
	private String validePar;
	private String nom;
	private String prenom;
	private Boolean asso;
	private Boolean active;
	private String commentaire;
	
	private Set<ArticleDTO> articles;
	
	private List<ArticleResaDTO> articleResaDto;
	
	public Set<ArticleDTO> getArticles() {
		return articles;
	}
	public void setArticles(Set<ArticleDTO> articles) {
		this.articles = articles;
	}
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
	public Boolean getAsso() {
		return asso;
	}
	public void setAsso(Boolean asso) {
		this.asso = asso;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public Boolean getActive() {
		return active;
	}
	public void setActive(Boolean active) {
		this.active = active;
	}
	public List<ArticleResaDTO> getArticleResaDto() {
		return articleResaDto;
	}
	public void setArticleResaDto(List<ArticleResaDTO> articleResaDto) {
		this.articleResaDto = articleResaDto;
	}
	public String getCommentaire() {
		return commentaire;
	}
	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}
	
}
