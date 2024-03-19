import mongoose from "mongoose";
import {app} from "./index";

try {
    mongoose.connect(
      "mongodb+srv://ariso_database:arisoIT123@clusterariso.2wgz0cy.mongodb.net/"
    );
    app.listen(8080, () => {
      console.log("connected to 8080");
    });
  } catch (err) {
    console.log("mongoose error", err);
  }
  