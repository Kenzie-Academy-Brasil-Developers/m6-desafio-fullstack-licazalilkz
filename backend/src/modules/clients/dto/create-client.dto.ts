import { hashSync } from "bcryptjs"
import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateClientDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @Transform(({value}: {value:string}) => hashSync(value, 10), {groups: ['transform']})
    password: string

    @IsNotEmpty()
    @IsString()
    phone: string

    date: string
}
