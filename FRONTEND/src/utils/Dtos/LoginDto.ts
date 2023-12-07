export interface LoginRequestDto {
	Username: string;
	Password: string;
}

export interface LoginResponseDto {
	expiration: string;
	id: string;
	token: string;
}
