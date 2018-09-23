import { Component, OnInit,Inject,forwardRef } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";

type validateResult = {
  status: string,
  message?: string,
}

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.css"]
})

export class TestComponent implements OnInit {
  private radio;
  private labelPosition: string = "left";
  private validateForm: FormGroup;
  private options: any[] = [
    {
      value: "mike",
      label: "加奶油",
      children: [
        {
          value: "hot",
          label: "热奶油",
          children: [
            {
              value: "more",
              label: "多糖"
            },
            {
              value: "half",
              label: "半糖"
            },
            {
              value: "few",
              label: "少糖"
            }
          ]
        }
      ]
    },
    {
      value: "cafe",
      label: "加咖啡",
      children: [
        {
          value: "cubita",
          label: "古巴咖啡"
        },
        {
          value: "brazil",
          label: "巴西咖啡"
        },
        {
          value: "jamaica",
          label: "牙买加咖啡"
        },
        {
          value: "mamba",
          label: "曼巴咖啡"
        }
      ]
    }
  ];
  constructor(
    @Inject(forwardRef(() => FormBuilder)) private formBuilder: FormBuilder
  ) {}

  submit(): void {
    console.log(this.validateForm.value);
  }

  reset(): void {
    this.validateForm.reset();
  }

  ctrl(item: string): AbstractControl {
    return this.validateForm.controls[item];
  }

  statusCtrl(item: string): string {
    if (!this.validateForm.controls[item]) return;
    const control: AbstractControl = this.validateForm.controls[item];
    return control.dirty && control.hasError("status")
      ? control.errors.status
      : "";
  }

  messageCtrl(item: string): string {
    if (!this.validateForm.controls[item]) return;
    const control: AbstractControl = this.validateForm.controls[item];
    return control.dirty && control.hasError("message")
      ? control.errors.message
      : "";
  }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      city: ["", [this.cityValidator]],
      express: [""],
      invoice: [""],
      discount: [[]],
      time: ["", [this.timeValidator]],
      num: [1],
      spec: [""],
      date: ["", [this.dateValidator]]
    });
  }

  private timeValidator = (control: FormControl): validateResult => {
    if (!control.value) {
      return { status: "error", message: "必须选择配送时间" };
    }
    return { status: "success" };
  };

  private dateValidator = (control: FormControl): validateResult => {
    if (!control.value) {
      return { status: "error", message: "必须选择配送日期" };
    }
    return { status: "success" };
  };

  private cityValidator = (control: FormControl): validateResult => {
    if (!control.value) {
      return { status: "error", message: "必须填写城市名" };
    }
    if (!/[一-龥]/.test(control.value)) {
      return { status: "error", message: "城市名必须是中文" };
    }
    return { status: "success" };
  };
}
