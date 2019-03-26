package com.plugu.acs.data.articles;

public class ArticleResaDTO {
	
	private int articleId;
	
	private int quantite;
	
	private String type;
	
	private String nom;

	public int getArticleId() {
		return articleId;
	}

	public void setArticleId(int articleId) {
		this.articleId = articleId;
	}

	public int getQuantite() {
		return quantite;
	}

	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}
	
	
	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}


	public ArticleResaDTO() {
		
	}
	
	public ArticleResaDTO(int articleId, int quantite, String type,String nom) {
		this.articleId=articleId;
		this.quantite=quantite;
		this.type=type;
		this.nom=nom;
	}

}
