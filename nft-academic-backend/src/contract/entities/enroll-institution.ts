import { ApiProperty } from "@nestjs/swagger";

export class EnrollInstitution {
    @ApiProperty()
    name!: string;

    @ApiProperty()
    amount!: bigint; 
}