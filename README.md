# JsonReferenceResolver

This module was created to solve the problem of transfering and receiving JavaScript Objects from and to a Backend that uses Newtonsoft JSON. 

This module also solves the problem with circular dependencies that often happen in a Newtonsoft JSON use-case. 

Basically it iterates trough the Object and looks for objects with a `id` like value that can be set, if multiple objects are found with the same `id` all other objects are replaces by a objects that just contains a reference to the first identical found object. 



So if you would use `new JsonRefResolver("$id", "$ref").buildJsonRefified(data)` on this example object

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

### Creating a new JsonRefResolver

The constructor of the `JsonRefResolver` takes in the `id` signature which will be used in the object as the key and the `ref` signature, that will be used to replace the duplicate objects.

```javascript
import { JsonRefResolver } from 'jsonreferenceresolver'

const jsonRefRes = new JsonRefResolver("$id", "$ref");
```

After `buildJsonRefified` or `resolveJsonRefs` are used the `newIds` count and the `refList` are not reset. If you want to reset the `refList` you can call `jsonRefRes.resetRefList()` or you can make a new instance of `JsonRefResolver` that will start from the beginning again.

### Building a refified object

```javascript
import { JsonRefResolver } from 'jsonreferenceresolver'

const jsonRefRes = new JsonRefResolver("$id", "$ref");

const obj = {...};
const refifiedObj = jsonRefRes.buildJsonRefified(obj);

// if the data is a array use buildJsonRefifiedList

const arr = [...];
const refifiedArr = jsonRefRes.buildJsonRefifiedList(arr);
```



### Resolving data with references

```javascript
import { JsonRefResolver } from 'jsonreferenceresolver'

const jsonRefRes = new JsonRefResolver("$id", "$ref");

const obj = {...};
const refifiedObj = jsonRefRes.resolveJsonRefs(obj);

// if the data is a array use resolveJsonRefsList

const arr = [...];
const refifiedArr = jsonRefRes.resolveJsonRefsList(arr);
```



### other functions

```javascript
const jsonRefRes = new JsonRefResolver("$id", "$ref");


jsonRefRes.resetRefList() // clears just the refList manually, if the building should be done with continuous ids
jsonRefRes.getRefList()   // returns the refList as a Map() object
```



## Tests

In the [test directory](https://github.com/dinsicherheitstechnik/jsonreferenceresolver/tree/master/tests) on GitHub



## License 

[MIT](https://github.com/dinsicherheitstechnik/jsonreferenceresolver/blob/master/LICENSE)