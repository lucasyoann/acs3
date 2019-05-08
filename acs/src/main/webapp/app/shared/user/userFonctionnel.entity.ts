
export class UserFonctionnel{

        id : number;
        username : string;
        email : string;
        password :string;
        passwordConfirm:string;
        roles : string[]= new Array();
        administrateur : boolean;
        superAdministrateur : boolean;
}