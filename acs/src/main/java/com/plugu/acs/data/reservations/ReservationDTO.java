package com.plugu.acs.data.reservations;

import java.util.Date;

public class ReservationDTO {
	
	private long id;
	private int quantite;
	private Date dateEmprunt;
	private Date dateRestitution;
	private Date creerLe;
	private String creerPar;
	private Date valideLe;
	private String validePar;
	private int clientId;
	
	public long getId() {
		return id;
	}
	public int getClientId() {
		return clientId;
	}
	public void setClientId(int clientId) {
		this.clientId = clientId;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getQuantite() {
		return quantite;
	}
	public void setQuantite(int quantite) {
		this.quantite = quantite;
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

}
