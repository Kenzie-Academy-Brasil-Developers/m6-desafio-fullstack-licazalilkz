import { Exclude } from "class-transformer"
import { randomUUID } from "crypto"

export class Client {
    readonly id: string
    name: string
    email: string

    @Exclude()
    password: string

    date: string
    phone: string

    constructor(){
        const currentDate = new Date().toLocaleDateString('pt-BR', {
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit'
        });
        this.id = randomUUID()
        this.date = currentDate
    }

}
