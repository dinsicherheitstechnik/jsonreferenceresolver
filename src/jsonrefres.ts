export class JsonRefResolver {

    private refList = new Map();

    private newIds: number = 100000;
    private level: number = 0;

    constructor() {
        console.log("creating jsonrefres")
    }

    public buildJsonRefifiedList(arr: Array<any>): Array<any> {
        if (Array.isArray(arr) && arr.length > 0) {
            let tempArr = []
            for (let val of arr) {

                tempArr.push(this.buildJsonRefified(val))
            }
            return tempArr;
        }
        return []
    }

    public buildJsonRefified(obj: any): any {
        let entries = Object.entries(obj)

        for (let [key, val] of entries) {
            if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
                //console.log("   ".repeat(this.level), "obj found", key)
                this.level++;
                //console.log("calling builder for", key)
                obj[key] = this.buildJsonRefified(val)
                this.level--;
            } else if (val !== null && typeof val === 'object' && Array.isArray(val)) {
                this.level++;
                obj[key] = this.buildJsonRefifiedList(val)
                this.level--;
            }
            else {
                if (key === "$id") {
                    if (this.refList.get((val as string).toString()) === undefined) {
                        this.refList.set((val as string).toString(), (this.newIds).toString())
                        //console.log("       found new $id, oldID", val.toString(), "newID", (this.newIds).toString());
                        this.newIds++
                    } else if (this.refList.get((val as string).toString())) {
                        //console.log("       found old $id, replacing with ", this.refList.get(val.toString()).toString());
                        return {
                            '$ref': this.refList.get((val as string).toString()).toString()
                        }
                    }
                }

            }
        }

        if (this.level === 0) {
            return this.resolveIds(obj);
        }
        return obj;
    }

    private resolveIds(obj: any): any {
        let entries = Object.entries(obj)

        for (let [key, val] of entries) {
            if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
                obj[key] = this.resolveIds(val)
            } else if (val !== null && typeof val === 'object' && Array.isArray(val)) {
                obj[key] = this.resolveIdsList(val)
            }
            else {
                if (key === "$id") {
                    obj[key] = this.refList.get(val)
                }
            }
        }
        return obj;
    }

    private resolveIdsList(arr: Array<any>): Array<any> {
        if (Array.isArray(arr) && arr.length > 0) {
            let tempArr = []
            for (let val of arr) {

                tempArr.push(this.resolveIds(val))
            }
            return tempArr;
        }
        return [];
    }

    public resolveJsonRefsList(arr: Array<any>): Array<any> {
        if (Array.isArray(arr) && arr.length > 0) {
            let tempArr = []
            for (let val of arr) {

                tempArr.push(this.resolveJsonRefs(val))
            }
            return tempArr;
        }
        return [];
    }

    public resolveJsonRefs(obj: any): any {
        //console.log("resolveJsonRefs", obj)
        let entries = Object.entries(obj)

        for (let [key, val] of entries) {
            if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
                //sole.log("   ".repeat(this.level), "obj found", key)
                this.level++;
                // console.log(this.level, "not array found", obj)
                obj[key] = this.resolveJsonRefs(val)
                this.level--;
            } else if (val !== null && typeof val === 'object' && Array.isArray(val)) {

                this.level++;
                // console.log(this.level, "array found", obj)
                obj[key] = this.resolveJsonRefsList(val)
                this.level--;
            }
            else {
                if (key === "$id" && this.refList.get(val) === undefined) {
                    //console.log("   ".repeat(level), 'new id found', val, newIds)
                    this.refList.set(val, obj)
                } else if (key === "$id" && this.refList.get(val)) {
                    //console.log("   ".repeat(level), 'found $id duplicate. This shouldnt happen', val, refList.get(val))
                } else if (key === "$ref") {
                    //console.log("   ".repeat(this.level), 'found $ref', val, this.refList.get(val))
                    return this.refList.get(val)
                }
            }
        }
        return obj;
    }


}