export class UserDto{
	id!: number;
	email!: string;
	password!: string;
	authToken!: string;
	refreshToken!: string;
	isActive!: boolean;
	code!: number;
	msg!: string;
}
