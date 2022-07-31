import {Model, Table, Column, DataType, BelongsToMany, HasMany} from 'sequelize-typescript'
import {ApiProperty} from '@nestjs/swagger'
import { Role } from 'src/roles/role.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { Posts } from 'src/posts/posts.model';

interface UserCreationAttrs {
    email: string,
    password: string
}

@Table({
    tableName: 'users'
})
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({
       example: '1',
       description: "Unique Id"
    })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;
    @ApiProperty({
        example: "user@gmail.com",
        description: "Email Inbox"
    })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    email: string;
    @ApiProperty({
        example: "admin123",
        description: "Password"
    })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;
    @ApiProperty({
        example: "Foolish",
        description: "For Ban!"
    })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    banned: boolean;
    @ApiProperty({
        example: "User mat",
        description: "For ban!"
    })
    @Column({
        type: DataType.STRING,
        defaultValue: null
    })
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany( () => Posts)
    posts: Posts[];
}