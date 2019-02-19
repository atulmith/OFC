import { Pipe, PipeTransform } from "@angular/core";

const PADDING = "000000";

@Pipe({ name: "MyDateFormat" })
export class MyDateFormat implements PipeTransform {

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

  parse(value: any, fractionSize: number = 2): string {
    this.mydateformat=new Date(value);
    // this.mydateformat.format(value,)
    var strd =  this.mydateformat.getFullYear()+ '/' + this.mydateformat.getMonth() + '/' + this.mydateformat.getDate() ;
    return strd;
  }
}