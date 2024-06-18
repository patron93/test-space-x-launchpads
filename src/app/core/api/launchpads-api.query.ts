import { LaunchpadRequestParams } from '../typings';

export function buildLaunchpadsQuery(params: LaunchpadRequestParams) {
    const query = params.search ? {
        $text: {
            $search: params.search ?? null
        }
    } : {};

    return {
        query: query,
            options: {
            limit: params.limit,
                offset: params.offset,
                page: params.page,
                populate: [
                {
                    path: 'launches',
                    options: {
                        sort: {
                            date_utc: 'desc'
                        },
                    },
                    select: {
                        name: true,
                        date_utc: true,
                    }
                },
            ]
        },
    };
}
