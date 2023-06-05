

export class Player {
   private id:string
   private pseudo:string
   private socket? : WebSocket
   private status : boolean

   public constructor(pseudo:string, id : string) {
    this.id = id
    this.pseudo = pseudo
    this.status = false
   }

   public getId () {
    return this.id
   }

   public getPseudo () {
    return this.pseudo
   }

   public setSocket(socket : WebSocket){
      if(!this.socket){
         this.socket = socket
      }
   }

   public getSocket() {
      return this.socket
   }

   public getStatus() : boolean{
      return this.status
   }

   public setStatus(status : boolean){
      this.status = status
   }


}