export const unrefifiedOrder1 = {
    "$id": "1",
    "name": "Order",
    "ordernumber": 3242332,
    "someArr": [],
    "articles": [
        {
            "$id": "2",
            "articlenumber": 42342,
            "articleName": "STRING ARC",
            "manufacturer": "din – Dietmar Nocker Sicherheitstechnik GmbH & Co KG",
            "price": 499.99,
            "currency": {
                "$id": "3",
                "currencyType": "Euro",
                "rate": 3.532
            }
        },
        {
            "$id": "4",
            "articlenumber": 64655,
            "articleName": "STRING 2",
            "manufacturer": "din – Dietmar Nocker Sicherheitstechnik GmbH & Co KG",
            "price": 299.99,
            "currency": {
                "$id": "3",
                "currencyType": "Euro",
                "rate": 3.532
            }
        },
        {
            "$id": "5",
            "articlenumber": 28535,
            "articleName": "BASIC 2",
            "manufacturer": "din – Dietmar Nocker Sicherheitstechnik GmbH & Co KG",
            "price": 399.99,
            "currency": {
                "$id": "3",
                "currencyType": "Euro",
                "rate": 3.532
            }
        },
    ],
    "customer": {
        "$id": "6",
        "name": "Adobe Inc.",
        "customerNumber": 324423432,
        "deliveryAddress": {
            "$id": "7",
            "name": "Adobe Inc.",
            "street": "Silicon Valley",
            "streetNumber": "1",
            "streetNumberAddition": null,
            "city": "San Francisco",
            "country": {
                "$id": "8",
                "name": "US",
                "longName": "United States",
                "isAvailable": true,
                "principalName": null
            }
        },
        "invoiceAddress": {
            "$id": "9",
            "name": "Adobe Inc.",
            "street": "Silicon Valley",
            "streetNumber": "1",
            "streetNumberAddition": null,
            "city": "San Francisco",
            "country": {
                "$id": "8",
                "name": "US",
                "longName": "United States",
                "isAvailable": true,
                "principalName": null
            }
        },
        "employeeSales": {
            "$id": "10",
            "number": "1105",
            "firstName": "John",
            "lastName": "Doe",
            "phone": "+43 123 4567-901",
            "email": "john.doe@email.at",
            "userId": null,
            "isAvailable": true,
            "principalName": null,
            "correspondingArticle": {
                "$id": "1",
                "name": "smting"
            }
        },
    }
}

export const refifiedOrder1 = {
    "$id": "100000",
    "name": "Order",
    "ordernumber": 3242332,
    "someArr": [],
    "articles": [
        {
            "$id": "100001",
            "articlenumber": 42342,
            "articleName": "STRING ARC",
            "manufacturer": "din – Dietmar Nocker Sicherheitstechnik GmbH & Co KG",
            "price": 499.99,
            "currency": {
                "$id": "100002",
                "currencyType": "Euro",
                "rate": 3.532
            }
        },
        {
            "$id": "100003",
            "articlenumber": 64655,
            "articleName": "STRING 2",
            "manufacturer": "din – Dietmar Nocker Sicherheitstechnik GmbH & Co KG",
            "price": 299.99,
            "currency": {
                "$ref": "100002"
            }
        },
        {
            "$id": "100004",
            "articlenumber": 28535,
            "articleName": "BASIC 2",
            "manufacturer": "din – Dietmar Nocker Sicherheitstechnik GmbH & Co KG",
            "price": 399.99,
            "currency": {
                "$ref": "100002"
            }
        }
    ],
    "customer": {
        "$id": "100005",
        "name": "Adobe Inc.",
        "customerNumber": 324423432,
        "deliveryAddress": {
            "$id": "100006",
            "name": "Adobe Inc.",
            "street": "Silicon Valley",
            "streetNumber": "1",
            "streetNumberAddition": null,
            "city": "San Francisco",
            "country": {
                "$id": "100007",
                "name": "US",
                "longName": "United States",
                "isAvailable": true,
                "principalName": null
            }
        },
        "invoiceAddress": {
            "$id": "100008",
            "name": "Adobe Inc.",
            "street": "Silicon Valley",
            "streetNumber": "1",
            "streetNumberAddition": null,
            "city": "San Francisco",
            "country": {
                "$ref": "100007"
            }
        },
        "employeeSales": {
            "$id": "100009",
            "number": "1105",
            "firstName": "John",
            "lastName": "Doe",
            "phone": "+43 123 4567-901",
            "email": "john.doe@email.at",
            "userId": null,
            "isAvailable": true,
            "principalName": null,
            "correspondingArticle": {
                "$ref": "100000"
            }
        }
    }
}

