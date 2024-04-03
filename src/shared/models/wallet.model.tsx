export interface walletBalanceModel {
    "totalAvailableBalance": number,
    "totalBookedBalance": number,
    "currency": {
        "name": string,
        "code": string,
        "symbol": string
    },
    "walletInfos": [
        {
            "walletId": number | string,
            "currency": {
                "name": string,
                "code": string,
                "symbol": string
            },
            "walletNumber": string,
            "walletName": string,
            "schemeId": string,
            "walletKycLevel": string,
            "accountNumber": string | number,
            "accountName": string,
            "dateCreated": string,
            "bookedBalance": string | number,
            "availableBalance": string | number,
            "bank": {
                "code": string,
                "name": string
            }
        }
    ]
}

export interface walletHistoryData {
        "transactionId": number,
        "transactionReference": string,
        "processorReference": string,
        "transactionEvent": string,
        "transactionType": string,
        "transactionMode": string,
        "currency": {
            "name": string,
            "code": string,
            "symbol": string
        }
}

export interface walletHistoryResponse {
    "current_page": number,
    "pages": number,
    "lastShowing": number,
    "total_record_count": number,
    "currentLastRecord": number,
    "contents": walletHistoryData[]
}

export interface TransactionModel {
    
}
