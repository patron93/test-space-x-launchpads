import { LaunchpadRequestParams } from '../typings';

export function buildLaunchpadsQuery(params: LaunchpadRequestParams) {
    const query = params.search ? {
        $or: [
            { name: { $regex: params.search, $options: 'i' } },
            { region: { $regex: params.search, $options: 'i' } }
        ]
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
