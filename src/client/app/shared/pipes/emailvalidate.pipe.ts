import { Pipe, PipeTransform } from "@angular/core";

const PADDING = "000000";

@Pipe({ name: "EmailValidate" })
export class EmailValidate implements PipeTransform {

  private DECIMAL_SEPARATOR: string;
  private THOUSANDS_SEPARATOR: string;
  private mydateformat: Date;

  constructor() {
    // TODO comes from configuration settings
    this.DECIMAL_SEPARATOR = ".";
    this.THOUSANDS_SEPARATOR = "'";
  }

  transform(value: number | string, fractionSize: number = 2): string {
    let [ integer, fraction = "" ] = (value || "").toString()
      .split(this.DECIMAL_SEPARATOR);

    fraction = fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
      : "";

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);

    return integer + fraction;
  }

  parse(value: string, args : string): boolean {
    
    var atpos = value.indexOf("@");
    var dotpos = value.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=value.length) {
        // alert("Not a valid e-mail address");
        return false;
    }
    return true;
  }
}