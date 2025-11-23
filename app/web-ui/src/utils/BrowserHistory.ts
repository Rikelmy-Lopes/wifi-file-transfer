class Node {
  public data: string;
  public prev: Node | null;
  public next: Node | null;

  constructor(data: string) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

export class BrowserHistory {
  private curr: Node;

  constructor(homepage: string) {
    this.curr = new Node(homepage);
  }

  // Function to visit a new URL
  visit(url: string) {
    // Create a node for this visit
    const urlNode = new Node(url);

    // Set the previous node of the
    // new node to current
    urlNode.prev = this.curr;

    // Update the next of the current
    // node to the new node
    this.curr.next = urlNode;

    // Move the current pointer to the new node
    this.curr = urlNode;
    return this.curr.data;
  }

  // Function to move back by 'step' times
  back(step: number) {
    // Pointer to traverse backward
    let trav = this.curr;

    // Travel back `step` times if possible
    while (trav.prev !== null && step > 0) {
      trav = trav.prev;
      step--;
    }

    // Update current pointer after moving back
    this.curr = trav;

    return this.curr.data;
  }

  // Function to move forward by 'step' times
  forward(step: number) {
    // Pointer to traverse forward
    let trav = this.curr;

    // Travel forward `step` times if possible
    while (trav.next !== null && step > 0) {
      trav = trav.next;
      step--;
    }

    // Update current pointer after moving forward
    this.curr = trav;

    return this.curr.data;
  }
}
