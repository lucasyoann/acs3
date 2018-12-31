package com.plugu.acs.data.articles;

public class ArticleDTO {

	private int id;
	private String type;
	private String intitule;
	private String description;
	private int quantite;
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
	public String getIntitule() {
		return intitule;
	}
	public void setIntitule(String intitule) {
		this.intitule = intitule;
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
	public ArticleDTO() {
		
	}
	
	public ArticleDTO(int id, String type, String intitule,
			String description, int quantite, String destinataire) {
		this.description=description;
		this.destinataire=destinataire;
		this.id=id;
		this.intitule=intitule;
		this.quantite=quantite;
		this.type=type;
	}

}
