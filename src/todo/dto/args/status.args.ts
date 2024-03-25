import { ArgsType, Field } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";


@ArgsType()
export class StatusArgs {

    @Field( () => Boolean, { name: 'status', nullable: true })
    @IsBoolean()
    @IsOptional()
    status?: boolean;

}