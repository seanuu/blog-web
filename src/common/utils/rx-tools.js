import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

export class DebounceTime {
    constructor(time = 200) {
        this.time = time;
        this.subject = new Subject();
        this.subscription = null;

        this.operators = [];
    }

    next(arg) {
        this.subject.next(arg);
    }

    pipe(...operators) {
        this.operators = operators;

        return this;
    }

    subscribe(callback) {
        this.subscription = this.subject
            .asObservable()
            .pipe(...this.operators, debounceTime(this.time))
            .subscribe(arg => {
                callback(arg);
            });
    }

    unsubscribe() {
        this.subscription.unsubscribe();
    }
}
