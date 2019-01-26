import { ArticleDispo } from "src/main/webapp/app/shared/reservation/articleDispo.entity";

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
    articleDispo: ArticleDispo[];
}
