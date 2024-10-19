import { Controller, Get, Route } from "tsoa";

@Route("transfer")
export class TransferController extends Controller {
  @Get("links")
  getLinks(): string {
    return "hello world";
  }
}
