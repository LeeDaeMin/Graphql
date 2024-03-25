import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType({ description: 'Todo quick Aggreagations' })
export class AggregationsType {

    @Field( () => Int )
    total: number;

    @Field( () => Int )
    pending: number;

    @Field( () => Int )
    complete: number;

}