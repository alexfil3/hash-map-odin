import LinkedList from "./LinkedList.js";

class HashMap {
    constructor() {
        this.bs = [];
        this.capacity = 16;
        this.loadFactor = 0.75;
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
     
        return hashCode;
    }

    set(key, value) {
        if (this.capacity * this.loadFactor <= this.length()) {
            this.capacity = this.capacity * 2;
            const entries = this.entries();
            this.clear();
            
            for (let entry of entries) {
                const [key, value] = entry;
                this.set(key, value);
            }
        }

        const index = this.hash(key);

        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bound");
        }

        if (!this.bs[index]) {
            this.bs[index] = new LinkedList();
        }

        this.bs[index].append(key, value);
    }

    get(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bound");
        }

        const value = this.bs[index].find(key);

        return value;
    }

    has(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bound");
        }
        
        const value = this.bs[index].find(key);
    
        return value ? true : false;
    }

    remove(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bound");
        }

        if (!this.bs[index] || !this.has(key)) {
            return false
        }

        if (this.bs[index].length > 1) {
            this.bs[index].remove(key);
        } else {
            this.bs.splice(index, 1);
        }

        return true;
    }

    length() {
        let count = 0;

        for(let item of this.bs) {
            if (item) {
                count += item.length;
            }
        }
        
        return count;
    }

    clear() {
        if (this.bs.length < 1) return 'Cannot clear array. It\'s already empty'
        this.bs.splice(0);
    }

    keys() {
        const keys = [];

        for (let item of this.bs) {
            if (item) {
                keys.push(...item.getKeys());
            }
        }

        return keys;
    }

    values() {
        const values = [];

        for (let item of this.bs) {
            if (item) {
                values.push(...item.getValues());
            }
        }

        return values;
    }

    entries() {
        const entries = [];

        for (let item of this.bs) {            
            if (item) {
                entries.push(...item.getEntries());
            }
        }

        return entries;
    }
}  

export default HashMap;