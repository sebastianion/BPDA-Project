import { ApiProperty } from "@nestjs/swagger";

export class WhitelistAddress {
    @ApiProperty()
    name!: string;
}