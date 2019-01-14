package com.plugu.acs.data.articles;

public class ArticleDispoDTO {
	
	private int id;
	private String type;
	private String description;
	private int quantiteMax;
	
	public int getId() {
		return id;
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
	public int getQuantiteMax() {
		return quantiteMax;
	}
	public void setQuantiteMax(int quantiteMax) {
		this.quantiteMax = quantiteMax;
	}

	public ArticleDispoDTO() {
		
	}
	
	public ArticleDispoDTO(int id, String description, String type, int quantiteMax) {
		this.id=id;
		this.description=description;
		this.type=type;
		this.quantiteMax=quantiteMax;
	}
}