export const derefifiedOrder1WithoutCircular = {
    "$id": "100000",
    "name": "Order",
    "ordernumber": 3242332,
    "someArr": [],
    "articles": [
        {
            "$id": "100001",
            "articlenumber": 42342,
            "articleName": "STRING ARC",
            "manufacturer": "din – Dietmar Nocker Sicherheitstechnik GmbH & Co KG",
            "price": 499.99,
            "currency": {
                "$id": "100002",
                "currencyType": "Euro",
                "rate": 3.532
            }
        },
        {
            "$id": "100003",
            "articlenumber": 64655,
            "articleName": "STRING 2",
            "manufacturer": "din – Dietmar Nocker Sicherheitstechnik GmbH & Co KG",
            "price": 299.99,
            "currency": {
                "$id": "100002",
                "currencyType": "Euro",
                "rate": 3.532
            }
        },
        {
            "$id": "100004",
            "articlenumber": 28535,
            "articleName": "BASIC 2",
            "manufacturer": "din – Dietmar Nocker Sicherheitstechnik GmbH & Co KG",
            "price": 399.99,
            "currency": {
                "$id": "100002",
                "currencyType": "Euro",
                "rate": 3.532
            }
        }
    ],
    "customer": {
        "$id": "100005",
        "name": "Adobe Inc.",
        "customerNumber": 324423432,
        "deliveryAddress": {
            "$id": "100006",
            "name": "Adobe Inc.",
            "street": "Silicon Valley",
            "streetNumber": "1",
            "streetNumberAddition": null,
            "city": "San Francisco",
            "country": {
                "$id": "100007",
                "name": "US",
                "longName": "United States",
                "isAvailable": true,
                "principalName": null
            }
        },
        "invoiceAddress": {
            "$id": "100008",
            "name": "Adobe Inc.",
            "street": "Silicon Valley",
            "streetNumber": "1",
            "streetNumberAddition": null,
            "city": "San Francisco",
            "country": {
                "$id": "100007",
                "name": "US",
                "longName": "United States",
                "isAvailable": true,
                "principalName": null
            }
        },
        "employeeSales": {
            "$id": "100009",
            "number": "1105",
            "firstName": "John",
            "lastName": "Doe",
            "phone": "+43 123 4567-901",
            "email": "john.doe@email.at",
            "userId": null,
            "isAvailable": true,
            "principalName": null
        }
    }
}

export const unrefifiedArr1 = [
    {
        "$id": "1",
        "name": "James Hetfield",
        "function": "singer",
        "country": {
            "$id": "8",
            "name": "US",
            "longName": "United States",
            "isAvailable": true,
            "principalName": null
        }
    },
    {
        "$id": "2",
        "name": "Kirk Hammett",
        "function": "lead guitar",
        "country": {
            "$id": "8",
            "name": "US",
            "longName": "United States",
            "isAvailable": true,
            "principalName": null
        }
    },
    {
        "$id": "3",
        "name": "Robert Trujillo",
        "function": "e-bass",
        "country": {
            "$id": "8",
            "name": "US",
            "longName": "United States",
            "isAvailable": true,
            "principalName": null
        }
    },
    {
        "$id": "4",
        "name": "Lars Ulrich",
        "function": "drums",
        "country": {
            "$id": "8",
            "name": "US",
            "longName": "United States",
            "isAvailable": true,
            "principalName": null
        }
    }
]

export const refifiedArr1 = [
    {
        "$id": "100000",
        "name": "James Hetfield",
        "function": "singer",
        "country": {
            "$id": "100001",
            "name": "US",
            "longName": "United States",
            "isAvailable": true,
            "principalName": null
        }
    },
    {
        "$id": "100002",
        "name": "Kirk Hammett",
        "function": "lead guitar",
        "country": {
            "$ref": "100001"
        }
    },
    {
        "$id": "100003",
        "name": "Robert Trujillo",
        "function": "e-bass",
        "country": {
            "$ref": "100001"
        }
    },
    {
        "$id": "100004",
        "name": "Lars Ulrich",
        "function": "drums",
        "country": {
            "$ref": "100001"
        }
    }
]

export const derefifiedArr1 = [
    {
        "$id": "100000",
        "name": "James Hetfield",
        "function": "singer",
        "country": {
            "$id": "100001",
            "name": "US",
            "longName": "United States",
            "isAvailable": true,
            "principalName": null
        }
    },
    {
        "$id": "100002",
        "name": "Kirk Hammett",
        "function": "lead guitar",
        "country": {
            "$id": "100001",
            "name": "US",
            "longName": "United States",
            "isAvailable": true,
            "principalName": null
        }
    },
    {
        "$id": "100003",
        "name": "Robert Trujillo",
        "function": "e-bass",
        "country": {
            "$id": "100001",
            "name": "US",
            "longName": "United States",
            "isAvailable": true,
            "principalName": null
        }
    },
    {
        "$id": "100004",
        "name": "Lars Ulrich",
        "function": "drums",
        "country": {
            "$id": "100001",
            "name": "US",
            "longName": "United States",
            "isAvailable": true,
            "principalName": null
        }
    }
]