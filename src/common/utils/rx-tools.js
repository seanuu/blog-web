import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

export class DebounceTime {
    constructor(time = 200) {
        this.time = time;
        this.subject = new Subject();
        this.subscription = null;
    }

    next(arg) {
        this.subject.next(arg);
    }

    subscribe(callback) {
        this.subscription = this.subject.asObservable()
            .pipe(
                debounceTime(this.time)
            )
            .subscribe((arg) => {
                callback(arg);
            });
    }

    unsubscribe() {
        this.subscription.unsubscribe();
    }
}
