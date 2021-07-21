# JsonReferenceResolver

This module was created to solve the problem of transfering and receiving JavaScript Objects from and to a Backend that uses Newtonsoft JSON. 

This module also solves the problem with circular dependencies that often happen in a Newtonsoft JSON use-case. 

Basically it iterates trough the Object and looks for objects with a `id` like value that can be set, if multiple objects are found with the same `id` all other objects are replaces by a objects that just contains a reference to the first identical found object.

This module has provides three different classes that each serve a different solution to a problem that can happen while working with Newtonsoft JSON.

These three classes are are `Refifier, Resolver and IdResolver`. These classes will be further explained below. 

So if you would use `new Refifier("$id", "$ref", 99999).refify(data)` on this example object

```json
{
    "$id": "1",
    "logicalObjectId": "0001",
    "name": "Order",
    "country": {
        "$id": "2",
        "logicalObjectId": "0002",
        "name": "USA"
    },
    "articles": [
        {
            "$id": "3",
            "logicalObjectId": "0003",
            "type": "PC",
            "manufacturer": {
                "$id": "4",
                "logicalObjectId": "0004",
                "name": "Lenovo",
                "country": {
        			"$id": "2",
                    "logicalObjectId": "0002",
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
    "logicalObjectId": "0001",
    "name": "Order",
    "country": {
        "$id": "100001",
        "logicalObjectId": "0002",
        "name": "USA"
    },
    "articles": [
        {
            "$id": "100002",
            "logicalObjectId": "0003",
            "type": "PC",
            "manufacturer": {
                "$id": "100003",
                "logicalObjectId": "0004",
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

The constructor of the `JsonRefResolver` sub packages all take different parameters.



takes in the `id` signature which will be used in the object as the key and the `ref` signature, that will be used to replace the duplicate objects.

```javascript
import { Refifier, Resolver, IdResolver } from 'jsonreferenceresolver'

const refifier = new Refifier("$id", "$ref", 1000);
// takes in the `id` signature which will be used in the object as the key, the `ref` signature, that will be used to replace the duplicate objects and a seed which is the startvalue of the new `ids`.

const resolver = new Resolver("$id", "$ref");
// same as above, but you don't need a seed, because the id's wont change 

const idResolver = new IdResolver("$id", "$ref", "logicalObjectId", 2000);
// id signature, ref signature, the value that is definitly different in every object, seed
```

After `refify` or `resolve` are used the `newIds` count and the `refList` are not reset. If you want to reset the `refList` you can call `refifyer/resolver.resetRefereceList()` or you can make a new instance of those classes.

### Building a refified object

```javascript
import { Refifier } from 'jsonreferenceresolver'

const refifier = new Refifier("$id", "$ref", 1000);

const obj = {...};
const refifiedObj = refifier.refify(obj);

// if the data is a array use refifyList

const arr = [...];
const refifiedArr = refifier.refifyList(arr);
```



### Resolving data with references

```javascript
import { Resolver } from 'jsonreferenceresolver'

const resolver = new Resolver("$id", "$ref");

const obj = {...};
const refifiedObj = resolver.resolve(obj);

// if the data is a array use resolveJsonRefsList

const arr = [...];
const refifiedArr = resolver.resolveList(arr);
```



### Resolving all Id's in a complex Object

```javascript
import { IdResolver } from 'jsonreferenceresolver'

const resolver = new IdResolver("$id", "$ref", "logicalObjectId", 10000);

const obj = {...};
const refifiedObj = resolver.resolve(obj);
```





### other functions

```javascript
const refifier = new Refifier("$id", "$ref", 1000);
const resolver = new Resolver("$id", "$ref");


refifier/resolver.resetRefList() // clears just the refList manually, if the building should be done with continuous ids
refifier/resolver.getReferenceList()   // returns the refList as a Map() object or as an Array
```



## Tests

In the [test directory](https://github.com/dinsicherheitstechnik/jsonreferenceresolver/tree/master/tests) on GitHub



## License 

[MIT](https://github.com/dinsicherheitstechnik/jsonreferenceresolver/blob/master/LICENSE)