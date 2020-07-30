# JsonReferenceResolver

This module was created to solve the problem of transfering and receiving JavaScript Objects from and to a Backend that uses Newtonsoft JSON. 

This module also solves the problem with circular dependencies that often happen in a Newtonsoft JSON use-case. 

Basically it iterates trough the Object and looks for objects with a value `$id`, if multiple objects are found with the same `$id` all other objects are replaces by a objects that just contains a reference to the first identical found object. 



So if you would use `new JsonRefResolver().buildJsonRefified(data)` on this example object

```json
{
    "$id": "1",
    "name": "Order",
    "country": {
        "$id": "2",
        "name": "USA"
    },
    "articles": [
        {
            "$id": "3",
            "type": "PC",
            "manufacturer": {
                "$id": "4",
                "name": "Lenovo",
                "country": {
        			"$id": "2",
        			"name": "USA"
    			}
            }
        }
    ] 
}
```

the result would looks like this 

```json
{
    "$id": "100000",
    "name": "Order",
    "country": {
        "$id": "100001",
        "name": "USA"
    },
    "articles": [
        {
            "$id": "100002",
            "type": "PC",
            "manufacturer": {
                "$id": "100003",
                "name": "Lenovo",
                "country": { "$ref": "100001" }
            }
        }
    ] 
}
```



## Usage

Install the package via npm

```bash
$ npm install jsonreferenceresolver
```



### Building a refified object

```javascript
import { JsonRefResolver } from 'jsonreferenceresolver'

const jsonRefRes = new JsonRefResolver();

const obj = {...};
const refifiedObj = jsonRefRes.buildJsonRefified(obj);

// if the data is a array use buildJsonRefifiedList

const arr = [...];
const refifiedArr = jsonRefRes.buildJsonRefifiedList(arr);
```



### Resolving data with references

```javascript
import { JsonRefResolver } from 'jsonreferenceresolver'

const jsonRefRes = new JsonRefResolver();

const obj = {...};
const refifiedObj = jsonRefRes.resolveJsonRefs(obj);

// if the data is a array use resolveJsonRefsList

const arr = [...];
const refifiedArr = jsonRefRes.resolveJsonRefsList(arr);
```



### other functions

```javascript
const jsonRefRes = new JsonRefResolver();


jsonRefRes.resetRefList() // clears just the refList manually, if the building should be done with continuous ids
jsonRefRes.getRefList()   // returns the refList as a Map()
```



## Tests

In the [test directory](https://github.com/dinsicherheitstechnik/jsonreferenceresolver/tree/master/tests) on GitHub



## License 

[MIT](https://github.com/dinsicherheitstechnik/jsonreferenceresolver/blob/master/LICENSE)