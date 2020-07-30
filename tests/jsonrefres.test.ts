import { JsonRefResolver } from '../src/jsonrefres';
import * as data from "./mockData";
import { isCyclic } from "./helpers";

test('buildJsonRefified object', () => {
    const jsonrefres = new JsonRefResolver("$id")
    const refified = jsonrefres.buildJsonRefified(data.unrefifiedOrder1)
    expect(refified).toEqual(data.refifiedOrder1);
});

test('buildJsonRefifiedList object', () => {
    const jsonrefres = new JsonRefResolver("$id")
    const refified = jsonrefres.buildJsonRefifiedList(data.unrefifiedArr1)
    expect(refified).toEqual(data.refifiedArr1);
});

test('resolveJsonRefs object with circular dependecies', () => {
    const jsonrefres = new JsonRefResolver("$id")
    const refified = jsonrefres.resolveJsonRefs(data.refifiedOrder1)
    expect(isCyclic(refified)).toBe(true);
    expect(refified.customer.employeeSales.correspondingArticle.$id).toEqual(refified.$id)
});

test('resolveJsonRefsList on Array', () => {
    const jsonrefres = new JsonRefResolver("$id")
    const refified = jsonrefres.resolveJsonRefsList(data.refifiedArr1)
    expect(refified).toEqual(data.derefifiedArr1)
});

test('resolveJsonRefs object without circular dependecies', () => {
    const jsonrefres = new JsonRefResolver("$id")
    delete data.refifiedOrder1.customer.employeeSales.correspondingArticle
    const refified = jsonrefres.resolveJsonRefs(data.refifiedOrder1)

    expect(isCyclic(refified)).toBe(false);
    expect(refified).toEqual(data.derefifiedOrder1WithoutCircular)
});

test('check if clearRefList works', () => {
    const jsonrefres = new JsonRefResolver("$id")
    delete data.refifiedOrder1.customer.employeeSales.correspondingArticle
    jsonrefres.resolveJsonRefs(data.refifiedOrder1)

    expect(jsonrefres.getRefList().size).toBeGreaterThan(0)
    jsonrefres.resetRefList()
    expect(jsonrefres.getRefList().size).toEqual(0)
});