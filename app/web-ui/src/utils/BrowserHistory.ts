export class BrowserHistory {
  private stack: string[];
  private index: number;

  constructor() {
    this.stack = []; // visited URLs
    this.index = -1; // current position in stack
  }

  visit(url: string) {
    if (this.index < this.stack.length - 1) {
      const start = this.index + 1;
      const count = this.stack.length - start;
      this.stack.splice(start, count);
    }
    this.stack.push(url);
    this.index = this.stack.length - 1;
    return this.current();
  }

  back() {
    if (this.index === -1) return this.current();

    this.index = Math.max(-1, this.index - 1);
    return this.current();
  }

  forward() {
    if (this.index >= this.stack.length - 1) return this.current();
    this.index = Math.min(this.stack.length - 1, this.index + 1);
    return this.current();
  }

  current() {
    return this.index === -1 ? null : this.stack[this.index];
  }
}
