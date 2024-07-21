const people: Person[] = [];

interface Relation {
  n: number;
  person: Person;
}

class Person {
  FullName: Name;
  Address: Address;
  Relations: Relation[] = [];

  constructor(FullName: Name, Address: Address) {
    this.FullName = FullName;
    this.Address = Address;
  }
}

class Name {
  FirstName: string;
  LastName: string;

  constructor(FirstName: string, LastName: string) {
    this.FirstName = FirstName;
    this.LastName = LastName;
  }
}

class Address {
  Street: string;
  City: string;

  constructor(Street: string, City: string) {
    this.Street = Street;
    this.City = City;
  }
}

function init(persons: Person[]) {
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

function FindMinRelationLevel(personA: Person, personB: Person) {
  const relation = personA.Relations.find(({person}) => person === personB);

  return relation?.n || -1;
}

// Example of relationship between Alan Turing from Cabmridge to Joan Clarke from London
console.log(FindMinRelationLevel(people[4], people[3]));

function setRelations(persons: Person[]) {
  for (const person of persons) {
    person.Relations = [];
    for (const otherPerson of persons) {
      if (person !== otherPerson) {
        const level = findRelationLevel(person, otherPerson, persons);
        if (level !== -1) {
          person.Relations.push({n: level, person: otherPerson});
        }
      }
    }
  }
}

// Helpers
function findRelationLevel(
  personA: Person,
  personB: Person,
  people: Person[],
  relations: Set<Person> = new Set(),
  level: number = 0,
  maxDepth: number = Infinity
): number {
  if (personA === personB) {
    return level;
  }

  if (level >= maxDepth || relations.has(personA)) {
    return -1;
  }

  relations.add(personA);

  for (const person of people) {
    if (!relations.has(person) && isDirectlyRelated(personA, person)) {
      const result = findRelationLevel(
        person,
        personB,
        people,
        relations,
        level + 1,
        maxDepth
      );
      if (result !== -1) {
        return result;
      }
    }
  }

  return -1;
}

function isDirectlyRelated(personA: Person, personB: Person): boolean {
  return isSameName(personA, personB) || isSameAddress(personA, personB);
}

function isSameName(personA: Person, personB: Person): boolean {
  return (
    personA.FullName.FirstName === personB.FullName.FirstName &&
    personA.FullName.LastName === personB.FullName.LastName
  );
}

function isSameAddress(personA: Person, personB: Person): boolean {
  return (
    personA.Address.Street === personB.Address.Street &&
    personA.Address.City === personB.Address.City
  );
}
