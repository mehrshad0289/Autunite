import mock from '../mock';


mock.onGet('/api/dashboard-data').reply(({ data }) => {
    return [200, {
        data: {
            'userNft': {
                imgUrl: 'assets/images/logo/logo.svg',
                code: 'Au24256',
                totalDeposit: 0,
                leftCredit: 0,
                rightCredit: 0,
            },
            userContract: {
                lastExpireDate: '2025/3/7',
                nextPriod:"2023/04/05 00:00:00"
            },
            'myAvailableIncomes': 0,
            'totalIncome': 0,
            'totalReferralBonus': 0,
            'totalROI': 0,
            'totalAward': 0,
            'numberOfMyGroups': 0,
            'leftGroupCredit': 0,
            'rightGroupCredit': 0,
            'nfts': [
                {
                    'imgUrl': 'assets/images/logo/logo.svg',
                    'name': 'Most Investment',
                    'price': 0,
                },
                {
                    'imgUrl': 'assets/images/logo/logo.svg',
                    'name': 'Top Earner',
                    'price': 0,
                },
                {
                    'imgUrl': 'assets/images/logo/logo.svg',
                    'name': 'Most Referrer',
                    'price': 0,
                },
            ],
        },
    }];
});


