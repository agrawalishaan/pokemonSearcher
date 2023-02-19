const pokemonNames = require('../data/pokemonNames.json'); // require automatically parses the json

class TrieNode {
  constructor(value) {
    this.value = value;
    this.children = [];
    this.endOfPokemonName = false;
  }
}

class TrieTree {
  constructor() {
    this.root = new TrieNode('');
  }

  insert(name) {
    let pointer = this.root;
    for (let letter of name) {
      let flag = false; // flag indicates if we have ever seen a trienode child with the letter we are looking for
      // if we haven't, then create a new trienode
      for (let child of pointer.children) {
        if (child.value === letter) {
          flag = true;
          pointer = child;
        }
      }
      if (!flag) {
        const childNode = new TrieNode(letter);
        pointer.children.push(childNode);
        pointer = childNode;
      }
    }
    pointer.endOfPokemonName = true; // the last trie node we are pointing at needs to indicate it is the end of a pokemon name
  }

  // returns a pointer to the node with the last letter of the string, returns false if nothing is found
  // ex: pik returns a pointer for the trieNode with k
  findStarting(prefix) {
    let pointer = this.root;
    for (let letter of prefix) {
      let flag = false;
      console.log((pointer.children))
      for (let child of pointer.children) {
        if (child.value === letter) {
          flag = true;
          pointer = child;
        }
      }
      if (!flag) return false;
    }
    return pointer;
  }
}

const myTrie = new TrieTree();
const pokemonList = pokemonNames.pokemon;
for (let pokemonName of pokemonList) {
  myTrie.insert(pokemonName);
}

console.log(myTrie.findStarting('pik'));

