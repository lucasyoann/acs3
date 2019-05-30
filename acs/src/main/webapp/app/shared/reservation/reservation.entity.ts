import { ReservationArticle } from "../../shared/reservation/reservationArticle.entity";

export class Reservation {
    id: number;
    dateEmprunt: Date;
    dateRestitution: Date;
    creerLe: Date;
    creerPar: string;
    valideLe: Date;
    validePar: string;
    nom: string;
    prenom: string;
    asso: boolean;
    commentaire: string;
    articleResaDto: ReservationArticle[]= new Array();
}
