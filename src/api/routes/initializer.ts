import { Express } from "express";
import { ApiBuilders } from "../../api/api.builders";
import { HttpStatusCodes } from "../../lib/codes";

function buildAppRoutes(app: Express) {
  (function () {
    app.use("/api", (req, res) => {
      return ApiBuilders.buildResponse(res, {
        status: true,
        code: HttpStatusCodes.SUCCESSFUL_REQUEST,
        message: "Hello world!!!",
        data: null
      });
    });
  })();
}

export {
  buildAppRoutes
}