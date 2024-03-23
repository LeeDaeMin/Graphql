import { Field, Int, ObjectType } from "@nestjs/graphql";


// representancion de una entrada de como sera la base de datos
@ObjectType()
export class Todo {
    
    @Field( () => Int )
    id: number;

    @Field( () => String )
    description: String;

    @Field( () => Boolean )
    done: boolean = false
}