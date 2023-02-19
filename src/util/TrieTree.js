import pokemonNames from '../data/pokemonNames.json'; // require automatically parses the json

class TrieNode {
  constructor(value) {
    this.value = value;
    this.children = [];
    this.endOfPokemonName = false;
  }
  addChild(value) {
    const childNode = new TrieNode(value);
    this.lettersToReachTrie += value;
    this.children.push(childNode);
    return childNode; // allows us to move to that child
  }
}

class TrieTree {
  constructor() {
    this.root = new TrieNode('');
  }

  insert(name) {
    let pointer = this.root;
    for (let letter of name) {
      letter = letter.toLowerCase(); // pokemon names can start with capital letters
      // flag indicates if we have ever seen a trienode child with the letter we are looking for
      // if we haven't, then create a new trienode
      let flag = false;
      for (let child of pointer.children) {
        if (child.value === letter) {
          flag = true;
          pointer = child;
          break;
        }
      }
      if (!flag) {
        const child = pointer.addChild(letter);
        pointer = child;
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
      for (let child of pointer.children) {
        if (child.value === letter) {
          flag = true;
          pointer = child;
          break;
        }
      }
      if (!flag) {
        return false;
      }
    }
    return pointer;
  }

  getPokemonStartingWith(initialStart) {
    const pokemonNames = [];
    const startingNode = this.findStarting(initialStart);
    // if the requested prefix doesn't exist, return false to indicate no pokemon are found
    if (!startingNode) {
      return false;
    }

    function lookahead(node, prefix) {
      if (node.endOfPokemonName) {
        pokemonNames.push(prefix);
      }
      for (let child of node.children) {
        lookahead(child, prefix + child.value);
      }
    }
    lookahead(startingNode, initialStart);
    return pokemonNames;
  }
}

const PokemonTree = new TrieTree();
const pokemonList = pokemonNames.pokemon;
for (let pokemonName of pokemonList) {
  PokemonTree.insert(pokemonName);
}

export default PokemonTree;

