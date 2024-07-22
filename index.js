"use strict";
const people = [];
class Person {
    constructor(FullName, Address) {
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
}
init([
    new Person(new Name("Grace", "Hopper"), new Address("", "New York")),
    new Person(new Name("Alan", "Turing"), new Address("", "Bletchley Park")),
    new Person(new Name("Joan", "Clarke"), new Address("", "Bletchley Park")),
    new Person(new Name("Joan", "Clarke"), new Address("", "London")),
    new Person(new Name("Alan", "Turing"), new Address("", "Cambridge")),
]);
function FindMinRelationLevel(personA, personB) {
    return findRelationLevel(personA, personB, people);
}
// Example of relationship between Alan Turing from Cambridge to Joan Clarke from London
console.log(FindMinRelationLevel(people[4], people[3]));
function findRelationLevel(personA, personB, people, relations = new Set(), level = 0) {
    if (personA === personB) {
        return level;
    }
    if (relations.has(personA)) {
        return -1;
    }
    relations.add(personA);
    for (const person of people) {
        if (!relations.has(person) && isDirectlyRelated(personA, person)) {
            const result = findRelationLevel(person, personB, people, relations, level + 1);
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
