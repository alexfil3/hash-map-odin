import Node from './Node.js';

class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    append(key, value) {
        const node = new Node(key, value);

        if (!this.head) {
            this.head = node;
        } else {
            let current = this.head;
            while(current.nextNode) {
                current = current.nextNode;
            }

            current.nextNode = node;
        }

        this.length++;
    }

    getKeys() {
        const keys = [];
        let index = 0;
        let current = this.head;

        while(index < this.length) {
            keys.push(current.key);
            current = current.nextNode;
            index++;
        }

        return keys;
    }

    getValues() {
        const values = [];
        let index = 0;
        let current = this.head;

        while(index < this.length) {
            values.push(current.value);
            current = current.nextNode;
            index++;
        }

        return values;
    }

    getEntries() {
        const entries = [];
        let index = 0;
        let current = this.head;

        while(index < this.length) {
            entries.push([current.key, current.value]);
            current = current.nextNode;
            index++;
        }

        return entries;
    }

    find(key) {
        if (!this.head) return null;
        
        let current = this.head;
        let index = 0;

        while(index <= this.length - 1) {
            if (current.key === key) {
                return current.value;
            } else {
                current = current.nextNode;
                index++;
            }
        }

        return null;
    }

    removeAt(index) {
        if (!this.head) return null;
        if (index < 0 || index >= this.length) throw new Error('index is out of range');
    
        if (index === 0) {
            this.head = this.head.nextNode;
        } else {
            let current = this.head;
            let currentIndex = 0;
    
            while (currentIndex < index - 1) {
                current = current.nextNode;
                currentIndex++;
            }
    
            current.nextNode = current.nextNode.nextNode;
        }
    
        this.length--;
    }

    remove(key) {
        if (!this.head) return null;

        let current = this.head;
        let index = 0;

        while(index < this.length ) {
            if (current.key === key) {
                this.removeAt(index);
            } else {
                current = current.nextNode;
                index++;
            }
        }

        this.length--;
    }
}

export default LinkedList;