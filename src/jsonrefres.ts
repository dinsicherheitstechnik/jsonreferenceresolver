export class IdResolver {

    private idIdentifier: string;
    private loidIdentifier: string;
    private idFeed: number;

    private idMap = new Map<string, number>();
    //private objMap = new Map<string, object>();


    constructor(id: string, loid: string, seed: number) {
        this.idIdentifier = id;
        this.loidIdentifier = loid;
        this.idFeed = seed;
    }

    public async resolveIds(obj: any) {
        await this.resolveIdsRecursive(obj);
        // console.log("obj: ",obj);
        
    }
 
    private async resolveIdsRecursive(obj: any) {
        let entries = Object.entries(obj);
        // we got an assigned id
        // console.log(obj[this.loidIdentifier], this.idMap,this.idMap.get(obj[this.loidIdentifier]))
        if(this.idMap.get(obj[this.loidIdentifier]) !== undefined) {
            obj[this.idIdentifier] = this.idMap.get(obj[this.loidIdentifier])
        } else {
            obj[this.idIdentifier] = ++this.idFeed;
            this.idMap.set(obj[this.loidIdentifier], this.idFeed);
            //this.objMap.set(obj[this.loidIdentifier], obj)
        }

        for(let [key, val] of entries) {
            // val is object
            if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
                if(this.idMap.get(val[this.loidIdentifier])) {
                    // console.log("==============?????",val[this.loidIdentifier], this.idMap,this.idMap.get(val[this.loidIdentifier]))
                    val[this.idIdentifier] = this.idMap.get(val[this.loidIdentifier]);
                } else {
                    this.resolveIdsRecursive(val);
                }
            }
            // val is array
            else if (val !== null && typeof val === 'object' && Array.isArray(val) && !isBasic(val)) {
                for (let instance of val) {
                    if(this.idMap.get(instance[this.loidIdentifier])) {
                        // console.log("==============!",instance[this.loidIdentifier], this.idMap,this.idMap.get(instance[this.loidIdentifier]))
                        instance[this.idIdentifier] = this.idMap.get(instance[this.loidIdentifier]);
                    } else {
                        this.resolveIdsRecursive(instance);
                    }
                } 
            }
        }
    }
}

const isBasic = (arr: any[]): boolean => {
    return arr.every(item => {
        if (item !== null && typeof item === 'object' && !Array.isArray(item)) { 
            return false;
        } else if (item !== null && typeof item === 'object' && Array.isArray(item)) {
            return false;
        } else {
            return true;
        }
    });
}

export class Refifier {

    private idIdentifier: string;
    private refIdentifier: string;
    private loidIdentifier: string;
    private idFeed: number;

    private level: number = 0;

    private idMap = new Map<string, number>();


    constructor(id: string, ref: string, loid: string, seed: number) {
        this.idIdentifier = id;
        this.refIdentifier = ref;
        this.loidIdentifier = loid;
        this.idFeed = seed;
    }

    public resetReferenceList() {
        this.idMap = new Map<string, number>(); 
    }

    public getReferenceList(): Map<string, number> {
        return this.idMap;
    }

    public refifyList(arr: Array<any>): Array<any> {
        if (Array.isArray(arr) && arr.length > 0) {
            let tempArr = []
            for (let val of arr) {
                tempArr.push(this.refify(val))
            }
            return tempArr;
        }
        return []
    }

    public refify(obj: any): any {
        let entries = Object.entries(obj);

        if(this.idMap.get(obj[this.loidIdentifier])) {
            const returnObj = {}
            returnObj[this.refIdentifier] = this.idMap.get(obj[this.loidIdentifier]).toString()
            return returnObj
        } else {
            obj[this.idIdentifier] = ++this.idFeed;
            this.idMap.set(obj[this.loidIdentifier], this.idFeed);
        }

        for(let [key, val] of entries) {
            // val is object
            if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
                this.level++;
                obj[key] = this.refify(val);
                this.level--;
            }
            // val is array
            else if (val !== null && typeof val === 'object' && Array.isArray(val) && !isBasic(val)) {
                this.level++;
                let tempArr = [];
                for (let instance of val) {
                    tempArr.push(this.refify(instance));
                }
                obj[key] = tempArr;
                this.level--;
            }
        }

        if (this.level === 0) {
            obj[this.idIdentifier] = this.idMap.get(obj[this.loidIdentifier]);
            return obj;
        }
        
        return obj;
    }
    
}

export class Resolver {
    private idIdentifier: string;
    private refIdentifier: string;

    private refMapArray = new Array;

    constructor(id: string, ref: string) {
        this.idIdentifier = id;
        this.refIdentifier = ref;
    }

    public getReferenceList(): Array<any> {
        return this.refMapArray;
    }

    public resetReferenceList() {
        this.refMapArray = new Array;
    }

    public resolveList(arr: Array<any>): Array<any> {
        if(Array.isArray(arr) && arr.length > 0) {
            let tempArr = []
            for (let val of arr) {
                tempArr.push(this.resolve(val))
            }
            return tempArr
        }
        return []
    }

    public resolve(obj: object): object {
        let entries = Object.entries(obj);
        
        if (obj[this.idIdentifier] !== undefined) {
            this.refMapArray.push({"id": obj[this.idIdentifier], "obj": obj});
            // console.log("saving", obj[this.idIdentifier]);
            
        } else {
            // console.log(")))))))))))))))))))))))))))))))))))))>",obj, obj[this.refIdentifier], this.refMapArray.find(i => {if((i.id.toString()) == (obj[this.refIdentifier])) return i.obj})["obj"]);
            
            return this.refMapArray.find(i => {if((i.id.toString()) == (obj[this.refIdentifier])) return i.obj})["obj"];
        }
        
        for(let [key, val] of entries) {
            // val is object
            if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
                // console.log("trying to resolve", obj, val);
                
                obj[key] = this.resolve(val);
            }
            // val is array
            else if (val !== null && typeof val === 'object' && Array.isArray(val) && !isBasic(val)) {
                let tempArr = [];
                for (let instance of val) {
                    tempArr.push(this.resolve(instance));
                }
                obj[key] = tempArr;
            }
        }

        return obj;
    }
}