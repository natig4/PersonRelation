"use strict";
const people = [];
class Person {
    constructor(FullName, Address) {
        this.Relations = [];
        this.FullName = FullName;
        this.Address = Address;
    }
}
class Name {
    constructor(FirstName, LastName) {
        this.FirstName = FirstName;
        this.LastName = LastName;
    }
}
class Address {
    constructor(Street, City) {
        this.Street = Street;
        this.City = City;
    }
}
function init(persons) {
    people.splice(0, people.length);
    people.push(...persons);
    setRelations(people);
}
init([
    new Person(new Name('Grace', 'Hopper'), new Address('', 'New York')),
    new Person(new Name('Alan', 'Turing'), new Address('', 'Bletchley Park')),
    new Person(new Name('Joan', 'Clarke'), new Address('', 'Bletchley Park')),
    new Person(new Name('Joan', 'Clarke'), new Address('', 'London')),
    new Person(new Name('Alan', 'Turing'), new Address('', 'Cambridge')),
]);
function FindMinRelationLevel(personA, personB) {
    const relation = personA.Relations.find(({ person }) => person === personB);
    return (relation === null || relation === void 0 ? void 0 : relation.n) || -1;
}
// Example of relationship between Alan Turing from Cabmridge to Joan Clarke from London
console.log(FindMinRelationLevel(people[4], people[3]));
function setRelations(persons) {
    for (const person of persons) {
        person.Relations = [];
        for (const otherPerson of persons) {
            if (person !== otherPerson) {
                const level = findRelationLevel(person, otherPerson, persons);
                if (level !== -1) {
                    person.Relations.push({ n: level, person: otherPerson });
                }
            }
        }
    }
}
// Helpers
function findRelationLevel(personA, personB, people, relations = new Set(), level = 0, maxDepth = Infinity) {
    if (personA === personB) {
        return level;
    }
    if (level >= maxDepth || relations.has(personA)) {
        return -1;
    }
    relations.add(personA);
    for (const person of people) {
        if (!relations.has(person) && isDirectlyRelated(personA, person)) {
            const result = findRelationLevel(person, personB, people, relations, level + 1, maxDepth);
            if (result !== -1) {
                return result;
            }
        }
    }
    return -1;
}
function isDirectlyRelated(personA, personB) {
    return isSameName(personA, personB) || isSameAddress(personA, personB);
}
function isSameName(personA, personB) {
    return (personA.FullName.FirstName === personB.FullName.FirstName &&
        personA.FullName.LastName === personB.FullName.LastName);
}
function isSameAddress(personA, personB) {
    return (personA.Address.Street === personB.Address.Street &&
        personA.Address.City === personB.Address.City);
}
