class Node {//node for singly LL
    constructor(val) {
        this.val = val
        this.next = null
  }
}
// class SmarterNode {
//     constructor(val,next=null) {
//         this.val = val
//         this.next = next
//     }
// }
class LinkedList {
    constructor(vals = []) {
        this.head = null
        this.tail = null
        this.length = 0
        for (let val of vals) this.push(val)
    }
    _get(i) {
        let cur = this.head
        let count = 0
        while (cur && count != i) {
            count++
            cur = cur.next
        }
        return cur
    }
    push(v) {//add new value to end
        let newNode = new Node(v)
        if (!this.head) {
            this.head = newNode
            this.tail = this.head
        } else {
            this.tail.next = newNode
            this.tail = newNode
        }
        this.length += 1
    }
    unshift(v) {//add new value to beginning
        let newNode = new Node(v)
        if (!this.head) this.head = newNode
        else {
            newNode.next = this.head
            this.head = newNode
        }
        if (this.length === 0) this.tail = this.head
        this.length += 1
    }
    pop() {return this.removeAt(this.length - 1)}//return & remove last item
    shift() {return this.removeAt(0)}//return and remove first item
    getAt(i) {//get value
        if (i >= this.length || i < 0) throw new Error("Invalid index.")
        return this._get(i).val
    }
    setAt(i, v) {//set value to v
        if (i >= this.length || i < 0) throw new Error("Invalid index.")
        let cur = this._get(i)
        cur.val = v
    }
    insertAt(i, v) {//add node with value v before index i
        if (i > this.length || i < 0) throw new Error("Invalid index.")
        if (i === 0) return this.unshift(v)
        if (i === this.length) return this.push(v)
        let prev = this._get(i - 1)// get the one before it
        let newNode = new Node(v)
        newNode.next = prev.next
        prev.next = newNode
        this.length += 1
    }
    removeAt(i) {//return and remove node
        if (i >= this.length || i < 0) throw new Error("Invalid index.")
        // special case: remove first item
        if (i === 0) {
            let v = this.head.val
            this.head = this.head.next
            this.length -= 1
            if (this.length < 2) this.tail = this.head
            return v
        }
        let prev = this._get(i - 1)
        // special case: remove tail
        if (i === this.length - 1) {
            let v = prev.next.val
            prev.next = null
            this.tail = prev
            this.length -= 1
            return v
        }
        // normal case: remove in middle
        let v = prev.next.val
        prev.next = prev.next.next
        this.length -= 1
        return v
    }
    average() {
        if (this.length === 0) return 0
        let total = 0
        let current = this.head
        while (current) {
            total += current.val
            current = current.next
        }
        return total / this.length
    }
}
// module.exports = LinkedList
let list = new LinkedList([2]);
console.log(list)//LinkedList {head: Node { val: 2, next: null },                           tail: Node { val: 2, next: null },length: 1 }
list.unshift(1)
list.push(3)
console.log(list)//LinkedList {head: Node { val: 1, next: Node { val: 2, next: [Node] } },  tail: Node { val: 3, next: null },length: 3  }
list.insertAt(1, 1.5);
console.log(list.removeAt(1)); // 1.5
console.log(list.pop())// 3
console.log(list.shift())// 1
console.log(list.average())// 2