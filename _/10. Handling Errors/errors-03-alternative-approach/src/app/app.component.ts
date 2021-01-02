import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "./auth/auth.service";
import { ErrorService } from "./error/error.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  hasError = false;
  private errorSub: Subscription;

  constructor(
    private authService: AuthService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.authService.autoAuthUser();
    this.errorSub = this.errorService.getErrorListener().subscribe(
      message => this.hasError = message !== null
    );
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
