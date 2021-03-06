package com.plugu.acs.data.reservations;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.plugu.acs.data.reservationarticle.ReservationArticle;

@Entity
@Table(name="RESERVATION")
public class Reservation {
	
	@Column(name="ID")
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
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
	private Boolean asso;

	@Column(name="ACTIVE")
	private Boolean active;
	
	@Column(name="COMMENTAIRE")
	private String commentaire;
	@Column(name="A_VALIDER")
	private Boolean avalider;
	
	@OneToMany(mappedBy = "primaryKey.reservation",
			cascade= CascadeType.ALL)
	private Set<ReservationArticle> reservationArticles = new HashSet<ReservationArticle>();
	
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

	public Set<ReservationArticle> getReservationArticles() {
		return reservationArticles;
	}

	public void setReservationArticles(Set<ReservationArticle> reservationArticles) {
		this.reservationArticles = reservationArticles;
	}
	
	public void addReservationArticle(ReservationArticle reservationArticle) {
		this.reservationArticles.add(reservationArticle);
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

	public Boolean getAvalider() {
		return avalider;
	}

	public void setAvalider(Boolean avalider) {
		this.avalider = avalider;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((active == null) ? 0 : active.hashCode());
		result = prime * result + ((asso == null) ? 0 : asso.hashCode());
		result = prime * result + ((avalider == null) ? 0 : avalider.hashCode());
		result = prime * result + ((commentaire == null) ? 0 : commentaire.hashCode());
		result = prime * result + ((creerLe == null) ? 0 : creerLe.hashCode());
		result = prime * result + ((creerPar == null) ? 0 : creerPar.hashCode());
		result = prime * result + ((dateEmprunt == null) ? 0 : dateEmprunt.hashCode());
		result = prime * result + ((dateRestitution == null) ? 0 : dateRestitution.hashCode());
		result = prime * result + id;
		result = prime * result + ((nom == null) ? 0 : nom.hashCode());
		result = prime * result + ((prenom == null) ? 0 : prenom.hashCode());
		result = prime * result + ((reservationArticles == null) ? 0 : reservationArticles.hashCode());
		result = prime * result + ((valideLe == null) ? 0 : valideLe.hashCode());
		result = prime * result + ((validePar == null) ? 0 : validePar.hashCode());
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
		Reservation other = (Reservation) obj;
		if (active == null) {
			if (other.active != null)
				return false;
		} else if (!active.equals(other.active))
			return false;
		if (asso == null) {
			if (other.asso != null)
				return false;
		} else if (!asso.equals(other.asso))
			return false;
		if (avalider == null) {
			if (other.avalider != null)
				return false;
		} else if (!avalider.equals(other.avalider))
			return false;
		if (commentaire == null) {
			if (other.commentaire != null)
				return false;
		} else if (!commentaire.equals(other.commentaire))
			return false;
		if (creerLe == null) {
			if (other.creerLe != null)
				return false;
		} else if (!creerLe.equals(other.creerLe))
			return false;
		if (creerPar == null) {
			if (other.creerPar != null)
				return false;
		} else if (!creerPar.equals(other.creerPar))
			return false;
		if (dateEmprunt == null) {
			if (other.dateEmprunt != null)
				return false;
		} else if (!dateEmprunt.equals(other.dateEmprunt))
			return false;
		if (dateRestitution == null) {
			if (other.dateRestitution != null)
				return false;
		} else if (!dateRestitution.equals(other.dateRestitution))
			return false;
		if (id != other.id)
			return false;
		if (nom == null) {
			if (other.nom != null)
				return false;
		} else if (!nom.equals(other.nom))
			return false;
		if (prenom == null) {
			if (other.prenom != null)
				return false;
		} else if (!prenom.equals(other.prenom))
			return false;
		if (reservationArticles == null) {
			if (other.reservationArticles != null)
				return false;
		} else if (!reservationArticles.equals(other.reservationArticles))
			return false;
		if (valideLe == null) {
			if (other.valideLe != null)
				return false;
		} else if (!valideLe.equals(other.valideLe))
			return false;
		if (validePar == null) {
			if (other.validePar != null)
				return false;
		} else if (!validePar.equals(other.validePar))
			return false;
		return true;
	}

	
	
}
