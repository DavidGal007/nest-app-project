import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
    @IsString({message: "Should be a String!"})
    readonly value: string;

    @IsNumber({}, {message: "Should be a Number!"})
    readonly userId: number;
}