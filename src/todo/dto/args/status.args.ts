import { Field } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";


export class StatusArgs {

    @Field( () => Boolean, { name: 'Status_TODO', nullable: true })
    @IsBoolean()
    @IsNotEmpty()
    @IsOptional()
    status: boolean;

}