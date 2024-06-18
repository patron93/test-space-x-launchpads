export interface LaunchpadDto {
    images: Record<LaunchpadImageSize, string[]>;
    name: string;
    locality: string;
    region: string;
    launches: LaunchpadLaunchDto[];
    details: string;
    id: string;
}

export interface LaunchpadLaunchDto {
    name: string;
    id: string;
    date_utc: string;
}

export type LaunchpadImageSize = 'large'

export interface LaunchpadRequestParams {
    search?: string;
    page?: number;
    limit?: number;
    offset?: number;
}
