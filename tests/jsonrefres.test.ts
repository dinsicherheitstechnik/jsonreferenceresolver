import { Resolver, Refifier, IdResolver } from '../src/jsonrefres';
import * as data from "./mockData";
import { isCyclic } from "./helpers";

test('buildJsonRefified object', () => {
    const refifier = new Refifier("$id", "$ref", "logicalObjectId", (100000-1))
    const refified = refifier.refify(data.unrefifiedOrder1)
    expect(refified).toEqual(data.refifiedOrder1);
});

test('buildJsonRefifiedList object', () => {
    const refifier = new Refifier("$id", "$ref", "logicalObjectId", (100000-1))
    const refified = refifier.refifyList(data.unrefifiedArr1)
    expect(refified).toEqual(data.refifiedArr1);
});

test('resolveJsonRefs object with circular dependecies', () => {
    const jsonrefres = new Resolver("$id", "$ref")
    const refified = jsonrefres.resolve(data.refifiedOrder1)
    expect(isCyclic(refified)).toBe(true);
    expect((refified as any).customer.employeeSales.correspondingArticle.$id).toEqual((refified as any).$id)
});

test('resolveJsonRefsList on Array', () => {
    const jsonrefres = new Resolver("$id", "$ref")
    const refified = jsonrefres.resolveList(data.refifiedArr1)
    expect(refified).toEqual(data.derefifiedArr1)
});

test('resolveJsonRefs object without circular dependecies', () => {
    const jsonrefres = new Resolver("$id", "$ref")
    delete data.refifiedOrder1.customer.employeeSales.correspondingArticle
    const refified = jsonrefres.resolve(data.refifiedOrder1)

    expect(isCyclic(refified)).toBe(false);
    expect(refified).toEqual(data.derefifiedOrder1WithoutCircular)
});

test('check if clearRefList works', () => {
    const jsonrefres = new Resolver("$id", "$ref")
    delete data.refifiedOrder1.customer.employeeSales.correspondingArticle
    jsonrefres.resolve(data.refifiedOrder1)

    expect(jsonrefres.getReferenceList().length).toBeGreaterThan(0)
    jsonrefres.resetReferenceList()
    expect(jsonrefres.getReferenceList().length).toEqual(0)
});

// test('check if resolveIds works', async () => {
//     const idResolver = new IdResolver("$id", "logicalObjectId", 19);
//     let f = data.mixedIds
//     await idResolver.resolveIds(f).then(() => {
//         console.log(f)
//     })
//     expect(f).toEqual(data.mixedIdsResolved)
// });