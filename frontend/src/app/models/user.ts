import { Role } from "./Role";

export class User {
  public id!: any;
  public username!: string;
  public password!: string;
  public roles!: Role[];
  public name!: string;
  public lastName!: string;
  public matricule!: string;
  public tel!: string;
  public email!: string;
  public   address!: string;
  public isActive!: boolean;
  public profileImg!: string; // Ajout de l'attribut profileImg
}
