import { uuid } from "uuidv4"

export class Player {
   private id:string
   private pseudo:string

   public constructor(pseudo:string) {
    this.id = uuid()
    this.pseudo = pseudo
   }


}